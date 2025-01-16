/*
 * Copyright (c) 2024, WSO2 LLC. (http://www.wso2.com). All Rights Reserved.
 *
 * This software is the property of WSO2 LLC. and its suppliers, if any.
 * Dissemination of any information or reproduction of any material contained
 * herein in any form is strictly forbidden, unless permitted by WSO2 expressly.
 * You may not alter or remove any copyright or other notice from copies of this content.
 */

package integrations

import (
	"context"
)

// ResourceHandler is an interface that defines the operations that can be performed on the external resources
// that are managed by the deployment controller during the reconciliation process.
type ResourceHandler interface {
	// Name returns the name of the external resource.
	// The name should be in PascalCase in order to keep the consistency.
	Name() string
	// IsRequired indicates whether the external resource needs to be configured or not based on the deployment context.
	// If this returns false, the controller will attempt to delete the resource.
	IsRequired(deployCtx DeploymentContext) bool
	// GetCurrentState returns the current state of the external resource.
	// If the resource does not exist, the implementation should return nil.
	GetCurrentState(ctx context.Context, deployCtx DeploymentContext) (interface{}, error)
	// Create creates the external resource.
	Create(ctx context.Context, deployCtx DeploymentContext) error
	// Update updates the external resource.
	// The currentState parameter will provide the current state of the resource that is returned by GetCurrentState
	// Implementation should compare the current state with the new derived state and update the resource accordingly.
	Update(ctx context.Context, deployCtx DeploymentContext, currentState interface{}) error
	// Delete deletes the external resource.
	// The implementation should handle the case where the resource does not exist and return nil.
	Delete(ctx context.Context, deployCtx DeploymentContext) error
}
