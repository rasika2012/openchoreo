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

package component

import (
	"context"

	corev1 "k8s.io/api/core/v1"
	apierrors "k8s.io/apimachinery/pkg/api/errors"
	"k8s.io/apimachinery/pkg/api/meta"
	metav1 "k8s.io/apimachinery/pkg/apis/meta/v1"
	"k8s.io/apimachinery/pkg/runtime"
	"k8s.io/client-go/tools/record"
	ctrl "sigs.k8s.io/controller-runtime"
	"sigs.k8s.io/controller-runtime/pkg/client"
	"sigs.k8s.io/controller-runtime/pkg/log"

	choreov1 "github.com/wso2-enterprise/choreo-cp-declarative-api/api/v1"
	"github.com/wso2-enterprise/choreo-cp-declarative-api/internal/controller"
)

// Reconciler reconciles a Component object
type Reconciler struct {
	client.Client
	Scheme   *runtime.Scheme
	recorder record.EventRecorder
}

// +kubebuilder:rbac:groups=core.choreo.dev,resources=components,verbs=get;list;watch;create;update;patch;delete
// +kubebuilder:rbac:groups=core.choreo.dev,resources=components/status,verbs=get;update;patch
// +kubebuilder:rbac:groups=core.choreo.dev,resources=components/finalizers,verbs=update

// Reconcile is part of the main kubernetes reconciliation loop which aims to
// move the current state of the cluster closer to the desired state.
// TODO(user): Modify the Reconcile function to compare the state specified by
// the Component object against the actual cluster state, and then
// perform operations to make the cluster state reflect the state specified by
// the user.
//
// For more details, check Reconcile and its Result here:
// - https://pkg.go.dev/sigs.k8s.io/controller-runtime@v0.19.1/pkg/reconcile
func (r *Reconciler) Reconcile(ctx context.Context, req ctrl.Request) (ctrl.Result, error) {
	logger := log.FromContext(ctx)

	// Fetch the Component instance
	component := &choreov1.Component{}
	if err := r.Get(ctx, req.NamespacedName, component); err != nil {
		if apierrors.IsNotFound(err) {
			// The Component resource may have been deleted since it triggered the reconcile
			logger.Info("Component resource not found. Ignoring since it must be deleted.")
			return ctrl.Result{}, nil
		}
		// Error reading the object
		logger.Error(err, "Failed to get Component")
		return ctrl.Result{}, err
	}

	previousCondition := meta.FindStatusCondition(component.Status.Conditions, controller.TypeCreated)

	component.Status.ObservedGeneration = component.Generation
	if err := controller.UpdateCondition(
		ctx,
		r.Status(),
		component,
		&component.Status.Conditions,
		controller.TypeCreated,
		metav1.ConditionTrue,
		"ComponentCreated",
		"Component is created",
	); err != nil {
		return ctrl.Result{}, err
	} else {
		if previousCondition == nil {
			r.recorder.Event(component, corev1.EventTypeNormal, "ReconcileComplete", "Successfully created "+component.Name)
		}
	}

	return ctrl.Result{}, nil
}

// SetupWithManager sets up the controller with the Manager.
func (r *Reconciler) SetupWithManager(mgr ctrl.Manager) error {
	if r.recorder == nil {
		r.recorder = mgr.GetEventRecorderFor("component-controller")
	}

	return ctrl.NewControllerManagedBy(mgr).
		For(&choreov1.Component{}).
		Named("component").
		Complete(r)
}
