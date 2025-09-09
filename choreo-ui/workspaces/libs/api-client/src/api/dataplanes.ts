import { CreateDataPlaneRequest } from "@open-choreo/definitions";
import { apiRequest, type ApiConfig } from "../core/config";
import type { DataPlaneList, DataPlaneResponse } from "../types/types";

export interface DataPlanesApi {
  listDataPlanes(orgName: string, config?: ApiConfig): Promise<DataPlaneList>;
  createDataPlane(
    orgName: string,
    data: CreateDataPlaneRequest,
    config?: ApiConfig,
  ): Promise<DataPlaneResponse>;
  getDataPlane(
    orgName: string,
    dpName: string,
    config?: ApiConfig,
  ): Promise<DataPlaneResponse>;
}

export const dataPlanesApi: DataPlanesApi = {
  async listDataPlanes(
    orgName: string,
    config?: ApiConfig,
  ): Promise<DataPlaneList> {
    const encodedOrgName = encodeURIComponent(orgName);
    return apiRequest<DataPlaneList>(
      `/api/v1/orgs/${encodedOrgName}/dataplanes`,
      { method: "GET" },
      config,
    );
  },

  async createDataPlane(
    orgName: string,
    data: CreateDataPlaneRequest,
    config?: ApiConfig,
  ): Promise<DataPlaneResponse> {
    const encodedOrgName = encodeURIComponent(orgName);
    return apiRequest<DataPlaneResponse>(
      `/api/v1/orgs/${encodedOrgName}/dataplanes`,
      {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
      },
      config,
    );
  },

  async getDataPlane(
    orgName: string,
    dpName: string,
    config?: ApiConfig,
  ): Promise<DataPlaneResponse> {
    const encodedOrgName = encodeURIComponent(orgName);
    const encodedDpName = encodeURIComponent(dpName);
    return apiRequest<DataPlaneResponse>(
      `/api/v1/orgs/${encodedOrgName}/dataplanes/${encodedDpName}`,
      { method: "GET" },
      config,
    );
  },
};
