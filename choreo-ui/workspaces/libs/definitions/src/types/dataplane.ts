export interface DataPlane {
  name: string;
  namespace?: string;
  displayName?: string;
  description?: string;
  registryPrefix?: string;
  registrySecretRef?: string;
  kubernetesClusterName?: string;
  apiServerURL?: string;
  publicVirtualHost?: string;
  organizationVirtualHost?: string;
  observerURL?: string;
  observerUsername?: string;
  createdAt?: string;
  status?: string;
}

export interface CreateDataPlaneRequest {
  name: string;
  displayName?: string;
  description?: string;
  registryPrefix: string;
  registrySecretRef?: string;
  kubernetesClusterName: string;
  apiServerURL: string;
  caCert: string;
  clientCert: string;
  clientKey: string;
  publicVirtualHost: string;
  organizationVirtualHost: string;
  observerURL?: string;
  observerUsername?: string;
  observerPassword?: string;
}
