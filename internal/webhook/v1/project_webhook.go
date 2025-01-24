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

package v1

import (
	"context"
	"fmt"

	"k8s.io/apimachinery/pkg/runtime"
	ctrl "sigs.k8s.io/controller-runtime"
	logf "sigs.k8s.io/controller-runtime/pkg/log"
	"sigs.k8s.io/controller-runtime/pkg/webhook"
	"sigs.k8s.io/controller-runtime/pkg/webhook/admission"

	corev1 "github.com/wso2-enterprise/choreo-cp-declarative-api/api/v1"
)

// nolint:unused
// log is for logging in this package.
var projectlog = logf.Log.WithName("project-resource")

// SetupProjectWebhookWithManager registers the webhook for Project in the manager.
func SetupProjectWebhookWithManager(mgr ctrl.Manager) error {
	return ctrl.NewWebhookManagedBy(mgr).For(&corev1.Project{}).
		WithValidator(&ProjectCustomValidator{}).
		WithDefaulter(&ProjectCustomDefaulter{}).
		Complete()
}

// TODO(user): EDIT THIS FILE!  THIS IS SCAFFOLDING FOR YOU TO OWN!

// +kubebuilder:webhook:path=/mutate-core-choreo-dev-v1-project,mutating=true,failurePolicy=fail,sideEffects=None,groups=core.choreo.dev,resources=projects,verbs=create;update,versions=v1,name=mproject-v1.kb.io,admissionReviewVersions=v1

// ProjectCustomDefaulter struct is responsible for setting default values on the custom resource of the
// Kind Project when those are created or updated.
//
// NOTE: The +kubebuilder:object:generate=false marker prevents controller-gen from generating DeepCopy methods,
// as it is used only for temporary operations and does not need to be deeply copied.
type ProjectCustomDefaulter struct {
	// TODO(user): Add more fields as needed for defaulting
}

var _ webhook.CustomDefaulter = &ProjectCustomDefaulter{}

// Default implements webhook.CustomDefaulter so a webhook will be registered for the Kind Project.
func (d *ProjectCustomDefaulter) Default(ctx context.Context, obj runtime.Object) error {
	project, ok := obj.(*corev1.Project)

	if !ok {
		return fmt.Errorf("expected an Project object but got %T", obj)
	}
	projectlog.Info("Defaulting for Project", "name", project.GetName())

	// TODO(user): fill in your defaulting logic.

	return nil
}

// TODO(user): change verbs to "verbs=create;update;delete" if you want to enable deletion validation.
// NOTE: The 'path' attribute must follow a specific pattern and should not be modified directly here.
// Modifying the path for an invalid path can cause API server errors; failing to locate the webhook.
// +kubebuilder:webhook:path=/validate-core-choreo-dev-v1-project,mutating=false,failurePolicy=fail,sideEffects=None,groups=core.choreo.dev,resources=projects,verbs=create;update,versions=v1,name=vproject-v1.kb.io,admissionReviewVersions=v1

// ProjectCustomValidator struct is responsible for validating the Project resource
// when it is created, updated, or deleted.
//
// NOTE: The +kubebuilder:object:generate=false marker prevents controller-gen from generating DeepCopy methods,
// as this struct is used only for temporary operations and does not need to be deeply copied.
type ProjectCustomValidator struct {
	// TODO(user): Add more fields as needed for validation
}

var _ webhook.CustomValidator = &ProjectCustomValidator{}

// ValidateCreate implements webhook.CustomValidator so a webhook will be registered for the type Project.
func (v *ProjectCustomValidator) ValidateCreate(ctx context.Context, obj runtime.Object) (admission.Warnings, error) {
	project, ok := obj.(*corev1.Project)
	if !ok {
		return nil, fmt.Errorf("expected a Project object but got %T", obj)
	}
	projectlog.Info("Validation for Project upon creation", "name", project.GetName())

	// TODO(user): fill in your validation logic upon object creation.

	return nil, nil
}

// ValidateUpdate implements webhook.CustomValidator so a webhook will be registered for the type Project.
func (v *ProjectCustomValidator) ValidateUpdate(ctx context.Context, oldObj, newObj runtime.Object) (admission.Warnings, error) {
	project, ok := newObj.(*corev1.Project)
	if !ok {
		return nil, fmt.Errorf("expected a Project object for the newObj but got %T", newObj)
	}
	projectlog.Info("Validation for Project upon update", "name", project.GetName())

	// TODO(user): fill in your validation logic upon object update.

	return nil, nil
}

// ValidateDelete implements webhook.CustomValidator so a webhook will be registered for the type Project.
func (v *ProjectCustomValidator) ValidateDelete(ctx context.Context, obj runtime.Object) (admission.Warnings, error) {
	project, ok := obj.(*corev1.Project)
	if !ok {
		return nil, fmt.Errorf("expected a Project object but got %T", obj)
	}
	projectlog.Info("Validation for Project upon deletion", "name", project.GetName())

	// TODO(user): fill in your validation logic upon object deletion.

	return nil, nil
}
