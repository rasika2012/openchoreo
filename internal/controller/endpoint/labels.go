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

package endpoint

import (
	"github.com/wso2-enterprise/choreo-cp-declarative-api/internal/controller"
	integrations "github.com/wso2-enterprise/choreo-cp-declarative-api/internal/controller/endpoint/integrations"
	dpkubernetes "github.com/wso2-enterprise/choreo-cp-declarative-api/internal/dataplane/kubernetes"
)

func makeLabels(endpointCtx *integrations.EndpointContext) map[string]string {
	return map[string]string{
		dpkubernetes.LabelKeyOrganizationName: controller.GetOrganizationName(endpointCtx.Project),
		dpkubernetes.LabelKeyProjectName:      controller.GetName(endpointCtx.Project),
		dpkubernetes.LabelKeyProjectID:        string(endpointCtx.Project.UID),
		dpkubernetes.LabelKeyComponentName:    controller.GetName(endpointCtx.Component),
		dpkubernetes.LabelKeyComponentID:      string(endpointCtx.Component.UID),
		dpkubernetes.LabelKeyManagedBy:        dpkubernetes.LabelValueManagedBy,
		dpkubernetes.LabelKeyBelongTo:         dpkubernetes.LabelValueBelongTo,
	}
}

func makeWorkloadLabels(endpointCtx *integrations.EndpointContext) map[string]string {
	labels := makeLabels(endpointCtx)
	labels[dpkubernetes.LabelKeyComponentType] = string(endpointCtx.Component.Spec.Type)
	return labels
}
