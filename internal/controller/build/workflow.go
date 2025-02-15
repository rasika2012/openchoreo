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
	"encoding/base64"
	"fmt"
	"strings"

	corev1 "k8s.io/api/core/v1"
	"k8s.io/apimachinery/pkg/api/resource"
	metav1 "k8s.io/apimachinery/pkg/apis/meta/v1"

	choreov1 "github.com/wso2-enterprise/choreo-cp-declarative-api/api/v1"
	argo "github.com/wso2-enterprise/choreo-cp-declarative-api/internal/dataplane/kubernetes/types/argoproj.io/workflow/v1alpha1"
	"github.com/wso2-enterprise/choreo-cp-declarative-api/internal/ptr"
)

func makeArgoWorkflow(build *choreov1.Build, repo string, buildNamespace string) *argo.Workflow {
	workflow := argo.Workflow{
		ObjectMeta: metav1.ObjectMeta{
			Name:      build.ObjectMeta.Name,
			Namespace: buildNamespace,
		},
		Spec: makeWorkflowSpec(build, repo),
	}
	return &workflow
}

func makeWorkflowSpec(build *choreov1.Build, repo string) argo.WorkflowSpec {
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
							{
								Name:     string(BuildStep),
								Template: string(BuildStep),
								Arguments: argo.Arguments{
									Parameters: []argo.Parameter{
										{
											Name:  "git-revision",
											Value: ptr.String("{{steps.clone-step.outputs.parameters.git-revision}}"),
										},
									},
								},
							},
						},
					},
					{
						Steps: []argo.WorkflowStep{
							{
								Name:     string(PushStep),
								Template: string(PushStep),
								Arguments: argo.Arguments{
									Parameters: []argo.Parameter{
										{
											Name:  "git-revision",
											Value: ptr.String("{{steps.clone-step.outputs.parameters.git-revision}}"),
										},
									},
								},
							},
						},
					},
				},
			},
			makeCloneStep(build, repo),
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
			SecondsAfterFailure: ptr.Int32(3600),
			SecondsAfterSuccess: ptr.Int32(3600),
		},
	}
}

func makeCloneStep(build *choreov1.Build, repo string) argo.Template {
	branch := ""
	gitRevision := ""
	if build.Spec.Branch != "" {
		branch = build.Spec.Branch
	} else if build.Spec.GitRevision != "" {
		gitRevision = build.Spec.GitRevision
	} else {
		branch = "main"
	}
	return argo.Template{
		Name: string(CloneStep),
		Metadata: argo.Metadata{
			Labels: map[string]string{
				"step":     string(CloneStep),
				"workflow": build.ObjectMeta.Name,
			},
		},
		Container: &corev1.Container{
			Image:   "alpine/git",
			Command: []string{"sh", "-c"},
			Args:    generateCloneArgs(repo, branch, gitRevision),
			VolumeMounts: []corev1.VolumeMount{
				{Name: "workspace", MountPath: "/mnt/vol"},
			},
		},
		Outputs: argo.Outputs{
			Parameters: []argo.Parameter{
				{
					Name: "git-revision",
					ValueFrom: &argo.ValueFrom{
						Path: "/tmp/git-revision.txt",
					},
				},
			},
		},
	}
}

func makeBuildStep(build *choreov1.Build) argo.Template {
	return argo.Template{
		Name: string(BuildStep),
		Inputs: argo.Inputs{
			Parameters: []argo.Parameter{
				{
					Name: "git-revision",
				},
			},
		},
		Metadata: argo.Metadata{
			Labels: map[string]string{
				"step":     string(BuildStep),
				"workflow": build.ObjectMeta.Name,
			},
		},
		Container: &corev1.Container{
			Image: "chalindukodikara/podman-runner:1.0",
			SecurityContext: &corev1.SecurityContext{
				Privileged: ptr.Bool(true),
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
		Inputs: argo.Inputs{
			Parameters: []argo.Parameter{
				{
					Name: "git-revision",
				},
			},
		},
		Metadata: argo.Metadata{
			Labels: map[string]string{
				"step":     string(PushStep),
				"workflow": build.ObjectMeta.Name,
			},
		},
		Container: &corev1.Container{
			Image: "chalindukodikara/podman-runner:1.0",
			SecurityContext: &corev1.SecurityContext{
				Privileged: ptr.Bool(true),
			},
			Command: []string{"sh", "-c"},
			Args: []string{
				generatePushImageScript(constructImageNameWithTag(build)),
			},
			VolumeMounts: []corev1.VolumeMount{
				{Name: "workspace", MountPath: "/mnt/vol"},
			},
		},
		Outputs: argo.Outputs{
			Parameters: []argo.Parameter{
				{
					Name: "image",
					ValueFrom: &argo.ValueFrom{
						Path: "/tmp/image.txt",
					},
				},
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
								Values:   []string{"choreo-worker"},
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

func getDockerContext(build *choreov1.Build) string {
	if build.Spec.BuildConfiguration.Docker.Context != "" {
		return build.Spec.BuildConfiguration.Docker.Context
	}
	return build.Spec.Path
}

func getDockerfilePath(build *choreov1.Build) string {
	if build.Spec.BuildConfiguration.Docker.DockerfilePath != "" {
		return build.Spec.BuildConfiguration.Docker.DockerfilePath
	}
	return "Dockerfile"
}

func getLanguageVersion(build *choreov1.Build) string {
	if build.Spec.BuildConfiguration.Buildpack.Version == "" {
		return ""
	}
	if build.Spec.BuildConfiguration.Buildpack.Name == choreov1.BuildpackGo {
		return fmt.Sprintf("--env GOOGLE_GO_VERSION=%q", build.Spec.BuildConfiguration.Buildpack.Version)
	} else if build.Spec.BuildConfiguration.Buildpack.Name == choreov1.BuildpackNodeJS {
		return fmt.Sprintf("--env GOOGLE_NODEJS_VERSION=%s", build.Spec.BuildConfiguration.Buildpack.Version)
	} else if build.Spec.BuildConfiguration.Buildpack.Name == choreov1.BuildpackPython {
		return fmt.Sprintf("--env GOOGLE_PYTHON_VERSION=%q", build.Spec.BuildConfiguration.Buildpack.Version)
	} else if build.Spec.BuildConfiguration.Buildpack.Name == choreov1.BuildpackPHP {
		return fmt.Sprintf("--env GOOGLE_COMPOSER_VERSION=%q", build.Spec.BuildConfiguration.Buildpack.Version)
	}
	// BuildpackRuby and BuildpackJava
	return fmt.Sprintf("--env GOOGLE_RUNTIME_VERSION=%s", build.Spec.BuildConfiguration.Buildpack.Version)
}

func generateCloneArgs(repo string, branch string, gitRevision string) []string {
	if branch != "" {
		return []string{
			fmt.Sprintf(`set -e
git clone --single-branch --branch %s --depth 1 %s /mnt/vol/source
cd /mnt/vol/source
COMMIT_SHA=$(git rev-parse HEAD)
echo -n "$COMMIT_SHA" > /tmp/git-revision.txt`, branch, repo),
		}
	}
	return []string{
		fmt.Sprintf(`set -e
git clone --no-checkout --depth 1 %s /mnt/vol/source
cd /mnt/vol/source
git config --global advice.detachedHead false
git fetch --depth 1 origin %s
git checkout %s
echo -n "%s" > /tmp/git-revision.txt`, repo, gitRevision, gitRevision, gitRevision),
	}
}

func generateBuildArgs(build *choreov1.Build, imageName string) []string {
	baseScript := `set -e

mkdir -p /etc/containers
cat <<EOF > /etc/containers/storage.conf
[storage]
driver = "overlay"
runroot = "/run/containers/storage"
graphroot = "/var/lib/containers/storage"
[storage.options.overlay]
mount_program = "/usr/bin/fuse-overlayfs"
EOF`

	var buildScript string

	if build.Spec.BuildConfiguration.Buildpack != nil {
		if build.Spec.BuildConfiguration.Buildpack.Name == choreov1.BuildpackReact {
			buildScript = makeReactBuildScript(build.Spec.BuildConfiguration.Buildpack.Version, build.Spec.Path, imageName)
		} else {
			buildScript = makeGoogleBuildpackBuildScript(build, imageName)
		}
	} else {
		buildScript = makeDockerfileBuildScript(build, imageName)
	}

	return []string{baseScript + buildScript}
}

func generatePushImageScript(imageName string) string {
	return fmt.Sprintf(`set -e
GIT_REVISION={{inputs.parameters.git-revision}}
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
podman tag %s-$GIT_REVISION registry.choreo-system:5000/%s-$GIT_REVISION
podman push --tls-verify=false registry.choreo-system:5000/%s-$GIT_REVISION

podman rmi %s-$GIT_REVISION -f
podman volume prune --force
echo -n "%s-$GIT_REVISION" > /tmp/image.txt`, imageName, imageName, imageName, imageName, imageName)
}

func makeDockerfileBuildScript(build *choreov1.Build, imageName string) string {
	return fmt.Sprintf(`
podman build -t %s-{{inputs.parameters.git-revision}} -f /mnt/vol/source%s /mnt/vol/source%s
podman save -o /mnt/vol/app-image.tar %s-{{inputs.parameters.git-revision}}`, imageName, getDockerfilePath(build), getDockerContext(build), imageName)
}

func makeGoogleBuildpackBuildScript(build *choreov1.Build, imageName string) string {
	return fmt.Sprintf(`
podman system service --time=0 &
until podman info --format '{{.Host.RemoteSocket.Exists}}' 2>/dev/null | grep -q "true"; do
  sleep 1
done

if [[ ! -f "/shared/podman/cache/google-builder.tar" ]]; then
  podman pull gcr.io/buildpacks/builder:google-22
  podman save -o /shared/podman/cache/google-builder.tar gcr.io/buildpacks/builder:google-22
else
  if podman load -i /shared/podman/cache/google-builder.tar; then
	true
  else
	podman pull gcr.io/buildpacks/builder:google-22
	podman save -o /shared/podman/cache/google-builder.tar gcr.io/buildpacks/builder:google-22
  fi
fi

if [[ ! -f "/shared/podman/cache/google-run.tar" ]]; then
  podman pull gcr.io/buildpacks/google-22/run:latest
  podman save -o /shared/podman/cache/google-run.tar gcr.io/buildpacks/google-22/run:latest
else
  if podman load -i /shared/podman/cache/google-run.tar; then
	true
  else
	podman pull gcr.io/buildpacks/google-22/run:latest
	podman save -o /shared/podman/cache/google-run.tar gcr.io/buildpacks/google-22/run:latest
  fi
fi

/usr/local/bin/pack build %s-{{inputs.parameters.git-revision}} --builder=gcr.io/buildpacks/builder:google-22 \
--docker-host=inherit --path=/mnt/vol/source%s --pull-policy if-not-present %s

podman save -o /mnt/vol/app-image.tar %s-{{inputs.parameters.git-revision}}
podman volume prune --force`, imageName, build.Spec.Path, getLanguageVersion(build), imageName)
}

func makeReactBuildScript(nodeVersion, path, imageName string) string {
	targetDir := fmt.Sprintf("/mnt/vol/source%s", path)
	imageReference := fmt.Sprintf("%s-{{inputs.parameters.git-revision}}", imageName)

	script := fmt.Sprintf(`
		echo %s | base64 -d > %s/Dockerfile
		echo %s | base64 -d > %s/default.conf
		echo %s | base64 -d > %s/error_404.html

		DOCKER_BUILDKIT=1 podman build -t %s -f %s/Dockerfile %s

		podman save -o /mnt/vol/app-image.tar %s`,
		getDockerfileContent(nodeVersion), targetDir,
		getNginxConfig(), targetDir,
		getCustomErrorPageContent(), targetDir,
		imageReference, targetDir, targetDir,
		imageReference,
	)
	return strings.TrimSpace(script)
}

func getDockerfileContent(nodeVersion string) string {
	dockerfile := fmt.Sprintf(`
FROM node:%s-alpine as builder

RUN npm install -g pnpm

WORKDIR /app

COPY package.json ./
COPY package-lock.json ./
COPY yarn.lock ./
COPY pnpm-lock.yaml ./

RUN if [ -f "package-lock.json" ]; then npm ci; \
    elif [ -f "yarn.lock" ]; then yarn install --frozen-lockfile; \
    elif [ -f "pnpm-lock.yaml" ]; then pnpm install --frozen-lockfile; \
    fi

COPY . .

RUN if [ -f "package-lock.json" ]; then npm run build; \
    elif [ -f "yarn.lock" ]; then yarn run build; \
    elif [ -f "pnpm-lock.yaml" ]; then pnpm run build; \
    fi

FROM nginx:alpine3.20

ENV ENABLE_PERMISSIONS=TRUE
ENV DEBUG_PERMISSIONS=TRUE
ENV USER_NGINX=10015
ENV GROUP_NGINX=10015

WORKDIR /usr/share/nginx/html

COPY --from=builder /app/default.conf /etc/nginx/conf.d/default.conf

ARG OUTPUT_DIR=build  # Default output directory for React
COPY --from=builder /app/${OUTPUT_DIR} /usr/share/nginx/html/

RUN chown -R nginx:nginx /usr/share/nginx/html

EXPOSE 8080

CMD ["nginx", "-g", "daemon off;"]`, nodeVersion)
	return getDockerfileContent(dockerfile)
}

func getNginxConfig() string {
	nginxConfig := `server {
  listen 8080;
  location / {
    root   /usr/share/nginx/html;
    index  index.html index.htm;
    try_files $uri $uri/ /index.html; 
  }
} `
	return getBase64FromString(nginxConfig)
}

func getCustomErrorPageContent() string {
	htmlContent := `<!DOCTYPE html>
  <html lang="en">
    <head>
      <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  
      <title>404</title>
      <link
        href="https://choreo-shared-fonts-cdne.azureedge.net/Gilmer/gilmer.css"
        rel="stylesheet"
      />
    </head>
    <style>
      body {
        margin: 0;
        font-family: "Gilmer", sans-serif;
        background-color: #f0f1fb;
        height: 100vh;
        display: flex;
        align-items: center;
        justify-content: center;
      }
      @media all and (max-width: 800px) {
        .svg {
          width: 200px;
          height: 140px;
        }
      }
      @media all and (max-width: 400px) {
        .svg {
          width: 160px;
          height: 100px;
        }
      }
    </style>
    <body>
      <div style="text-align: center">
        <div style="display: inline-block">
          <svg
            class="svg"
            width="280"
            height="220"
            viewBox="0 0 280 220"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M214.755 213.474C179.076 225.738 125.447 205.648 93 181.5C45.5312 146.173 34.4938 153.174 16.4677 119.065C-1.55841 84.9557 12.0078 55.9504 32.0903 40.9818C52.5199 25.7546 82.875 22.4662 117.5 31C158 40.9818 226.566 32.6819 250 54C273.434 75.3181 276.5 96 278.5 129C280.161 156.415 274 193.109 214.755 213.474Z"
              fill="white"
            />
            <path
              opacity="0.503674"
              d="M36.9282 116.551L60.8987 140.473C62.3647 141.936 62.3671 144.31 60.9042 145.776C60.9024 145.778 60.9005 145.78 60.8987 145.781L36.9282 169.703C35.4644 171.163 33.0942 171.163 31.6304 169.703L7.65986 145.781C6.19388 144.318 6.19144 141.944 7.6544 140.478C7.65622 140.476 7.65804 140.474 7.65986 140.473L31.6304 116.551C33.0942 115.091 35.4644 115.091 36.9282 116.551Z"
              stroke="#C8CEF0"
              stroke-width="1.3444"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path d="M45 40.908H275V187.908H45V40.908Z" fill="#F0F1FB" />
            <path
              d="M155.785 81.4568C157.668 78.1245 162.445 78.0584 164.42 81.3373L205.536 149.589C207.521 152.885 205.196 157.094 201.35 157.168L120.763 158.737C116.892 158.813 114.408 154.648 116.314 151.278L155.785 81.4568Z"
              fill="white"
            />
            <path
              d="M165.546 80.7325L206.096 149.873C207.773 152.731 206.815 156.407 203.956 158.083C203.036 158.623 201.988 158.908 200.921 158.908H119.821C116.507 158.908 113.821 156.222 113.821 152.908C113.821 151.841 114.105 150.793 114.645 149.873L155.195 80.7325C156.872 77.8741 160.548 76.916 163.406 78.5924C164.291 79.1112 165.028 79.848 165.546 80.7325Z"
              stroke="#FF7B7C"
              stroke-width="5"
              stroke-miterlimit="10"
            />
            <path
              d="M183.269 100.246C189.604 111.047 199.106 127.248 211.775 148.849C214.569 153.613 212.972 159.74 208.208 162.534C206.674 163.434 204.927 163.908 203.149 163.908C179.737 163.908 162.178 163.908 150.473 163.908M107.593 153.908C107.593 152.129 108.067 150.383 108.967 148.849L150.745 77.6155"
              stroke="#41415B"
              stroke-miterlimit="10"
            />
            <path
              d="M150.795 129.487H148.622V125.91H145.204V129.487H140.773L146.474 118.403H142.775L136.745 130.012V132.502H145.204V135.908H148.622V132.502H150.795V129.487ZM159.45 136.262C161.72 136.262 163.49 135.42 164.76 133.723C166.029 132.026 166.664 129.841 166.664 127.156C166.664 124.458 166.029 122.273 164.76 120.588C163.49 118.904 161.72 118.061 159.45 118.061C157.179 118.061 155.409 118.904 154.127 120.588C152.846 122.273 152.199 124.47 152.199 127.168C152.199 129.853 152.833 132.038 154.115 133.735C155.397 135.432 157.167 136.274 159.438 136.274L159.45 136.262ZM159.438 133.149C158.192 133.149 157.24 132.612 156.593 131.55C155.946 130.488 155.617 129.035 155.617 127.18C155.617 125.324 155.946 123.872 156.593 122.81C157.24 121.748 158.192 121.211 159.438 121.211C160.683 121.211 161.623 121.748 162.27 122.81C162.917 123.872 163.234 125.337 163.234 127.192C163.234 129.048 162.917 130.512 162.27 131.574C161.623 132.636 160.67 133.174 159.425 133.174L159.438 133.149ZM182.362 129.487H180.189V125.91H176.771V129.487H172.34L178.041 118.403H174.342L168.312 130.012V132.502H176.771V135.908H180.189V132.502H182.362V129.487Z"
              fill="#A6B3FF"
            />
            <path
              d="M41.904 91.3345V43M271.904 43V163.103M189.216 190H41.904V127.422"
              stroke="#41415B"
              stroke-miterlimit="10"
            />
            <path d="M44.904 41H274.904V60H44.904V41Z" fill="#D7DFFF" />
            <path d="M91.904 46H233.904V55H91.904V46Z" fill="white" />
            <path d="M243.904 46H266.904V55H243.904V46Z" fill="#B2C3FB" />
            <path d="M49.904 48H55.904V54H49.904V48Z" fill="white" />
            <path d="M60.904 48H66.904V54H60.904V48Z" fill="white" />
            <path d="M71.904 48H77.904V54H71.904V48Z" fill="white" />
          </svg>
        </div>
        <div style="margin-top: 8px; text-align: center; display: block">
          <p style="font-size: 1.6071rem; font-weight: bold">Page not found!</p>
          <p style="font-size: 15px; color: #8d91a3">
            The requested page could not be found.
          </p>
        </div>
      </div>
      <footer style="position: fixed; bottom: 0; width: 100%; text-align: center">
        <a href="https://wso2.com/choreo/" style="text-decoration: none">
          <div style="text-align: center; padding-bottom: 10px">
            <div
              style="
                display: inline-block;
                vertical-align: middle;
                font-size: 13px;
                color: #8d91a3;
              "
            >
              Hosted on
            </div>
            <div style="display: inline-block; vertical-align: middle">
              <svg
                id="Logo_Black-Copy"
                data-name="Logo/Black-Copy"
                xmlns="http://www.w3.org/2000/svg"
                height="24"
                viewBox="0 0 91.936 23.59"
              >
                <g id="Combined-Shape">
                  <path
                    id="path-1"
                    d="M27.128,0a5.111,5.111,0,0,1,5.107,4.9l0,.216V18.479a5.111,5.111,0,0,1-4.9,5.107l-.216,0H13.761a5.111,5.111,0,0,1-5.107-4.9l0-.216v-5.09H5.4A3.788,3.788,0,0,1,1.576,9.821l0-.167V5.239a2.752,2.752,0,1,1,2.361,0V9.632A1.417,1.417,0,0,0,5.281,11l.122,0H8.649v-5.9A5.111,5.111,0,0,1,13.545,0l.216,0Zm0,2.359H13.761a2.752,2.752,0,0,0-2.747,2.584l-.005.168V18.479a2.752,2.752,0,0,0,2.584,2.747l.168.005H27.128a2.752,2.752,0,0,0,2.747-2.584l.005-.168V5.111A2.752,2.752,0,0,0,27.128,2.359Zm46.59,4.372A5.02,5.02,0,0,1,77.547,8.2a5.169,5.169,0,0,1,1.4,3.71,5.326,5.326,0,0,1-.038.628l-.032.227H70.555a2.986,2.986,0,0,0,.995,2.089,3.513,3.513,0,0,0,2.407.8,2.953,2.953,0,0,0,2.822-1.472L76.871,14l1.949.577A4.97,4.97,0,0,1,77,16.637a5.312,5.312,0,0,1-2.8.849l-.3.006.02.02a5.4,5.4,0,0,1-3.949-1.492,5.222,5.222,0,0,1-1.522-3.9,5.364,5.364,0,0,1,1.462-3.849A5.028,5.028,0,0,1,73.718,6.731ZM53.09,6.721a5.316,5.316,0,0,1,3.9,1.532A5.2,5.2,0,0,1,58.54,12.1a5.275,5.275,0,0,1-5.151,5.385l-.29.006h-.01A5.3,5.3,0,0,1,49.2,15.951,5.2,5.2,0,0,1,47.649,12.1,5.188,5.188,0,0,1,49.2,8.263,5.3,5.3,0,0,1,53.09,6.721Zm33.4,0a5.316,5.316,0,0,1,3.9,1.532A5.2,5.2,0,0,1,91.936,12.1a5.275,5.275,0,0,1-5.151,5.385l-.29.006h-.01A5.3,5.3,0,0,1,82.6,15.951,5.2,5.2,0,0,1,81.045,12.1,5.188,5.188,0,0,1,82.6,8.263,5.3,5.3,0,0,1,86.485,6.721ZM20.707,6.291A5.833,5.833,0,0,1,24.183,7.3a4.233,4.233,0,0,1,1.765,2.3.975.975,0,0,1-.719,1.187,1.139,1.139,0,0,1-1.41-.608,2.582,2.582,0,0,0-1.091-1.351,3.537,3.537,0,0,0-5.552,2.945,3.51,3.51,0,0,0,.995,2.5,3.366,3.366,0,0,0,2.557,1.046,3.591,3.591,0,0,0,1.99-.548,2.451,2.451,0,0,0,1.091-1.32,1.143,1.143,0,0,1,1.292-.57A1.089,1.089,0,0,1,25.938,14a4.25,4.25,0,0,1-1.744,2.265A5.791,5.791,0,0,1,20.728,17.3a5.746,5.746,0,0,1-4.14-1.584,5.219,5.219,0,0,1-1.648-3.93,5.211,5.211,0,0,1,1.637-3.92A5.738,5.738,0,0,1,20.707,6.291ZM37.635,2.355V8.5a4.04,4.04,0,0,1,3.259-1.784l.262-.006v-.02a3.791,3.791,0,0,1,3.014,1.2,4.685,4.685,0,0,1,1.049,3.016l.005.3v6.007H43.105V11.595a3.188,3.188,0,0,0-.637-2.119,2.323,2.323,0,0,0-1.88-.766,2.684,2.684,0,0,0-2.148.935,3.562,3.562,0,0,0-.8,2.232l-.006.254v5.092H35.5V2.355ZM66.5,6.842l.268.028V8.86a2.866,2.866,0,0,0-2.6.656,4.019,4.019,0,0,0-.9,2.8l0,.285v4.625H61.131V6.98H63.27V8.6l.088-.169a3.066,3.066,0,0,1,1.276-1.246A3.4,3.4,0,0,1,66.5,6.842ZM53.09,8.661a3.186,3.186,0,0,0-2.407.985,3.448,3.448,0,0,0-.945,2.477,3.409,3.409,0,0,0,.945,2.447,3.186,3.186,0,0,0,2.407.985,3.224,3.224,0,0,0,2.417-.985,3.376,3.376,0,0,0,.955-2.447,3.414,3.414,0,0,0-.955-2.477A3.224,3.224,0,0,0,53.09,8.661Zm33.4,0a3.186,3.186,0,0,0-2.407.985,3.448,3.448,0,0,0-.945,2.477,3.409,3.409,0,0,0,.945,2.447,3.186,3.186,0,0,0,2.407.985,3.224,3.224,0,0,0,2.417-.985,3.376,3.376,0,0,0,.955-2.447A3.414,3.414,0,0,0,88.9,9.645,3.224,3.224,0,0,0,86.485,8.661Zm-12.758-.08a3.08,3.08,0,0,0-2.188.806,3.025,3.025,0,0,0-.953,1.74l-.031.229h6.3a3,3,0,0,0-.925-2A3.074,3.074,0,0,0,73.728,8.581Z"
                    fill="#222228"
                  />
                </g>
              </svg>
            </div>
          </div>
        </a>
      </footer>
    </body>
  </html>
  `
	return getBase64FromString(htmlContent)
}

func getBase64FromString(content string) string {
	return base64.StdEncoding.EncodeToString([]byte(content))
}
