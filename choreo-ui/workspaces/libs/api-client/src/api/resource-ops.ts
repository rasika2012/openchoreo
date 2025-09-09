import { apiRequest, type ApiConfig } from "../core/config";
import type { ApplyResponse, DeleteResponse } from "../types/types";

export interface ResourceOpsApi {
  applyResource(
    body: Record<string, unknown>,
    config?: ApiConfig,
  ): Promise<ApplyResponse>;
  deleteResource(
    body: Record<string, unknown>,
    config?: ApiConfig,
  ): Promise<DeleteResponse>;
}

export const resourceOpsApi: ResourceOpsApi = {
  async applyResource(
    body: Record<string, unknown>,
    config?: ApiConfig,
  ): Promise<ApplyResponse> {
    return apiRequest<ApplyResponse>(
      `/api/v1/apply`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      },
      config,
    );
  },

  async deleteResource(
    body: Record<string, unknown>,
    config?: ApiConfig,
  ): Promise<DeleteResponse> {
    return apiRequest<DeleteResponse>(
      `/api/v1/delete`,
      {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      },
      config,
    );
  },
};
