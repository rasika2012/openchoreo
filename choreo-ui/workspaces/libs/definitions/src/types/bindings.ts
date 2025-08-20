export interface ComponentBinding {
  name: string;
  type: string;
  displayName: string;
  description?: string;
  status: string;
  createdAt: string;
  updatedAt?: string;
  configuration?: Record<string, unknown>;
}

export interface UpdateComponentBindingRequest {
  displayName?: string;
  description?: string;
  configuration?: Record<string, unknown>;
}