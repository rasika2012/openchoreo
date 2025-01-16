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
	"fmt"
	corev1 "k8s.io/api/core/v1"
	apierrors "k8s.io/apimachinery/pkg/api/errors"
	"k8s.io/apimachinery/pkg/api/meta"
	"k8s.io/apimachinery/pkg/api/resource"
	metav1 "k8s.io/apimachinery/pkg/apis/meta/v1"

	"k8s.io/apimachinery/pkg/runtime"
	ctrl "sigs.k8s.io/controller-runtime"
	"sigs.k8s.io/controller-runtime/pkg/client"
	"sigs.k8s.io/controller-runtime/pkg/log"

	argo "github.com/argoproj/argo-workflows/pkg/apis/workflow/v1alpha1"
	choreov1 "github.com/wso2-enterprise/choreo-cp-declarative-api/api/v1"
)

// BuildReconciler reconciles a Build object
type BuildReconciler struct {
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
func (r *BuildReconciler) Reconcile(ctx context.Context, req ctrl.Request) (ctrl.Result, error) {
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

	// Create the Argo Workflow if it is not created
	existingWorkflow := Workflow{}
	err := r.Get(ctx, client.ObjectKey{Name: build.ObjectMeta.Name, Namespace: "argo-build"}, &existingWorkflow)
	if err != nil {
		// Create the workflow
		if apierrors.IsNotFound(err) {
			var workflow Workflow
			// Buildpack path
			if build.Spec.BuildConfiguration.Buildpack.Name != "" {
				workflow = *CreateBuildpackWorkflow(build)
			} else { // Dockerpath
				// TODO
				workflow = argo.Workflow{}
			}
			if err := r.Create(ctx, &workflow); err != nil {
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
						logger.Error(err, "Failed to update Build status", "Build.Name", build.Name)
						return ctrl.Result{}, err
					}
					logger.Info("Updated Build status", "Build.Name", build.Name)
				}
				return ctrl.Result{Requeue: true}, err
			}
			return ctrl.Result{Requeue: true}, err
		}
		return ctrl.Result{Requeue: true}, err
	}
	fmt.Println(existingWorkflow)
	return ctrl.Result{}, nil
}

// SetupWithManager sets up the controller with the Manager.
func (r *BuildReconciler) SetupWithManager(mgr ctrl.Manager) error {
	return ctrl.NewControllerManagedBy(mgr).
		For(&choreov1.Build{}).
		Named("build").
		Complete(r)
}

func int32Ptr(i int32) *int32 { return &i }

func CreateBuildpackWorkflow(build *choreov1.Build) *Workflow {
	// Create the Argo Workflow object
	hostPathType := corev1.HostPathDirectoryOrCreate
	workflow := Workflow{
		ObjectMeta: metav1.ObjectMeta{
			Name:      build.ObjectMeta.Name,
			Namespace: "argo-build",
		},
		Spec: WorkflowSpec{
			ServiceAccountName: "argo-workflow",
			Entrypoint:         "build-workflow",
			Templates: []Template{
				{
					Name: "build-workflow",
					Steps: []ParallelSteps{
						{
							Steps: []WorkflowStep{
								{Name: "clone-step", Template: "clone-step"},
								{Name: "build-step", Template: "build-step"},
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
							`set -e
                            echo "Cloning repository from the main branch..."
                            git clone --single-branch --branch dev https://github.com/chalindukodikara/choreo-samples.git /mnt/vol/choreo-samples
                            echo "Repository cloned successfully."`,
						},
						VolumeMounts: []corev1.VolumeMount{
							{Name: "workspace", MountPath: "/mnt/vol"},
						},
					},
				},
				// Add build-step and push-step templates here
			},
			VolumeClaimTemplates: []corev1.PersistentVolumeClaim{
				{
					ObjectMeta: metav1.ObjectMeta{
						Name: "workspace",
					},
					Spec: corev1.PersistentVolumeClaimSpec{
						AccessModes: []corev1.PersistentVolumeAccessMode{
							corev1.ReadWriteMany,
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
			TTLStrategy: &TTLStrategy{
				SecondsAfterFailure: int32Ptr(600),
				SecondsAfterSuccess: int32Ptr(600),
			},
		},
	}
	return &workflow
}
