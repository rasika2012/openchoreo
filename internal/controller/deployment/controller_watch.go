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

package deployment

import (
	"context"

	ctrl "sigs.k8s.io/controller-runtime"
	"sigs.k8s.io/controller-runtime/pkg/client"
	"sigs.k8s.io/controller-runtime/pkg/reconcile"

	choreov1 "github.com/wso2-enterprise/choreo-cp-declarative-api/api/v1"
)

// All the watch handlers for the deployment controller are defined in this file.

const (
	// deploymentArtifactRefIndexKey is the field index key in the deployment that
	// points to a deployable artifact.
	deploymentArtifactRefIndexKey = "spec.deploymentArtifactRef"
)

// setupDeploymentArtifactRefIndex creates a field index for the deployment artifact reference in the deployments.
func (r *Reconciler) setupDeploymentArtifactRefIndex(ctx context.Context, mgr ctrl.Manager) error {
	return mgr.GetFieldIndexer().IndexField(
		ctx,
		&choreov1.Deployment{},
		deploymentArtifactRefIndexKey,
		func(obj client.Object) []string {
			// Convert the object to the appropriate type
			deployment := obj.(*choreov1.Deployment)
			// Return the value of the deploymentArtifactRef field
			return []string{deployment.Spec.DeploymentArtifactRef}
		},
	)
}

// listDeploymentsForDeployableArtifact is a watch handler that lists all the deployments
// that refers to a given deployable artifact and makes reconcile.Request for reconciliation.
func (r *Reconciler) listDeploymentsForDeployableArtifact(ctx context.Context, obj client.Object) []reconcile.Request {
	deployableArtifact, ok := obj.(*choreov1.DeployableArtifact)
	if !ok {
		// Ideally, this should not happen as obj is always expected to be a DeployableArtifact from the Watch
		return nil
	}

	// List all the deployments that have .spec.deploymentArtifactRef equal to the name of the deployable artifact
	deploymentList := &choreov1.DeploymentList{}
	if err := r.List(
		ctx,
		deploymentList,
		client.MatchingFields{deploymentArtifactRefIndexKey: deployableArtifact.Name},
	); err != nil {
		return nil
	}

	// Enqueue all the deployments that have the deployable artifact as the deployment artifact
	requests := make([]reconcile.Request, len(deploymentList.Items))
	for i, deployment := range deploymentList.Items {
		requests[i] = reconcile.Request{
			NamespacedName: client.ObjectKey{
				Namespace: deployment.Namespace,
				Name:      deployment.Name,
			},
		}
	}

	// Enqueue the deployment if the deployable artifact is updated
	return requests
}
