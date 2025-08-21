export interface ComponentBinding {
  name: string;
  type: string;
  componentName: string;
  projectName: string;
  orgName: string;
  environment: string;
  status: BindingStatus;
  webApplicationBinding?: WebApplicationBinding | ServiceBinding;
}

export interface BindingStatus {
  reason: string;
  message: string;
  status: string;
  lastTransitioned: string;
}

export interface WebApplicationBinding {
  endpoints: Endpoint[];
  image: string;
}

export interface ServiceBinding {
  endpoints: Endpoint[];
  image: string;
}

export interface Endpoint {
  name: string;
  type: string;
  project: EndpointConfig;
  public: EndpointConfig;
}

export interface EndpointConfig {
  host: string;
  port: number;
  scheme: string;
  basePath?: string;
  uri: string;
}
