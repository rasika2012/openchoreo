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
	"fmt"

	corev1 "k8s.io/api/core/v1"
	"k8s.io/apimachinery/pkg/api/resource"
	metav1 "k8s.io/apimachinery/pkg/apis/meta/v1"
	"k8s.io/utils/ptr"

	choreov1 "github.com/wso2-enterprise/choreo-cp-declarative-api/api/v1"
	argo "github.com/wso2-enterprise/choreo-cp-declarative-api/internal/kubernetes/types/argoproj.io/workflow/v1alpha1"
)

func makeArgoWorkflow(build *choreov1.Build, repo string, buildNamespace string) *argo.Workflow {
	var branch string
	if build.Spec.Branch != "" {
		branch = build.Spec.Branch
	} else {
		branch = "main"
	}

	workflow := argo.Workflow{
		ObjectMeta: metav1.ObjectMeta{
			Name:      build.ObjectMeta.Name,
			Namespace: buildNamespace,
		},
		Spec: makeWorkflowSpec(build, branch, repo),
	}
	return &workflow
}

func makeWorkflowSpec(build *choreov1.Build, branch string, repo string) argo.WorkflowSpec {
	hostPathType := corev1.HostPathDirectoryOrCreate
	return argo.WorkflowSpec{
		ServiceAccountName: "argo-workflow-sa",
		Entrypoint:         "build-workflow",
		Templates: []argo.Template{
			{
				Name: "build-workflow",
				Steps: []argo.ParallelSteps{
					{
						Steps: []argo.WorkflowStep{
							{Name: string(CloneStep), Template: string(CloneStep)},
						},
					},
					{
						Steps: []argo.WorkflowStep{
							{Name: string(BuildStep), Template: string(BuildStep)},
						},
					},
					{
						Steps: []argo.WorkflowStep{
							{Name: string(PushStep), Template: string(PushStep)},
						},
					},
				},
			},
			makeCloneStep(branch, repo),
			makeBuildStep(build),
			makePushStep(build),
		},
		VolumeClaimTemplates: makePersistentVolumeClaim(),
		Affinity:             makeNodeAffinity(),
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
	}
}

func makeCloneStep(branch string, repo string) argo.Template {
	return argo.Template{
		Name: string(CloneStep),
		Container: &corev1.Container{
			Image:   "alpine/git",
			Command: []string{"sh", "-c"},
			Args: []string{
				fmt.Sprintf(`set -e
git clone --single-branch --branch %s %s /mnt/vol/source`, branch, repo),
			},
			VolumeMounts: []corev1.VolumeMount{
				{Name: "workspace", MountPath: "/mnt/vol"},
			},
		},
	}
}

func makeBuildStep(build *choreov1.Build) argo.Template {
	return argo.Template{
		Name: string(BuildStep),
		Container: &corev1.Container{
			Image: "chalindukodikara/podman:v1.0",
			SecurityContext: &corev1.SecurityContext{
				Privileged: ptr.To(true),
			},
			Command: []string{"sh", "-c"},
			Args:    generateBuildArgs(build, constructImageNameWithTag(build)),
			VolumeMounts: []corev1.VolumeMount{
				{Name: "workspace", MountPath: "/mnt/vol"},
				{Name: "podman-cache", MountPath: "/shared/podman/cache"},
			},
		},
	}
}

func makePushStep(build *choreov1.Build) argo.Template {
	return argo.Template{
		Name: string(PushStep),
		Container: &corev1.Container{
			Image: "chalindukodikara/podman:v1.0",
			SecurityContext: &corev1.SecurityContext{
				Privileged: ptr.To(true),
			},
			Command: []string{"sh", "-c"},
			Args: []string{
				generatePushImageScript(constructImageNameWithTag(build)),
			},
			VolumeMounts: []corev1.VolumeMount{
				{Name: "workspace", MountPath: "/mnt/vol"},
				{Name: "podman-cache", MountPath: "/shared/podman/cache"},
			},
		},
	}
}

// TODO: Remove hard coded worker node for node affinity
func makeNodeAffinity() *corev1.Affinity {
	return &corev1.Affinity{
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
	}
}

func makePersistentVolumeClaim() []corev1.PersistentVolumeClaim {
	return []corev1.PersistentVolumeClaim{
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
	}
}

func int32Ptr(i int32) *int32 { return &i }

func generateBuildArgs(build *choreov1.Build, imageName string) []string {
	baseScript := `set -e

mkdir -p /etc/containers
cat <<EOF > /etc/containers/storage.conf
[storage]
driver = "overlay"
runroot = "/run/containers/storage"
graphroot = "/shared/podman/cache"
[storage.options.overlay]
mount_program = "/usr/bin/fuse-overlayfs"
EOF

podman system service --time=0 &`

	var buildScript string

	if build.Spec.BuildConfiguration.Buildpack.Name != "" {
		buildScript = fmt.Sprintf(`
echo "Building image using Buildpack..."
/usr/local/bin/pack build %s --builder=gcr.io/buildpacks/builder:google-22 --docker-host=inherit \
  --path=/mnt/vol/source/%s --pull-policy if-not-present

podman save -o /mnt/vol/app-image.tar %s
podman volume prune --force`, imageName, build.Spec.Path, imageName)
	} else {
		buildScript = fmt.Sprintf(`
podman build -t %s /mnt/vol/source/%s
podman save -o /mnt/vol/app-image.tar %s`, imageName, build.Spec.Path, imageName)
	}

	return []string{baseScript + buildScript}
}

func generatePushImageScript(imageName string) string {
	return fmt.Sprintf(`set -e

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
podman tag %s registry.choreo-system-dp:5000/%s
podman push --tls-verify=false registry.choreo-system-dp:5000/%s

podman rmi %s -f
podman volume prune --force`, imageName, imageName, imageName, imageName)
}
