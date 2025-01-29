package kubernetes

import (
	"github.com/wso2-enterprise/choreo-cp-declarative-api/internal/controller"
	"github.com/wso2-enterprise/choreo-cp-declarative-api/internal/dataplane"
	dpkubernetes "github.com/wso2-enterprise/choreo-cp-declarative-api/internal/dataplane/kubernetes"
)

func makeLabels(endpointCtx *dataplane.EndpointContext) map[string]string {
	return map[string]string{
		dpkubernetes.LabelKeyOrganizationName:    controller.GetOrganizationName(endpointCtx.Project),
		dpkubernetes.LabelKeyProjectName:         controller.GetName(endpointCtx.Project),
		dpkubernetes.LabelKeyProjectID:           string(endpointCtx.Project.UID),
		dpkubernetes.LabelKeyComponentName:       controller.GetName(endpointCtx.Component),
		dpkubernetes.LabelKeyComponentID:         string(endpointCtx.Component.UID),
		dpkubernetes.LabelKeyDeploymentTrackName: controller.GetName(endpointCtx.DeploymentTrack),
		dpkubernetes.LabelKeyDeploymentTrackID:   string(endpointCtx.DeploymentTrack.UID),
		dpkubernetes.LabelKeyEnvironmentName:     controller.GetName(endpointCtx.Environment),
		dpkubernetes.LabelKeyEnvironmentID:       string(endpointCtx.Environment.UID),
		dpkubernetes.LabelKeyDeploymentName:      controller.GetName(endpointCtx.Deployment),
		dpkubernetes.LabelKeyDeploymentID:        string(endpointCtx.Deployment.UID),
		dpkubernetes.LabelKeyManagedBy:           dpkubernetes.LabelValueManagedBy,
		dpkubernetes.LabelKeyBelongTo:            dpkubernetes.LabelValueBelongTo,
	}
}

func makeWorkloadLabels(endpointCtx *dataplane.EndpointContext) map[string]string {
	labels := makeLabels(endpointCtx)
	labels[dpkubernetes.LabelKeyComponentType] = string(endpointCtx.Component.Spec.Type)
	return labels
}

func extractManagedLabels(labels map[string]string) map[string]string {
	return map[string]string{
		dpkubernetes.LabelKeyOrganizationName:    labels[dpkubernetes.LabelKeyOrganizationName],
		dpkubernetes.LabelKeyProjectName:         labels[dpkubernetes.LabelKeyProjectName],
		dpkubernetes.LabelKeyProjectID:           labels[dpkubernetes.LabelKeyProjectID],
		dpkubernetes.LabelKeyComponentName:       labels[dpkubernetes.LabelKeyComponentName],
		dpkubernetes.LabelKeyComponentID:         labels[dpkubernetes.LabelKeyComponentID],
		dpkubernetes.LabelKeyDeploymentTrackName: labels[dpkubernetes.LabelKeyDeploymentTrackName],
		dpkubernetes.LabelKeyDeploymentTrackID:   labels[dpkubernetes.LabelKeyDeploymentTrackID],
		dpkubernetes.LabelKeyEnvironmentName:     labels[dpkubernetes.LabelKeyEnvironmentName],
		dpkubernetes.LabelKeyEnvironmentID:       labels[dpkubernetes.LabelKeyEnvironmentID],
		dpkubernetes.LabelKeyDeploymentName:      labels[dpkubernetes.LabelKeyDeploymentName],
		dpkubernetes.LabelKeyDeploymentID:        labels[dpkubernetes.LabelKeyDeploymentID],
		dpkubernetes.LabelKeyManagedBy:           labels[dpkubernetes.LabelKeyManagedBy],
		dpkubernetes.LabelKeyBelongTo:            labels[dpkubernetes.LabelKeyBelongTo],
		dpkubernetes.LabelKeyComponentType:       labels[dpkubernetes.LabelKeyComponentType],
	}
}
