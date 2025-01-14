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

package controller

import (
	"context"

	apierrors "k8s.io/apimachinery/pkg/api/errors"
	"k8s.io/apimachinery/pkg/api/meta"
	metav1 "k8s.io/apimachinery/pkg/apis/meta/v1"
	"k8s.io/apimachinery/pkg/runtime"
	ctrl "sigs.k8s.io/controller-runtime"
	"sigs.k8s.io/controller-runtime/pkg/client"
	"sigs.k8s.io/controller-runtime/pkg/log"

	choreov1 "github.com/wso2-enterprise/choreo-cp-declarative-api/api/v1"
	corev1 "github.com/wso2-enterprise/choreo-cp-declarative-api/api/v1"
)

// DeploymentPipelineReconciler reconciles a DeploymentPipeline object
type DeploymentPipelineReconciler struct {
	client.Client
	Scheme *runtime.Scheme
}

// +kubebuilder:rbac:groups=core.choreo.dev,resources=deploymentpipelines,verbs=get;list;watch;create;update;patch;delete
// +kubebuilder:rbac:groups=core.choreo.dev,resources=deploymentpipelines/status,verbs=get;update;patch
// +kubebuilder:rbac:groups=core.choreo.dev,resources=deploymentpipelines/finalizers,verbs=update

// Reconcile is part of the main kubernetes reconciliation loop which aims to
// move the current state of the cluster closer to the desired state.
// TODO(user): Modify the Reconcile function to compare the state specified by
// the DeploymentPipeline object against the actual cluster state, and then
// perform operations to make the cluster state reflect the state specified by
// the user.
//
// For more details, check Reconcile and its Result here:
// - https://pkg.go.dev/sigs.k8s.io/controller-runtime@v0.19.1/pkg/reconcile
func (r *DeploymentPipelineReconciler) Reconcile(ctx context.Context, req ctrl.Request) (ctrl.Result, error) {
	logger := log.FromContext(ctx)

	// Fetch the DeploymentPipeline instance
	deploymentPipeline := &choreov1.DeploymentPipeline{}
	if err := r.Get(ctx, req.NamespacedName, deploymentPipeline); err != nil {
		if apierrors.IsNotFound(err) {
			// The DeploymentPipeline resource may have been deleted since it triggered the reconcile
			logger.Info("DeploymentPipeline resource not found. Ignoring since it must be deleted.")
			return ctrl.Result{}, nil
		}
		// Error reading the object
		logger.Error(err, "Failed to get DeploymentPipeline")
		return ctrl.Result{}, err
	}

	deploymentPipeline.Status.ObservedGeneration = deploymentPipeline.Generation
	r.updateCondition(ctx, deploymentPipeline, TypeAvailable, metav1.ConditionTrue, "ProjectAvailable", "Project is available")

	return ctrl.Result{}, nil

}

// SetupWithManager sets up the controller with the Manager.
func (r *DeploymentPipelineReconciler) SetupWithManager(mgr ctrl.Manager) error {
	return ctrl.NewControllerManagedBy(mgr).
		For(&corev1.DeploymentPipeline{}).
		Named("deploymentpipeline").
		Complete(r)
}

// Helper function updateCondition updates or adds a condition
func (r *DeploymentPipelineReconciler) updateCondition(ctx context.Context, deploymentPipeline *choreov1.DeploymentPipeline,
	conditionType string, status metav1.ConditionStatus, reason, message string) {
	logger := log.FromContext(ctx)

	condition := metav1.Condition{
		Type:               conditionType,
		Status:             status,
		Reason:             reason,
		Message:            message,
		LastTransitionTime: metav1.Now(),
	}

	changed := meta.SetStatusCondition(&deploymentPipeline.Status.Conditions, condition)
	if changed {

		logger.Info("Updating Resource status", "DeploymentPipeline.Name", deploymentPipeline.Name)
		if err := r.Status().Update(ctx, deploymentPipeline); err != nil {
			logger.Error(err, "Failed to update DeploymentPipeline status", "DeploymentPipeline.Name", deploymentPipeline.Name)
			return
		}
		logger.Info("Updated Resource status", "DeploymentPipeline.Name", deploymentPipeline.Name)
	}
}
