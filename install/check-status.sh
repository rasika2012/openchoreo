#!/bin/bash

# Define color codes for console formatting
RED="\033[0;31m"
GREEN="\033[0;32m"
DARK_YELLOW="\033[0;33m"
RESET="\033[0m"

# Namespace where all dependencies are installed
NAMESPACE="choreo-system-dp"

# List of dependencies
dependencies=("cilium-agent" "cilium-operator" "vault" "vault-agent-injector" "argo-workflows-server" "argo-workflows-workflow-controller" "cert-manager" "cainjector" "webhook" "choreo-controllers" "gateway-helm" )

# Function to check the status of a dependency
check_status() {
    local dependency=$1

    # Check if Pods are ready
    pod_status=$(kubectl get pods -n "$NAMESPACE" -l "app.kubernetes.io/name=$dependency" \
        -o jsonpath="{.items[*].status.conditions[?(@.type=='Ready')].status}" 2>/dev/null)

    if [[ -z "$pod_status" ]]; then
        echo "not started"
        return
    fi

    if [[ "$pod_status" =~ "False" ]]; then
        echo "pending"
    elif [[ "$pod_status" =~ "True" ]]; then
        echo "ready"
    else
        echo "unknown"
    fi
}


echo "Installation status:"
for dependency in "${dependencies[@]}"; do
    status=$(check_status "$dependency")
    if [[ "$status" =~ "ready" ]]; then
        echo -e "${GREEN}✅ $dependency : $status ${RESET}"
    elif [[ "$status" =~ "unknown" ]]; then
        echo -e "${RED}⚠ $dependency : $status ${RESET}"
    elif [[ "$status" =~ "pending" ]]; then
        echo -e "${DARK_YELLOW}🕑 $dependency : $status ${RESET}"
    fi
done
