export interface ComponentBinding {
  name: string;
  type: string;
  componentName: string;
  projectName: string;
  orgName: string;
  environment: string;
  status: BindingStatus;
  serviceBinding?: ServiceBinding;
  webApplicationBinding?: WebApplicationBinding;
  scheduledTaskBinding?: ScheduledTaskBinding;
}

export interface BindingStatus {
  reason: string;
  message: string;
  status:
    | "InProgress"
    | "Active"
    | "Failed"
    | "Suspended"
    | "NotYetDeployed";
  lastTransitioned: string;
}

export interface WebApplicationBinding {
  endpoints: EndpointStatus[];
  image: string;
  releaseState?: string;
}

export interface ServiceBinding {
  endpoints: EndpointStatus[];
  image: string;
  releaseState?: string;
}

export interface ScheduledTaskBinding {
  image: string;
  releaseState?: string;
}

export interface EndpointStatus {
  name: string;
  type: string;
  project: ExposedEndpoint;
  organization?: ExposedEndpoint;
  public?: ExposedEndpoint;
}

export interface ExposedEndpoint {
  host: string;
  port: number;
  scheme: string;
  basePath?: string;
  uri: string;
}
