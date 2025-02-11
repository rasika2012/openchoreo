/*
 * Copyright (c) 2025, WSO2 Inc. (http://www.wso2.org) All Rights Reserved.
 *
 * WSO2 Inc. licenses this file to you under the Apache License,
 * Version 2.0 (the "License"); you may not use this file except
 * in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied. See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

package build

import (
	"context"
	"crypto/sha256"
	"encoding/hex"
	"fmt"

	"github.com/go-logr/logr"
	corev1 "k8s.io/api/core/v1"
	rbacv1 "k8s.io/api/rbac/v1"
	apierrors "k8s.io/apimachinery/pkg/api/errors"
	"k8s.io/apimachinery/pkg/api/meta"
	metav1 "k8s.io/apimachinery/pkg/apis/meta/v1"
	"k8s.io/apimachinery/pkg/runtime"
	"k8s.io/apimachinery/pkg/runtime/schema"
	ctrl "sigs.k8s.io/controller-runtime"
	"sigs.k8s.io/controller-runtime/pkg/client"
	"sigs.k8s.io/controller-runtime/pkg/log"

	choreov1 "github.com/wso2-enterprise/choreo-cp-declarative-api/api/v1"
	"github.com/wso2-enterprise/choreo-cp-declarative-api/internal/controller"
	argo "github.com/wso2-enterprise/choreo-cp-declarative-api/internal/dataplane/kubernetes/types/argoproj.io/workflow/v1alpha1"
	"github.com/wso2-enterprise/choreo-cp-declarative-api/internal/labels"
)

// Reconciler reconciles a Build object
type Reconciler struct {
	client.Client
	Scheme *runtime.Scheme
}

// Reconcile is part of the main kubernetes reconciliation loop which aims to
// move the current state of the cluster closer to the desired state.
// TODO(user): Modify the Reconcile function to compare the state specified by
// the Build object against the actual cluster state, and then
// perform operations to make the cluster state reflect the state specified by
// the user.
//
// For more details, check Reconcile and its Result here:
// - https://pkg.go.dev/sigs.k8s.io/controller-runtime@v0.19.1/pkg/reconcile
func (r *Reconciler) Reconcile(ctx context.Context, req ctrl.Request) (ctrl.Result, error) {
	logger := log.FromContext(ctx)

	// Fetch the Build instance
	build := &choreov1.Build{}
	if err := r.Get(ctx, req.NamespacedName, build); err != nil {
		if apierrors.IsNotFound(err) {
			logger.Info("Build resource not found, ignoring since object must be deleted")
			return ctrl.Result{}, nil
		}
		// Error reading the object
		logger.Error(err, "Failed to get Build")
		return ctrl.Result{}, err
	}

	if meta.FindStatusCondition(build.Status.Conditions, string(DeployableArtifactCreated)) != nil ||
		meta.IsStatusConditionPresentAndEqual(build.Status.Conditions, string(Completed), metav1.ConditionFalse) {
		return ctrl.Result{}, nil
	}

	// Check if the build namespace exists, and create it if not
	buildNamespace := "choreo-ci-" + build.Labels[labels.LabelKeyOrganizationName]
	if err := r.ensureNamespaceResources(ctx, buildNamespace, logger); err != nil {
		logger.Error(err, "Failed to ensure choreo ci namespace resources")
		return ctrl.Result{}, err
	}

	existingWorkflow, err := r.ensureWorkflow(ctx, build, buildNamespace, logger)
	if err != nil {
		logger.Error(err, "Failed to ensure workflow")
		return ctrl.Result{}, err
	} else if existingWorkflow == nil {
		return ctrl.Result{Requeue: true}, nil
	}

	requeue, err := r.handleBuildSteps(ctx, build, existingWorkflow.Status.Nodes, logger)
	if err != nil {
		logger.Error(err, "Failed to handle build steps")
		return ctrl.Result{}, err
	}

	stepInfo, isFound := GetStepByTemplateName(existingWorkflow.Status.Nodes, BuildStep)
	// If the build step is still running, requeue the reconciliation after 1 minute.
	// This provides a controlled requeue interval instead of relying on exponential backoff.
	if requeue && isFound && meta.FindStatusCondition(build.Status.Conditions, string(BuildSucceeded)) == nil {
		if getStepPhase(stepInfo.Phase) == Running {
			return ctrl.Result{RequeueAfter: 60000000000}, nil
		}
	} else if requeue {
		return ctrl.Result{Requeue: true}, nil
	}

	if meta.IsStatusConditionPresentAndEqual(build.Status.Conditions, string(Completed), metav1.ConditionTrue) {
		err := r.createDeployableArtifact(ctx, build, logger)
		if err != nil {
			return ctrl.Result{}, err
		}

		if err := controller.UpdateCondition(
			ctx,
			r.Status(),
			build,
			&build.Status.Conditions,
			string(DeployableArtifactCreated),
			metav1.ConditionTrue,
			"ArtifactCreationSuccessful",
			"Successfully created a deployable artifact for the build",
		); err != nil {
			return ctrl.Result{}, err
		}
	}
	return ctrl.Result{}, nil
}

// SetupWithManager sets up the controller with the Manager.
func (r *Reconciler) SetupWithManager(mgr ctrl.Manager) error {
	return ctrl.NewControllerManagedBy(mgr).
		For(&choreov1.Build{}).
		Named("build").
		Complete(r)
}

// ensureNamespaceResources ensures that the namespace, service account, role, and role binding are created.
func (r *Reconciler) ensureNamespaceResources(ctx context.Context, namespaceName string, logger logr.Logger) error {
	// Step 1: Create Namespace if it doesn't exist
	namespace := &corev1.Namespace{
		ObjectMeta: metav1.ObjectMeta{
			Name: namespaceName,
		},
	}
	if err := r.Client.Create(ctx, namespace); err != nil && !apierrors.IsAlreadyExists(err) {
		logger.Error(err, "Failed to create choreo ci namespace", "Namespace", namespaceName)
		return err
	}

	// Step 2: Create ServiceAccount if it doesn't exist
	sa := &corev1.ServiceAccount{
		ObjectMeta: metav1.ObjectMeta{
			Name:      "argo-workflow-sa",
			Namespace: namespaceName,
		},
	}
	if err := r.Client.Create(ctx, sa); err != nil && !apierrors.IsAlreadyExists(err) {
		logger.Error(err, "Failed to create ServiceAccount", "Namespace", namespaceName)
		return err
	}

	// Step 3: Create Role if it doesn't exist
	role := &rbacv1.Role{
		ObjectMeta: metav1.ObjectMeta{
			Name:      "argo-workflow-role",
			Namespace: namespaceName,
		},
		Rules: []rbacv1.PolicyRule{
			{
				APIGroups: []string{"argoproj.io"},
				Resources: []string{"workflowtaskresults"},
				Verbs:     []string{"create", "get", "list", "watch", "update", "patch"},
			},
		},
	}
	if err := r.Client.Create(ctx, role); err != nil && !apierrors.IsAlreadyExists(err) {
		logger.Error(err, "Failed to create Role", "Namespace", namespaceName)
		return err
	}

	// Step 4: Create RoleBinding if it doesn't exist
	roleBinding := &rbacv1.RoleBinding{
		ObjectMeta: metav1.ObjectMeta{
			Name:      "argo-workflow-role-binding",
			Namespace: namespaceName,
		},
		Subjects: []rbacv1.Subject{
			{
				Kind:      "ServiceAccount",
				Name:      "argo-workflow-sa",
				Namespace: namespaceName,
			},
		},
		RoleRef: rbacv1.RoleRef{
			Kind:     "Role",
			Name:     "argo-workflow-role",
			APIGroup: "rbac.authorization.k8s.io",
		},
	}
	if err := r.Client.Create(ctx, roleBinding); err != nil && !apierrors.IsAlreadyExists(err) {
		logger.Error(err, "Failed to create RoleBinding", "Namespace", namespaceName)
		return err
	}
	return nil
}

func (r *Reconciler) getComponent(ctx context.Context, build *choreov1.Build) (*choreov1.Component, error) {
	componentList := &choreov1.ComponentList{}
	listOpts := []client.ListOption{
		client.InNamespace(build.Namespace),
		client.MatchingLabels{
			labels.LabelKeyOrganizationName: build.Labels[labels.LabelKeyOrganizationName],
			labels.LabelKeyProjectName:      build.Labels[labels.LabelKeyProjectName],
		},
	}
	if err := r.Client.List(ctx, componentList, listOpts...); err != nil {
		return nil, err
	}

	for _, component := range componentList.Items {
		if component.Labels == nil {
			// Ideally, this should not happen as the component should have the organization and project labels
			continue
		}
		if component.Labels[labels.LabelKeyName] == build.Labels[labels.LabelKeyComponentName] {
			return &component, nil
		}
	}
	return nil, apierrors.NewNotFound(schema.GroupResource{Group: "core.choreo.dev", Resource: "Component"}, build.Labels[labels.LabelKeyComponentName])
}

func (r *Reconciler) ensureWorkflow(ctx context.Context, build *choreov1.Build, buildNamespace string, logger logr.Logger) (*argo.Workflow, error) {
	component, err := r.getComponent(ctx, build)
	if err != nil {
		if apierrors.IsNotFound(err) {
			logger.Info("Component of the build is not found", "Build.Name", build.Name)
			return nil, err
		}
		logger.Info("Error occurred while retrieving the component of the build", "Build.Name", build.Name)
		return nil, err
	}
	existingWorkflow := argo.Workflow{}
	err = r.Get(ctx, client.ObjectKey{Name: build.ObjectMeta.Name, Namespace: buildNamespace}, &existingWorkflow)
	if err != nil {
		// Create the workflow
		if apierrors.IsNotFound(err) {
			workflow := makeArgoWorkflow(build, component.Spec.Source.GitRepository.URL, buildNamespace)

			if err := r.Create(ctx, workflow); err != nil {
				return nil, err
			}

			if err := controller.UpdateCondition(
				ctx,
				r.Status(),
				build,
				&build.Status.Conditions,
				string(Initialized),
				metav1.ConditionTrue,
				"WorkflowCreated",
				"Workflow was created in the cluster",
			); err != nil {
				return nil, err
			}
			return nil, nil
		}
		return nil, err
	}
	return &existingWorkflow, nil
}

func (r *Reconciler) handleBuildSteps(ctx context.Context, build *choreov1.Build, nodes argo.Nodes, logger logr.Logger) (bool, error) {
	steps := []struct {
		stepName      WorkflowStep
		conditionType ConditionType
	}{
		{CloneStep, CloneSucceeded},
		{BuildStep, BuildSucceeded},
		{PushStep, PushSucceeded},
	}

	stepInfo, isFound := GetStepByTemplateName(nodes, steps[0].stepName)
	if isFound && meta.FindStatusCondition(build.Status.Conditions, string(steps[0].conditionType)) == nil {
		switch getStepPhase(stepInfo.Phase) {
		case Running:
			return true, nil
		case Succeeded:
			err := r.markStepAsSucceeded(ctx, build, steps[0].conditionType)
			return true, err
		case Failed:
			return r.markStepAsFailed(ctx, build, steps[0].conditionType)
		}
	}

	stepInfo, isFound = GetStepByTemplateName(nodes, steps[1].stepName)
	if isFound && meta.FindStatusCondition(build.Status.Conditions, string(steps[1].conditionType)) == nil {
		switch getStepPhase(stepInfo.Phase) {
		case Running:
			return true, nil
		case Succeeded:
			err := r.markStepAsSucceeded(ctx, build, steps[1].conditionType)
			return true, err
		case Failed:
			return r.markStepAsFailed(ctx, build, steps[1].conditionType)
		}
	}

	stepInfo, isFound = GetStepByTemplateName(nodes, steps[2].stepName)
	if isFound && meta.FindStatusCondition(build.Status.Conditions, string(steps[2].conditionType)) == nil {
		switch getStepPhase(stepInfo.Phase) {
		case Running:
			return true, nil
		case Succeeded:
			err := r.markStepAsSucceeded(ctx, build, steps[0].conditionType)
			if err != nil {
				return true, err
			}
			return r.markWorkflowCompleted(ctx, build, stepInfo.Outputs, logger)
		case Failed:
			return r.markStepAsFailed(ctx, build, steps[2].conditionType)
		}
	}
	return true, nil
}

func (r *Reconciler) markWorkflowCompleted(ctx context.Context, build *choreov1.Build, argoPushStepOutput *argo.Outputs, logger logr.Logger) (bool, error) {
	newCondition := metav1.Condition{
		Type:               string(Completed),
		Status:             metav1.ConditionTrue,
		LastTransitionTime: metav1.Now(),
		Reason:             "BuildCompleted",
		Message:            "Build completed successfully.",
	}
	image := getImageNameFromWorkflow(*argoPushStepOutput)
	if image == "" {
		newCondition.Status = metav1.ConditionFalse
		newCondition.Reason = "BuildFailed"
		newCondition.Message = "Image name is not found in the workflow"
	} else {
		build.Status.ImageStatus.Image = image
	}
	changed := meta.SetStatusCondition(&build.Status.Conditions, newCondition)
	if changed {
		logger.Info("Updating Build status", "Build.Name", build.Name)
		if err := r.Status().Update(ctx, build); err != nil {
			logger.Error(err, "Failed to update Build status", "Build.Name", build.Name)
			return true, err
		}
		logger.Info("Updated Build status", "Build.Name", build.Name)
	}
	return false, nil
}

func (r *Reconciler) markStepAsSucceeded(ctx context.Context, build *choreov1.Build, conditionType ConditionType) error {
	successDescriptiors := map[ConditionType]struct {
		Reason  string
		Message string
	}{
		CloneSucceeded: {
			Reason:  "CloneSourceCodeSucceeded",
			Message: "Source code cloning was successful.",
		},
		BuildSucceeded: {
			Reason:  "BuildImageSucceeded",
			Message: "Building the source code was successful.",
		},
		PushSucceeded: {
			Reason:  "PushImageSucceeded",
			Message: "Pushing the built image to the registry was successful.",
		},
	}

	if err := controller.UpdateCondition(
		ctx,
		r.Status(),
		build,
		&build.Status.Conditions,
		string(conditionType),
		metav1.ConditionTrue,
		successDescriptiors[conditionType].Reason,
		successDescriptiors[conditionType].Message,
	); err != nil {
		return err
	}
	return nil
}

func (r *Reconciler) markStepAsFailed(ctx context.Context, build *choreov1.Build, conditionType ConditionType) (bool, error) {
	failureDescriptors := map[ConditionType]struct {
		Reason  string
		Message string
	}{
		CloneSucceeded: {
			Reason:  "CloneSourceCodeFailed",
			Message: "Source code cloning failed.",
		},
		BuildSucceeded: {
			Reason:  "BuildImageFailed",
			Message: "Building the source code failed.",
		},
		PushSucceeded: {
			Reason:  "PushImageFailed",
			Message: "Pushing the built image to the registry failed.",
		},
	}

	if err := controller.UpdateCondition(
		ctx,
		r.Status(),
		build,
		&build.Status.Conditions,
		string(conditionType),
		metav1.ConditionFalse,
		failureDescriptors[conditionType].Reason,
		failureDescriptors[conditionType].Message,
	); err != nil {
		return true, err
	}

	if err := controller.UpdateCondition(
		ctx,
		r.Status(),
		build,
		&build.Status.Conditions,
		string(Completed),
		metav1.ConditionFalse,
		"BuildFailed",
		"Build completed with a failure status",
	); err != nil {
		return true, err
	}

	return false, nil
}

func getImageNameFromWorkflow(output argo.Outputs) string {
	for _, param := range output.Parameters {
		if param.Name == "image" {
			return *param.Value
		}
	}
	return ""
}

// This doesn't include git revision. It is added from the workflow.
func constructImageNameWithTag(build *choreov1.Build) string {
	componentName := build.ObjectMeta.Labels["core.choreo.dev/component"]
	orgName := build.ObjectMeta.Labels["core.choreo.dev/organization"]
	projName := build.ObjectMeta.Labels["core.choreo.dev/project"]
	dtName := build.ObjectMeta.Labels["core.choreo.dev/deployment-track"]

	hashInput := fmt.Sprintf("%s-%s", orgName, projName)
	hash := sha256.Sum256([]byte(hashInput))
	hashString := hex.EncodeToString(hash[:])

	return fmt.Sprintf("%s-%s:%s", hashString, componentName, dtName)
}

func (r *Reconciler) createDeployableArtifact(ctx context.Context, build *choreov1.Build, logger logr.Logger) error {
	deployableArtifact := &choreov1.DeployableArtifact{
		TypeMeta: metav1.TypeMeta{
			Kind:       "DeployableArtifact",
			APIVersion: "core.choreo.dev/v1",
		},
		ObjectMeta: metav1.ObjectMeta{
			Name:      build.ObjectMeta.Name,
			Namespace: build.ObjectMeta.Namespace,
			Annotations: map[string]string{
				"core.choreo.dev/display-name": build.ObjectMeta.Name,
				"core.choreo.dev/description":  "Deployable Artifact was created by the build.",
			},
			Labels: map[string]string{
				"core.choreo.dev/name":             build.ObjectMeta.Name,
				"core.choreo.dev/build":            build.ObjectMeta.Name,
				"core.choreo.dev/deployment-track": build.ObjectMeta.Labels["core.choreo.dev/deployment-track"],
				"core.choreo.dev/component":        build.ObjectMeta.Labels["core.choreo.dev/component"],
				"core.choreo.dev/project":          build.ObjectMeta.Labels["core.choreo.dev/project"],
				"core.choreo.dev/organization":     build.ObjectMeta.Labels["core.choreo.dev/organization"],
			},
		},
		Spec: choreov1.DeployableArtifactSpec{
			TargetArtifact: choreov1.TargetArtifact{
				FromBuildRef: &choreov1.FromBuildRef{
					Name: build.ObjectMeta.Name,
				},
			},
		},
	}
	componentType := r.getComponentType(ctx, build, logger)
	addComponentSpecificConfigs(componentType, deployableArtifact)
	if err := r.Client.Create(ctx, deployableArtifact); err != nil && !apierrors.IsAlreadyExists(err) {
		logger.Error(err, "Failed to create deployable artifact", "Build.Name", build.ObjectMeta.Name)
		return err
	}
	return nil
}

func (r *Reconciler) getComponentType(ctx context.Context, build *choreov1.Build, logger logr.Logger) choreov1.ComponentType {
	component, err := r.getComponent(ctx, build)
	if err != nil {
		logger.Info("Error occurred while retrieving the component of the build", "Build.Name", build.Name)
		return ""
	}
	return component.Spec.Type
}

func addComponentSpecificConfigs(componentType choreov1.ComponentType, deployableArtifact *choreov1.DeployableArtifact) {
	if componentType == choreov1.ComponentTypeScheduledTask {
		deployableArtifact.Spec.Configuration = &choreov1.Configuration{
			Application: &choreov1.Application{
				Task: &choreov1.TaskConfig{
					Disabled: false,
					Schedule: &choreov1.TaskSchedule{
						Cron:     "*/5 * * * *",
						Timezone: "Asia/Colombo",
					},
				},
			},
		}
	} else if componentType == choreov1.ComponentTypeWebApplication {
		deployableArtifact.Spec.Configuration = &choreov1.Configuration{
			EndpointTemplates: []choreov1.EndpointTemplate{
				{
					Spec: choreov1.EndpointSpec{
						Type: "HTTP",
						Service: choreov1.EndpointServiceSpec{
							Port: 80,
						},
					},
				},
			},
		}
	}
}
