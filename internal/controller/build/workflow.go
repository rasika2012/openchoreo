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

func createArgoWorkflow(build *choreov1.Build, repo string) *argo.Workflow {
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
			ServiceAccountName: "argo-workflow-sa",
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
						Args:    generateBuildArgs(build, constructImageNameWithTag(build)),
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
							generatePushImageScript(constructImageNameWithTag(build)),
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

func int32Ptr(i int32) *int32 { return &i }

func generateBuildArgs(build *choreov1.Build, imageName string) []string {
	baseScript := `set -e
echo "Setting up Podman socket for Buildpacks..."
podman system service --time=0 &
sleep 2

echo "Configuring Podman storage..."
mkdir -p /etc/containers
cat <<EOF > /etc/containers/storage.conf
[storage]
driver = "overlay"
runroot = "/run/containers/storage"
graphroot = "/var/lib/containers/storage"
[storage.options.overlay]
mount_program = "/usr/bin/fuse-overlayfs"
EOF
`
	var buildScript string
	// Append build-specific logic
	if build.Spec.BuildConfiguration.Buildpack.Name != "" {
		buildScript = fmt.Sprintf(`
echo "Building image using Buildpacks..."
/usr/local/bin/pack build %s \
  --builder=gcr.io/buildpacks/builder:google-22 --docker-host=inherit \
  --path=/mnt/vol/source/%s --platform linux/arm64
echo "Saving Docker image..."
podman save -o /mnt/vol/app-image.tar %s`, imageName, build.Spec.Path, imageName)
	} else {
		buildScript = fmt.Sprintf(`
echo "Building Docker image..."
podman build -t %s /mnt/vol/source/%s
echo "Saving Docker image..."
podman save -o /mnt/vol/app-image.tar %s`, imageName, build.Spec.Path, imageName)
	}

	// Combine the base script with the build-specific logic
	return []string{baseScript + buildScript}
}

func generatePushImageScript(imageName string) string {
	return fmt.Sprintf(`set -e
echo "Configuring Podman storage..."
mkdir -p /etc/containers
cat <<EOF > /etc/containers/storage.conf
[storage]
driver = "overlay"
runroot = "/run/containers/storage"
graphroot = "/var/lib/containers/storage"
[storage.options.overlay]
mount_program = "/usr/bin/fuse-overlayfs"
EOF

podman load -i /mnt/vol/app-image.tar
echo "Tagging Docker image for the registry..."
podman tag %s registry.choreo-system-dp:5000/%s
echo "Pushing Docker image to the registry..."
podman push --tls-verify=false registry.choreo-system-dp:5000/%s
echo "Docker image pushed successfully."`, imageName, imageName, imageName)
}
