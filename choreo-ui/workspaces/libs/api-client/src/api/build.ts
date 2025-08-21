import { Build } from "@open-choreo/definitions";
import { apiRequest, type ApiConfig } from "../core/config";
import { BuildList, type BuildPlaneList } from "../types/types";

export interface BuildsApi {
  listBuildPlanes(orgName: string, config?: ApiConfig): Promise<BuildPlaneList>;
  listBuilds(
    orgName: string,
    projectName: string,
    componentName: string,
    config?: ApiConfig,
  ): Promise<BuildList>;
  postBuild(
    orgName: string,
    projectName: string,
    componentName: string,
    config?: ApiConfig,
  ): Promise<Build>;
}

export const buildsApi: BuildsApi = {
  /**
   * List all build planes
   * @param orgName - Name of the organization
   * @param projectName - Name of the project
   * @param config - Optional API configuration
   * @returns Promise<BuildPlaneList> - List of all build planes
   */
  async listBuildPlanes(
    orgName: string,
    config?: ApiConfig,
  ): Promise<BuildPlaneList> {
    const encodedOrgName = encodeURIComponent(orgName);
    return apiRequest<BuildPlaneList>(
      `/api/v1/orgs/${encodedOrgName}/buildplanes`,
      { method: "GET" },
      config,
    );
  },

  /**
   * List all builds
   * @param orgName - Name of the organization
   * @param projectName - Name of the project
   * @param config - Optional API configuration
   * @returns Promise<BuildList> - List of all builds
   */
  async listBuilds(
    orgName: string,
    projectName: string,
    componentName: string,
    config?: ApiConfig,
  ): Promise<BuildList> {
    const encodedOrgName = encodeURIComponent(orgName);
    const encodedProjectName = encodeURIComponent(projectName);
    const encodedComponentName = encodeURIComponent(componentName);
    return apiRequest<BuildList>(
      `/api/v1/orgs/${encodedOrgName}/projects/${encodedProjectName}/components/${encodedComponentName}/builds`,
      { method: "GET" },
      config,
    );
  },
  /**
   * Post a build
   * @param orgName - Name of the organization
   * @param projectName - Name of the project
   * @param config - Optional API configuration
   * @returns Promise<Build> - Build details
   */
  async postBuild(
    orgName: string,
    projectName: string,
    componentName: string,
    config?: ApiConfig,
  ): Promise<Build> {
    const encodedOrgName = encodeURIComponent(orgName);
    const encodedProjectName = encodeURIComponent(projectName);
    const encodedComponentName = encodeURIComponent(componentName);
    return apiRequest<Build>(
      `/api/v1/orgs/${encodedOrgName}/projects/${encodedProjectName}/components/${encodedComponentName}/builds`,
      { method: "POST" },
      config,
    );
  },
};
