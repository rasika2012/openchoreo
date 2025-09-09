export interface DeploymentPipeline {
  name: string;
  displayName: string;
  description: string;
  orgName: string;
  createdAt: string;
  status: string;
  promotionPaths: PromotionPath[];
}

export interface PromotionPath {
  sourceEnvironmentRef: string;
  targetEnvironmentRefs: TargetEnvironmentRef[];
}

export interface TargetEnvironmentRef {
  name: string;
  requiresApproval?: boolean;
  isManualApprovalRequired?: boolean;
}
