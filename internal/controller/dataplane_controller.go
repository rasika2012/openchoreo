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

// DataPlaneReconciler reconciles a DataPlane object
type DataPlaneReconciler struct {
	client.Client
	Scheme *runtime.Scheme
}

// +kubebuilder:rbac:groups=core.choreo.dev,resources=dataplanes,verbs=get;list;watch;create;update;patch;delete
// +kubebuilder:rbac:groups=core.choreo.dev,resources=dataplanes/status,verbs=get;update;patch
// +kubebuilder:rbac:groups=core.choreo.dev,resources=dataplanes/finalizers,verbs=update

// Reconcile is part of the main kubernetes reconciliation loop which aims to
// move the current state of the cluster closer to the desired state.
// TODO(user): Modify the Reconcile function to compare the state specified by
// the DataPlane object against the actual cluster state, and then
// perform operations to make the cluster state reflect the state specified by
// the user.
//
// For more details, check Reconcile and its Result here:
// - https://pkg.go.dev/sigs.k8s.io/controller-runtime@v0.19.1/pkg/reconcile
func (r *DataPlaneReconciler) Reconcile(ctx context.Context, req ctrl.Request) (ctrl.Result, error) {
	logger := log.FromContext(ctx)

	// Fetch the DataPlane instance
	dataPlane := &choreov1.DataPlane{}
	if err := r.Get(ctx, req.NamespacedName, dataPlane); err != nil {
		if apierrors.IsNotFound(err) {
			// The DataPlane resource may have been deleted since it triggered the reconcile
			logger.Info("DataPlane resource not found. Ignoring since it must be deleted.")
			return ctrl.Result{}, nil
		}
		// Error reading the object
		logger.Error(err, "Failed to get DataPlane")
		return ctrl.Result{}, err
	}

	dataPlane.Status.ObservedGeneration = dataPlane.Generation
	r.updateCondition(ctx, dataPlane, TypeAvailable, metav1.ConditionTrue, "DataPlaneAvailable", "DataPlane is available")

	return ctrl.Result{}, nil
}

// SetupWithManager sets up the controller with the Manager.
func (r *DataPlaneReconciler) SetupWithManager(mgr ctrl.Manager) error {
	return ctrl.NewControllerManagedBy(mgr).
		For(&corev1.DataPlane{}).
		Named("dataplane").
		Complete(r)
}

// Helper function updateCondition updates or adds a condition
func (r *DataPlaneReconciler) updateCondition(ctx context.Context, dataPlane *choreov1.DataPlane,
	conditionType string, status metav1.ConditionStatus, reason, message string) {
	logger := log.FromContext(ctx)

	condition := metav1.Condition{
		Type:               conditionType,
		Status:             status,
		Reason:             reason,
		Message:            message,
		LastTransitionTime: metav1.Now(),
	}

	changed := meta.SetStatusCondition(&dataPlane.Status.Conditions, condition)
	if changed {

		logger.Info("Updating Resource status", "DataPlane.Name", dataPlane.Name)
		if err := r.Status().Update(ctx, dataPlane); err != nil {
			logger.Error(err, "Failed to update DataPlane status", "DataPlane.Name", dataPlane.Name)
			return
		}
		logger.Info("Updated Resource status", "DataPlane.Name", dataPlane.Name)
	}
}
