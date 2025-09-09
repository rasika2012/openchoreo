import { apiRequest, type ApiConfig } from "../core/config";
import type { ComponentObserverResponse } from "../types/types";

export interface ObserverApi {
  getRuntimeObserverUrl(
    orgName: string,
    projectName: string,
    componentName: string,
    environmentName: string,
    config?: ApiConfig,
  ): Promise<ComponentObserverResponse>;
  getBuildObserverUrl(
    orgName: string,
    projectName: string,
    componentName: string,
    config?: ApiConfig,
  ): Promise<ComponentObserverResponse>;
}

export const observerApi: ObserverApi = {
  async getRuntimeObserverUrl(
    orgName: string,
    projectName: string,
    componentName: string,
    environmentName: string,
    config?: ApiConfig,
  ): Promise<ComponentObserverResponse> {
    const encodedOrgName = encodeURIComponent(orgName);
    const encodedProjectName = encodeURIComponent(projectName);
    const encodedComponentName = encodeURIComponent(componentName);
    const encodedEnvName = encodeURIComponent(environmentName);
    return apiRequest<ComponentObserverResponse>(
      // eslint-disable-next-line max-len
      `/api/v1/orgs/${encodedOrgName}/projects/${encodedProjectName}/components/${encodedComponentName}/environments/${encodedEnvName}/observer-url`,
      { method: "GET" },
      config,
    );
  },
  async getBuildObserverUrl(
    orgName: string,
    projectName: string,
    componentName: string,
    config?: ApiConfig,
  ): Promise<ComponentObserverResponse> {
    const encodedOrgName = encodeURIComponent(orgName);
    const encodedProjectName = encodeURIComponent(projectName);
    const encodedComponentName = encodeURIComponent(componentName);
    return apiRequest<ComponentObserverResponse>(
      `/api/v1/orgs/${encodedOrgName}/projects/${encodedProjectName}/components/${encodedComponentName}/observer-url`,
      { method: "GET" },
      config,
    );
  },
};
