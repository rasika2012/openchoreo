# Quick choreo installation

This guide will wals you through the quick default installation of choreo. Choreo uses Kubernetes custom resource definitions (CRDs) to store all its state. 

This is using [helm](https://helm.sh/) to install required artifacts into the kubernetes cluster.

## Creating a k8s cluster

If you don't have a Kubernetes cluster yet, you can use the following instructions to create your kubernetes cluster. Since we are using [cilium](https://cilium.io/) as a dependency for this choreo version, the following instructions include the cluster level changes required for cilium to operate.

### Kind (Kubernetes in docker)

#### Step 1 - Installing Kind

Make sure you have installed kind : https://kind.sigs.k8s.io/docs/user/quick-start/#installation

On macos via Homebrew

```
$ brew install kind
```

#### Step 2 - Creating a Kind cluster

```
$ kind create cluster --config=kind/kind-config.yaml
```

### k3d (k3s in docker)

#### Step 1 - Installing k3d

Install a stable version of k3d : https://k3d.io/stable/#installation

On macos via Homebrew

```
$ brew install k3d
```

#### Step 2 - Creating a k3d cluster

```
$ k3d cluster create --config k3d/k3d-config.yaml
```

## Installing choreo helm chart

This is installing two helm charts to your cluster to install the followings.

1. cilium
2. Other dependencies & choreo controllers

## Install in one-go

Run the provided shell script to install the required artifacts.

```
$ ./install.sh
```

This process may take some time to bring the components into a running state, as it involves downloading images from public repositories.

## Check installation status

To check the installation status, you can run

```
$ ./check-status.sh

Installation status:
- cilium-agent : pending
- cilium-operator : ready
- vault : not started
- vault-agent-injector : not started
- argo-workflows-server : not started
- argo-workflows-workflow-controller : not started
- ingress-nginx : not started
```

## Uninstalling choreo

```
$ ./uninstall.sh
```

This action will completely remove all installed artifacts associated with the Choreo Helm chart.
