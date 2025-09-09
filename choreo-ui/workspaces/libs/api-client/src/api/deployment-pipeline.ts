import { apiRequest, type ApiConfig } from "../core/config";
import { DeploymentPipelineResponse } from "../types/types";

export interface DeploymentPipelineApi {
  getDeploymentPipeline(
    orgName: string,
    projectName: string,
    config?: ApiConfig,
  ): Promise<DeploymentPipelineResponse>;
}

export const deploymentPipelineApi: DeploymentPipelineApi = {
  /**
   * Get deployment pipeline for a project
   * @param orgName - Name of the organization
   * @param projectName - Name of the project
   * @param config - Optional API configuration
   * @returns Promise<DeploymentPipelineResponse> - Deployment pipeline details
   */
  async getDeploymentPipeline(
    orgName: string,
    projectName: string,
    config?: ApiConfig,
  ): Promise<DeploymentPipelineResponse> {
    const encodedOrgName = encodeURIComponent(orgName);
    const encodedProjectName = encodeURIComponent(projectName);
    return apiRequest<DeploymentPipelineResponse>(
      `/api/v1/orgs/${encodedOrgName}/projects/${encodedProjectName}/deployment-pipeline`,
      { method: "GET" },
      config,
    );
  },
};
