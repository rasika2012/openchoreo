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
	choreov1 "github.com/wso2-enterprise/choreo-cp-declarative-api/api/v1"
)

// DeploymentContext is a struct that holds the all necessary data required for the resource handlers to
// perform their operations.
type DeploymentContext struct {
	Project            *choreov1.Project
	Component          *choreov1.Component
	DeploymentTrack    *choreov1.DeploymentTrack
	DeployableArtifact *choreov1.DeployableArtifact
	Deployment         *choreov1.Deployment
	Environment        *choreov1.Environment

	ContainerImage string
}
