/*
Copyright 2025.

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/

package build

import (
	"context"
	"crypto/sha256"
	"encoding/hex"
	"encoding/json"
	"fmt"

	"k8s.io/utils/ptr"

	"github.com/go-logr/logr"
	corev1 "k8s.io/api/core/v1"
	apierrors "k8s.io/apimachinery/pkg/api/errors"
	"k8s.io/apimachinery/pkg/api/meta"
	"k8s.io/apimachinery/pkg/api/resource"
	metav1 "k8s.io/apimachinery/pkg/apis/meta/v1"

	choreov1 "github.com/wso2-enterprise/choreo-cp-declarative-api/api/v1"
	argo "github.com/wso2-enterprise/choreo-cp-declarative-api/internal/controller/build/argo/workflow/v1alpha1"
	"k8s.io/apimachinery/pkg/runtime"
	ctrl "sigs.k8s.io/controller-runtime"
	"sigs.k8s.io/controller-runtime/pkg/client"
	"sigs.k8s.io/controller-runtime/pkg/log"
)

// Reconciler reconciles a Build object
type Reconciler struct {
	client.Client
	Scheme *runtime.Scheme
}

// +kubebuilder:rbac:groups=core.choreo.dev,resources=builds,verbs=get;list;watch;create;update;patch;delete
// +kubebuilder:rbac:groups=core.choreo.dev,resources=builds/status,verbs=get;update;patch
// +kubebuilder:rbac:groups=core.choreo.dev,resources=builds/finalizers,verbs=update

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

	// Check if the namespace exists, and create it if not
	if err := r.ensureNamespaceResources(ctx, "argo-build", logger); err != nil {
		return ctrl.Result{Requeue: true}, err
	}

	// Build is in the completed status
	if meta.FindStatusCondition(build.Status.Conditions, "Completed") != nil {
		return ctrl.Result{}, nil
	}

	existingWorkflow, err := r.ensureWorkflow(ctx, build, logger)
	if err != nil {
		return ctrl.Result{Requeue: true}, err
	}

	result, err := r.handleBuildSteps(ctx, build, existingWorkflow.Status.Nodes, logger)

	if meta.IsStatusConditionPresentAndEqual(build.Status.Conditions, "Completed", metav1.ConditionTrue) {
		err := r.createDeployableArtifact(ctx, build, logger)
		if err != nil {
			return ctrl.Result{Requeue: true}, err
		}
	}
	return result, err
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
		logger.Error(err, "Failed to create namespace", "Namespace", namespaceName)
		return err
	}

	// // Step 2: Create ServiceAccount
	// sa := &corev1.ServiceAccount{
	//	ObjectMeta: metav1.ObjectMeta{
	//		Name:      "argo-workflow-sa",
	//		Namespace: namespaceName,
	//	},
	// }
	// if err := r.Client.Create(ctx, sa); err != nil && !apierrors.IsAlreadyExists(err) {
	//	logger.Error(err, "Failed to create ServiceAccount", "Namespace", namespaceName)
	//	return err
	// }
	//
	// // Step 3: Create Role
	// role := &rbacv1.Role{
	//	ObjectMeta: metav1.ObjectMeta{
	//		Name:      "argo-workflow-role",
	//		Namespace: namespaceName,
	//	},
	//	Rules: []rbacv1.PolicyRule{
	//		{
	//			APIGroups: []string{"argoproj.io"},
	//			Resources: []string{"workflowtaskresults"},
	//			Verbs:     []string{"create", "get", "list", "watch", "update", "patch"},
	//		},
	//	},
	// }
	// if err := r.Client.Create(ctx, role); err != nil && !apierrors.IsAlreadyExists(err) {
	//	logger.Error(err, "Failed to create Role", "Namespace", namespaceName)
	//	return err
	// }
	//
	// // Step 4: Create RoleBinding
	// roleBinding := &rbacv1.RoleBinding{
	//	ObjectMeta: metav1.ObjectMeta{
	//		Name:      "argo-workflow-binding",
	//		Namespace: namespaceName,
	//	},
	//	Subjects: []rbacv1.Subject{
	//		{
	//			Kind:      "ServiceAccount",
	//			Name:      "argo-workflow-sa",
	//			Namespace: namespaceName,
	//		},
	//	},
	//	RoleRef: rbacv1.RoleRef{
	//		Kind:     "Role",
	//		Name:     "argo-workflow-role",
	//		APIGroup: "rbac.authorization.k8s.io",
	//	},
	// }
	// if err := r.Client.Create(ctx, roleBinding); err != nil && !apierrors.IsAlreadyExists(err) {
	//	logger.Error(err, "Failed to create RoleBinding", "Namespace", namespaceName)
	//	return err
	// }
	logger.Info("Namespace resources created successfully", "Namespace", namespaceName)
	return nil
}

func (r *Reconciler) ensureWorkflow(ctx context.Context, build *choreov1.Build, logger logr.Logger) (*argo.Workflow, error) {
	existingWorkflow := argo.Workflow{}
	err := r.Get(ctx, client.ObjectKey{Name: build.ObjectMeta.Name, Namespace: "argo-build"}, &existingWorkflow)
	if err != nil {
		// Create the workflow
		if apierrors.IsNotFound(err) {
			var workflow argo.Workflow
			// Buildpack path
			if build.Spec.BuildConfiguration.Buildpack.Name != "" {
				workflow = *createBuildpackWorkflow(build)
			} else { // Dockerpath
				// TODO
				workflow = argo.Workflow{}
			}

			if err := r.Create(ctx, &workflow); err != nil {
				return nil, err
			}

			newCondition := metav1.Condition{
				Type:               "Initialized",
				Status:             metav1.ConditionTrue,
				LastTransitionTime: metav1.Now(),
				Reason:             "WorkflowCreated",
				Message:            "Workflow was created in the cluster.",
			}
			changed := meta.SetStatusCondition(&build.Status.Conditions, newCondition)
			if changed {
				logger.Info("Updating Build status", "Build.Name", build.Name)
				if err := r.Status().Update(ctx, build); err != nil {
					logger.Error(err, "Failed to update Build status", "Build.Name", build.Name, "Build.Status", build.Status)
					return nil, err
				}
				logger.Info("Updated Build status", "Build.Name", build.Name)
			}
			return nil, err
		}
		return nil, err
	}
	return &existingWorkflow, nil
}

// TODO: Break down this function
func (r *Reconciler) handleBuildSteps(ctx context.Context, build *choreov1.Build, Nodes argo.Nodes, logger logr.Logger) (ctrl.Result, error) {
	steps := []struct {
		stepName      string
		conditionType string
	}{
		{"clone-step", "CloneSucceeded"},
		{"build-step", "BuildSucceeded"},
		{"push-step", "PushSucceeded"},
	}
	stepInfo, isFound := GetStepByTemplateName(Nodes, steps[0].stepName)
	if isFound && meta.FindStatusCondition(build.Status.Conditions, steps[0].conditionType) == nil {
		switch getStepPhase(stepInfo.Phase) {
		// Edge case, this would not occur
		case Unknown:
			// Set condition Clone to false
			// Do not retry and set completed condition
			newCondition := metav1.Condition{
				Type:               steps[0].conditionType,
				Status:             metav1.ConditionFalse,
				LastTransitionTime: metav1.Now(),
				Reason:             "CloneFailed",
				Message:            "Unknown status was found.",
			}
			changed := meta.SetStatusCondition(&build.Status.Conditions, newCondition)
			if changed {
				logger.Info("Updating Build status", "Build.Name", build.Name)
				if err := r.Status().Update(ctx, build); err != nil {
					logger.Error(err, "Failed to update Build status", "Build.Name", build.Name)
					return ctrl.Result{Requeue: true}, err
				}
				logger.Info("Updated Build status", "Build.Name", build.Name)
			}
			newCondition = metav1.Condition{
				Type:               "Completed",
				Status:             metav1.ConditionTrue,
				LastTransitionTime: metav1.Now(),
				Reason:             "BuildCompleted",
				Message:            "Build completed with an unknown status.",
			}
			changed = meta.SetStatusCondition(&build.Status.Conditions, newCondition)
			if changed {
				logger.Info("Updating Build status", "Build.Name", build.Name)
				if err := r.Status().Update(ctx, build); err != nil {
					logger.Error(err, "Failed to update Build status", "Build.Name", build.Name)
					return ctrl.Result{Requeue: true}, err
				}
				logger.Info("Updated Build status", "Build.Name", build.Name)
			}
			return ctrl.Result{Requeue: false}, fmt.Errorf("Source code clone step failed due to an unknown error")
		case Running:
			return ctrl.Result{Requeue: true}, nil
		case Succeeded:
			// Set condition Cloned to true
			newCondition := metav1.Condition{
				Type:               steps[0].conditionType,
				Status:             metav1.ConditionTrue,
				LastTransitionTime: metav1.Now(),
				Reason:             "CloneCompleted",
				Message:            "Source code cloning was successful.",
			}
			changed := meta.SetStatusCondition(&build.Status.Conditions, newCondition)
			if changed {
				logger.Info("Updating Build status", "Build.Name", build.Name)
				if err := r.Status().Update(ctx, build); err != nil {
					logger.Error(err, "Failed to update Build status", "Build.Name", build.Name)
					return ctrl.Result{Requeue: true}, err
				}
				logger.Info("Updated Build status", "Build.Name", build.Name)
			}
		case Failed:
			// Set condition Cloned to false
			// Do not retry and set completed condition
			newCondition := metav1.Condition{
				Type:               steps[0].conditionType,
				Status:             metav1.ConditionFalse,
				LastTransitionTime: metav1.Now(),
				Reason:             "CloneFailed",
				Message:            "Source code cloning was failed.",
			}
			changed := meta.SetStatusCondition(&build.Status.Conditions, newCondition)
			if changed {
				logger.Info("Updating Build status", "Build.Name", build.Name)
				if err := r.Status().Update(ctx, build); err != nil {
					logger.Error(err, "Failed to update Build status", "Build.Name", build.Name)
					return ctrl.Result{Requeue: true}, err
				}
				logger.Info("Updated Build status", "Build.Name", build.Name)
			}
			newCondition = metav1.Condition{
				Type:               "Completed",
				Status:             metav1.ConditionTrue,
				LastTransitionTime: metav1.Now(),
				Reason:             "BuildCompleted",
				Message:            "Build completed with a failure status.",
			}
			changed = meta.SetStatusCondition(&build.Status.Conditions, newCondition)
			if changed {
				logger.Info("Updating Build status", "Build.Name", build.Name)
				if err := r.Status().Update(ctx, build); err != nil {
					logger.Error(err, "Failed to update Build status", "Build.Name", build.Name)
					return ctrl.Result{Requeue: true}, err
				}
				logger.Info("Updated Build status", "Build.Name", build.Name)
			}
			return ctrl.Result{Requeue: false}, fmt.Errorf("Source code clone step failed")
		}
	}

	stepInfo, isFound = GetStepByTemplateName(Nodes, steps[1].stepName)
	if isFound && meta.FindStatusCondition(build.Status.Conditions, steps[1].conditionType) == nil {
		switch getStepPhase(stepInfo.Phase) {
		case Unknown:
			// Set condition Build to false
			// Do not retry and set completed condition
			newCondition := metav1.Condition{
				Type:               steps[1].conditionType,
				Status:             metav1.ConditionFalse,
				LastTransitionTime: metav1.Now(),
				Reason:             "BuildFailed",
				Message:            "Unknown status was found.",
			}
			changed := meta.SetStatusCondition(&build.Status.Conditions, newCondition)
			if changed {
				logger.Info("Updating Build status", "Build.Name", build.Name)
				if err := r.Status().Update(ctx, build); err != nil {
					logger.Error(err, "Failed to update Build status", "Build.Name", build.Name)
					return ctrl.Result{Requeue: true}, err
				}
				logger.Info("Updated Build status", "Build.Name", build.Name)
			}
			newCondition = metav1.Condition{
				Type:               "Completed",
				Status:             metav1.ConditionTrue,
				LastTransitionTime: metav1.Now(),
				Reason:             "BuildCompleted",
				Message:            "Build completed with an unknown status.",
			}
			changed = meta.SetStatusCondition(&build.Status.Conditions, newCondition)
			if changed {
				logger.Info("Updating Build status", "Build.Name", build.Name)
				if err := r.Status().Update(ctx, build); err != nil {
					logger.Error(err, "Failed to update Build status", "Build.Name", build.Name)
					return ctrl.Result{Requeue: true}, err
				}
				logger.Info("Updated Build status", "Build.Name", build.Name)
			}
			return ctrl.Result{Requeue: false}, fmt.Errorf("Image build step failed due to an unknown error")
		case Running:
			return ctrl.Result{Requeue: true}, nil
		case Succeeded:
			// Set condition Build to true
			newCondition := metav1.Condition{
				Type:               steps[1].conditionType,
				Status:             metav1.ConditionTrue,
				LastTransitionTime: metav1.Now(),
				Reason:             "BuildCompleted",
				Message:            "Image build was successful.",
			}
			changed := meta.SetStatusCondition(&build.Status.Conditions, newCondition)
			if changed {
				logger.Info("Updating Build status", "Build.Name", build.Name)
				if err := r.Status().Update(ctx, build); err != nil {
					logger.Error(err, "Failed to update Build status", "Build.Name", build.Name)
					return ctrl.Result{Requeue: true}, err
				}
				logger.Info("Updated Build status", "Build.Name", build.Name)
			}
		case Failed:
			// Set condition Build to false
			// Do not retry and set completed condition
			newCondition := metav1.Condition{
				Type:               steps[1].conditionType,
				Status:             metav1.ConditionFalse,
				LastTransitionTime: metav1.Now(),
				Reason:             "BuildFailed",
				Message:            "Image build was failed.",
			}
			changed := meta.SetStatusCondition(&build.Status.Conditions, newCondition)
			if changed {
				logger.Info("Updating Build status", "Build.Name", build.Name)
				if err := r.Status().Update(ctx, build); err != nil {
					logger.Error(err, "Failed to update Build status", "Build.Name", build.Name)
					return ctrl.Result{Requeue: true}, err
				}
				logger.Info("Updated Build status", "Build.Name", build.Name)
			}
			newCondition = metav1.Condition{
				Type:               "Completed",
				Status:             metav1.ConditionTrue,
				LastTransitionTime: metav1.Now(),
				Reason:             "BuildCompleted",
				Message:            "Build completed with a failure status.",
			}
			changed = meta.SetStatusCondition(&build.Status.Conditions, newCondition)
			if changed {
				logger.Info("Updating Build status", "Build.Name", build.Name)
				if err := r.Status().Update(ctx, build); err != nil {
					logger.Error(err, "Failed to update Build status", "Build.Name", build.Name)
					return ctrl.Result{Requeue: true}, err
				}
				logger.Info("Updated Build status", "Build.Name", build.Name)
			}
			return ctrl.Result{Requeue: false}, fmt.Errorf("Image build step failed")
		}
	}

	stepInfo, isFound = GetStepByTemplateName(Nodes, steps[2].stepName)
	if isFound && meta.FindStatusCondition(build.Status.Conditions, steps[2].conditionType) == nil {
		switch getStepPhase(stepInfo.Phase) {
		case Unknown:
			// Set condition Push to false
			// Do not retry and set completed condition
			newCondition := metav1.Condition{
				Type:               steps[2].conditionType,
				Status:             metav1.ConditionFalse,
				LastTransitionTime: metav1.Now(),
				Reason:             "ImagePushFailed",
				Message:            "Unknown status was found.",
			}
			changed := meta.SetStatusCondition(&build.Status.Conditions, newCondition)
			if changed {
				logger.Info("Updating Build status", "Build.Name", build.Name)
				if err := r.Status().Update(ctx, build); err != nil {
					logger.Error(err, "Failed to update Build status", "Build.Name", build.Name)
					return ctrl.Result{Requeue: true}, err
				}
				logger.Info("Updated Build status", "Build.Name", build.Name)
			}
			newCondition = metav1.Condition{
				Type:               "Completed",
				Status:             metav1.ConditionTrue,
				LastTransitionTime: metav1.Now(),
				Reason:             "BuildCompleted",
				Message:            "Build completed with an unknown status.",
			}
			changed = meta.SetStatusCondition(&build.Status.Conditions, newCondition)
			if changed {
				logger.Info("Updating Build status", "Build.Name", build.Name)
				if err := r.Status().Update(ctx, build); err != nil {
					logger.Error(err, "Failed to update Build status", "Build.Name", build.Name)
					return ctrl.Result{Requeue: true}, err
				}
				logger.Info("Updated Build status", "Build.Name", build.Name)
			}
			return ctrl.Result{Requeue: false}, fmt.Errorf("Image push step failed due to an unknown error")
		case Running:
			return ctrl.Result{Requeue: true}, nil
		case Succeeded:
			// Set condition Push to true
			newCondition := metav1.Condition{
				Type:               steps[2].conditionType,
				Status:             metav1.ConditionTrue,
				LastTransitionTime: metav1.Now(),
				Reason:             "ImagePushCompleted",
				Message:            "Image push to the registry was successful.",
			}
			changed := meta.SetStatusCondition(&build.Status.Conditions, newCondition)
			if changed {
				logger.Info("Updating Build status", "Build.Name", build.Name)
				if err := r.Status().Update(ctx, build); err != nil {
					logger.Error(err, "Failed to update Build status", "Build.Name", build.Name)
					return ctrl.Result{Requeue: true}, err
				}
				logger.Info("Updated Build status", "Build.Name", build.Name)
			}
			newCondition = metav1.Condition{
				Type:               "Completed",
				Status:             metav1.ConditionTrue,
				LastTransitionTime: metav1.Now(),
				Reason:             "BuildCompleted",
				Message:            "Build completed successfully.",
			}
			changed = meta.SetStatusCondition(&build.Status.Conditions, newCondition)
			if changed {
				logger.Info("Updating Build status", "Build.Name", build.Name)
				if err := r.Status().Update(ctx, build); err != nil {
					logger.Error(err, "Failed to update Build status", "Build.Name", build.Name)
					return ctrl.Result{Requeue: true}, err
				}
				logger.Info("Updated Build status", "Build.Name", build.Name)
			}
			return ctrl.Result{Requeue: true}, nil
		case Failed:
			// Set condition Push to false
			// Do not retry and set completed condition
			newCondition := metav1.Condition{
				Type:               steps[2].conditionType,
				Status:             metav1.ConditionFalse,
				LastTransitionTime: metav1.Now(),
				Reason:             "ImagePushFailed",
				Message:            "Image push was failed.",
			}
			changed := meta.SetStatusCondition(&build.Status.Conditions, newCondition)
			if changed {
				logger.Info("Updating Build status", "Build.Name", build.Name)
				if err := r.Status().Update(ctx, build); err != nil {
					logger.Error(err, "Failed to update Build status", "Build.Name", build.Name)
					return ctrl.Result{Requeue: true}, err
				}
				logger.Info("Updated Build status", "Build.Name", build.Name)
			}
			newCondition = metav1.Condition{
				Type:               "Completed",
				Status:             metav1.ConditionTrue,
				LastTransitionTime: metav1.Now(),
				Reason:             "BuildCompleted",
				Message:            "Build completed with a failure status.",
			}
			changed = meta.SetStatusCondition(&build.Status.Conditions, newCondition)
			if changed {
				logger.Info("Updating Build status", "Build.Name", build.Name)
				if err := r.Status().Update(ctx, build); err != nil {
					logger.Error(err, "Failed to update Build status", "Build.Name", build.Name)
					return ctrl.Result{Requeue: true}, err
				}
				logger.Info("Updated Build status", "Build.Name", build.Name)
			}
			return ctrl.Result{Requeue: false}, fmt.Errorf("Image push step failed")
		}
	}
	return ctrl.Result{Requeue: true}, nil
}

type StepPhase string

// Workflow and node statuses
const (
	Running   StepPhase = "Running"
	Succeeded StepPhase = "Succeeded"
	Failed    StepPhase = "Failed"
	Unknown   StepPhase = "Unknown"
)

func getStepPhase(phase argo.NodePhase) StepPhase {
	switch phase {
	case argo.NodeRunning, argo.NodePending:
		return Running
	case argo.NodeFailed, argo.NodeError, argo.NodeSkipped:
		return Failed
	case argo.NodeSucceeded:
		return Succeeded
	}
	return Unknown
}

func GetStepByTemplateName(nodes argo.Nodes, step string) (*argo.NodeStatus, bool) {
	for _, node := range nodes {
		if node.TemplateName == step {
			return &node, true
		}
	}
	return nil, false
}

func generateImageName(build *choreov1.Build) string {
	// Extract necessary fields
	componentName := build.ObjectMeta.Labels["core.choreo.dev/component"]
	orgName := build.ObjectMeta.Labels["core.choreo.dev/organization"]
	projName := build.ObjectMeta.Labels["core.choreo.dev/project"]

	// Create the hash input
	hashInput := fmt.Sprintf("%s-%s", orgName, projName)

	// Generate SHA256 hash
	hash := sha256.Sum256([]byte(hashInput))

	// Convert hash to hex string
	hashString := hex.EncodeToString(hash[:])

	// Generate the final string
	return fmt.Sprintf("%s-%s:%s-latest", hashString, componentName, build.ObjectMeta.Labels["core.choreo.dev/deployment-track"])
}

func hashBuildSpec(build choreov1.Build) (string, error) {
	// Marshal the spec into JSON
	specJSON, err := json.Marshal(build.Spec)
	if err != nil {
		return "", fmt.Errorf("failed to marshal spec: %w", err)
	}

	// Compute SHA256 hash
	hash := sha256.Sum256(specJSON)

	// Convert hash to a hexadecimal string
	return hex.EncodeToString(hash[:]), nil
}

func generateDeployableArtifactName(build choreov1.Build) string {
	hashedBuildSpec, err := hashBuildSpec(build)
	if err != nil {
		return build.ObjectMeta.Name
	}
	return fmt.Sprintf("%s-%s", build.ObjectMeta.Name, hashedBuildSpec)
}

// NewDeployableArtifact creates a DeployableArtifact instance.
func (r *Reconciler) createDeployableArtifact(ctx context.Context, build *choreov1.Build, logger logr.Logger) error {
	deployableArtifact := &choreov1.DeployableArtifact{
		TypeMeta: metav1.TypeMeta{
			Kind:       "DeployableArtifact",
			APIVersion: "core.choreo.dev/v1",
		},
		ObjectMeta: metav1.ObjectMeta{
			Name:      generateDeployableArtifactName(*build),
			Namespace: build.ObjectMeta.Namespace,
			Annotations: map[string]string{
				"core.choreo.dev/display-name": build.ObjectMeta.Name,
				"core.choreo.dev/description":  "Deployable Artifact was created by the buld.",
			},
			Labels: map[string]string{
				"core.choreo.dev/deployment-track": build.ObjectMeta.Labels["deployment-track"],
				"core.choreo.dev/component":        build.ObjectMeta.Labels["component"],
				"core.choreo.dev/project":          build.ObjectMeta.Labels["project"],
				"core.choreo.dev/organization":     build.ObjectMeta.Labels["organization"],
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
	if err := r.Client.Create(ctx, deployableArtifact); err != nil && !apierrors.IsAlreadyExists(err) {
		logger.Error(err, "Failed to create deployable artifact", "Build.Name", build.ObjectMeta.Name)
		return err
	}
	return nil
}

func int32Ptr(i int32) *int32 { return &i }

func createBuildpackWorkflow(build *choreov1.Build) *argo.Workflow {
	repo := "https://github.com/chalindukodikara/choreo-samples.git"
	var branch string
	if build.Spec.Branch != "" {
		branch = build.Spec.Branch
	} else {
		branch = "dev"
	}
	// Create the Argo Workflow object
	hostPathType := corev1.HostPathDirectoryOrCreate
	workflow := argo.Workflow{
		ObjectMeta: metav1.ObjectMeta{
			Name:      build.ObjectMeta.Name,
			Namespace: "argo-build",
		},
		Spec: argo.WorkflowSpec{
			ServiceAccountName: "argo-workflow",
			Entrypoint:         "build-workflow",
			Templates: []argo.Template{
				{
					Name: "build-workflow",
					Steps: []argo.ParallelSteps{
						{
							Steps: []argo.WorkflowStep{
								{Name: "clone-step", Template: "clone-step"},
							},
						},
						{
							Steps: []argo.WorkflowStep{
								{Name: "build-step", Template: "build-step"},
							},
						},
						{
							Steps: []argo.WorkflowStep{
								{Name: "push-step", Template: "push-step"},
							},
						},
					},
				},
				{
					Name: "clone-step",
					Container: &corev1.Container{
						Image:   "alpine/git",
						Command: []string{"sh", "-c"},
						Args: []string{
							fmt.Sprintf(`set -e
echo "Cloning repository from branch %s..."
git clone --single-branch --branch %s %s /mnt/vol/source
echo "Repository cloned successfully."`, branch, branch, repo),
						},
						VolumeMounts: []corev1.VolumeMount{
							{Name: "workspace", MountPath: "/mnt/vol"},
						},
					},
				},
				{
					Name: "build-step",
					Container: &corev1.Container{
						Image: "chalindukodikara/podman:v1.0",
						SecurityContext: &corev1.SecurityContext{
							Privileged: ptr.To(true),
						},
						Command: []string{"sh", "-c"},
						Args:    generateBuildArgs(build),
						VolumeMounts: []corev1.VolumeMount{
							{Name: "workspace", MountPath: "/mnt/vol"},
							{Name: "podman-cache", MountPath: "/shared/podman/cache"},
						},
					},
				},
				{
					Name: "push-step",
					Container: &corev1.Container{
						Image: "chalindukodikara/podman:v1.0",
						SecurityContext: &corev1.SecurityContext{
							Privileged: ptr.To(true),
						},
						Command: []string{"sh", "-c"},
						Args: []string{
							fmt.Sprintf(`set -e
echo "Configuring Podman storage..."
mkdir -p /etc/containers
cat <<EOF > /etc/containers/storage.conf
[storage]
driver = "overlay"
runroot = "/run/containers/storage"
graphroot = "/shared/podman/cache"
[storage.options.overlay]
mount_program = "/usr/bin/fuse-overlayfs"
EOF

podman load -i /mnt/vol/app-image.tar
echo "Tagging Docker image for the registry..."
podman tag %s registry.choreo-dp:5000/%s
echo "Pushing Docker image to the registry..."
podman push --tls-verify=false registry.choreo-dp:5000/%s
echo "Docker image pushed successfully."`, generateImageName(build), generateImageName(build), generateImageName(build)),
						},
						VolumeMounts: []corev1.VolumeMount{
							{Name: "workspace", MountPath: "/mnt/vol"},
							{Name: "podman-cache", MountPath: "/shared/podman/cache"},
						},
					},
				},
			},
			VolumeClaimTemplates: []corev1.PersistentVolumeClaim{
				{
					ObjectMeta: metav1.ObjectMeta{
						Name: "workspace",
					},
					Spec: corev1.PersistentVolumeClaimSpec{
						AccessModes: []corev1.PersistentVolumeAccessMode{
							corev1.ReadWriteOnce,
						},
						Resources: corev1.VolumeResourceRequirements{
							Requests: corev1.ResourceList{
								corev1.ResourceStorage: resource.MustParse("2Gi"),
							},
						},
					},
				},
			},
			Affinity: &corev1.Affinity{
				NodeAffinity: &corev1.NodeAffinity{
					RequiredDuringSchedulingIgnoredDuringExecution: &corev1.NodeSelector{
						NodeSelectorTerms: []corev1.NodeSelectorTerm{
							{
								MatchExpressions: []corev1.NodeSelectorRequirement{
									{
										Key:      "kubernetes.io/hostname",
										Operator: corev1.NodeSelectorOpIn,
										Values:   []string{"kind-worker2"},
									},
								},
							},
						},
					},
				},
			},
			Volumes: []corev1.Volume{
				{
					Name: "podman-cache",
					VolumeSource: corev1.VolumeSource{
						HostPath: &corev1.HostPathVolumeSource{
							Path: "/shared/podman/cache",
							Type: &hostPathType,
						},
					},
				},
			},
			TTLStrategy: &argo.TTLStrategy{
				SecondsAfterFailure: int32Ptr(600),
				SecondsAfterSuccess: int32Ptr(600),
			},
		},
	}
	return &workflow
}

func generateBuildArgs(build *choreov1.Build) []string {
	if build.Spec.BuildConfiguration.Buildpack.Name != "" {
		return []string{
			fmt.Sprintf(`set -e
echo "Setting up Podman socket for Buildpacks..."
podman system service --time=0 &
sleep 2

echo "Configuring Podman storage..."
mkdir -p /etc/containers
cat <<EOF > /etc/containers/storage.conf
[storage]
driver = "overlay"
runroot = "/run/containers/storage"
graphroot = "/shared/podman/cache"
[storage.options.overlay]
mount_program = "/usr/bin/fuse-overlayfs"
EOF

echo "Building image using Buildpacks..."
/usr/local/bin/pack build %s \
  --builder=gcr.io/buildpacks/builder:google-22 --docker-host=inherit \
  --path=/mnt/vol/source/%s --platform linux/arm64

echo "Saving Docker image..."
podman save -o /mnt/vol/app-image.tar %s`, generateImageName(build), build.Spec.Path, build.Name),
		}
	}
	return []string{
		fmt.Sprintf(`set -e
echo "Setting up Podman socket for Buildpacks..."
podman system service --time=0 &
sleep 2

echo "Configuring Podman storage..."
mkdir -p /etc/containers
cat <<EOF > /etc/containers/storage.conf
[storage]
driver = "overlay"
runroot = "/run/containers/storage"
graphroot = "/shared/podman/cache"
[storage.options.overlay]
mount_program = "/usr/bin/fuse-overlayfs"
EOF

echo "Building Docker image..."
podman build -t %s /mnt/vol/source/%s

echo "Saving Docker image..."
podman save -o /mnt/vol/app-image.tar %s`, generateImageName(build), build.Spec.Path, build.Name),
	}
}
