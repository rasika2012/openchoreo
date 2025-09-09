export interface Workload {
  owner: WorkloadOwner;
  containers: WorkloadContainers;
  endpoints: WorkloadEndpoints;
}

export interface WorkloadOwner {
  projectName: string;
  componentName: string;
}

export interface WorkloadContainers {
  main: WorkloadContainer;
  [key: string]: WorkloadContainer;
}

export interface WorkloadContainer {
  image: string;
}

export interface WorkloadEndpoints {
  [endpointName: string]: WorkloadEndpoint;
}

export interface WorkloadEndpoint {
  type: string;
  port: number;
}

export interface CreateWorkloadRequest {
  owner: WorkloadOwner;
  containers: WorkloadContainers;
  endpoints: WorkloadEndpoints;
}
