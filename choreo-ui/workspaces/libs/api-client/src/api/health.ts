import { apiRequest, type ApiConfig } from "../core/config";

export interface HealthApi {
  health(config?: ApiConfig): Promise<string>;
  ready(config?: ApiConfig): Promise<string>;
}

export const healthApi: HealthApi = {
  async health(config?: ApiConfig): Promise<string> {
    return apiRequest<string>(`/health`, { method: "GET" }, config);
  },
  async ready(config?: ApiConfig): Promise<string> {
    return apiRequest<string>(`/ready`, { method: "GET" }, config);
  },
};
