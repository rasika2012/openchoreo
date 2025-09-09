export interface Environment {
  name: string;
  createdAt: string;
  dataPlaneRef: string;
  description: string;
  displayName: string;
  dnsPrefix: string;
  isProduction: boolean;
  namespace: string;
  status: string;
}

export interface CreateEnvironmentRequest {
  name: string;
  description?: string;
  displayName?: string;
  namespace?: string;
  dataPlaneRef?: string;
  dnsPrefix?: string;
  isProduction: boolean;
}
