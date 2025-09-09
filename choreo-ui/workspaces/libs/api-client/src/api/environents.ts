import { CreateEnvironmentRequest } from "@open-choreo/definitions";
import { apiRequest, type ApiConfig } from "../core/config";
import type { EnvironmentList, EnvironmentResponse } from "../types/types";

export interface EnvironmentsApi {
  listEnvironments(
    orgName: string,
    config?: ApiConfig,
  ): Promise<EnvironmentList>;
  createEnvironment(
    orgName: string,
    data: CreateEnvironmentRequest,
    config?: ApiConfig,
  ): Promise<EnvironmentResponse>;
  getEnvironment(
    orgName: string,
    envName: string,
    config?: ApiConfig,
  ): Promise<EnvironmentResponse>;
}

export const environmentsApi: EnvironmentsApi = {
  /**
   * List environments for an organization
   * @param orgName - Name of the organization
   * @param config - Optional API configuration
   * @returns Promise<EnvironmentList> - List of environments in the organization
   */
  async listEnvironments(
    orgName: string,
    config?: ApiConfig,
  ): Promise<EnvironmentList> {
    const encodedOrgName = encodeURIComponent(orgName);
    return apiRequest<EnvironmentList>(
      `/api/v1/orgs/${encodedOrgName}/environments`,
      { method: "GET" },
      config,
    );
  },

  /**
   * Create a new environment
   * @param orgName - Name of the organization
   * @param data - Environment data to create
   * @param config - Optional API configuration
   * @returns Promise<EnvironmentResponse> - Created environment details
   */
  async createEnvironment(
    orgName: string,
    data: CreateEnvironmentRequest,
    config?: ApiConfig,
  ): Promise<EnvironmentResponse> {
    const encodedOrgName = encodeURIComponent(orgName);
    return apiRequest<EnvironmentResponse>(
      `/api/v1/orgs/${encodedOrgName}/environments`,
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

  /**
   * Get environment details
   * @param orgName - Name of the organization
   * @param envName - Name of the environment
   * @param config - Optional API configuration
   * @returns Promise<EnvironmentResponse> - Environment details
   */
  async getEnvironment(
    orgName: string,
    envName: string,
    config?: ApiConfig,
  ): Promise<EnvironmentResponse> {
    const encodedOrgName = encodeURIComponent(orgName);
    const encodedEnvName = encodeURIComponent(envName);
    return apiRequest<EnvironmentResponse>(
      `/api/v1/orgs/${encodedOrgName}/environments/${encodedEnvName}`,
      { method: "GET" },
      config,
    );
  },
};
