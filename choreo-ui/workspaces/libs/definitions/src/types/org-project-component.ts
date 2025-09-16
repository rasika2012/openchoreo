export interface Organization {
  name?: string;
  displayName?: string;
  description?: string;
  namespace?: string;
  createdAt?: string;
  status?: string;
}

export interface Project {
  name?: string;
  orgName?: string;
  displayName?: string;
  description?: string;
  deploymentPipeline?: string;
  createdAt?: string;
  status?: string;
}

export interface Component {
  name?: string;
  displayName?: string;
  description?: string;
  type?: string;
  projectName?: string;
  orgName?: string;
  createdAt?: string;
  status?: string;
}

export interface CreateProjectRequest {
  name: string;
  displayName?: string;
  description?: string;
  deploymentPipeline?: string;
}

export interface CreateComponentRequest {
  name: string;
  displayName?: string;
  description?: string;
  type: string;
}

export interface PromoteComponentRequest {
  sourceEnv: string;
  targetEnv: string;
}

export enum ReleaseStateValues {
  Active = "Active",
  Suspend = "Suspend",
  Undeploy = "Undeploy",
}

export interface UpdateBindingRequest {
  releaseState: ReleaseStateValues;
}
