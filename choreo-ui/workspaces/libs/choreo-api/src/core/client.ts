import { ApiConfig, defaultConfig } from './config';
import { projectsApi, ProjectsApi } from '../api/projects';
import { componentsApi, ComponentsApi } from '../api/components';
import { organizationApi, OrganizationApi } from '../api/organization';

export interface ChoreoApiClient extends ProjectsApi, ComponentsApi, OrganizationApi {
  config: ApiConfig;
  setConfig(config: Partial<ApiConfig>): void;
}

export class ChoreoClient implements ChoreoApiClient {
  public config: ApiConfig;

  constructor(config: Partial<ApiConfig> = {}) {
    this.config = { ...defaultConfig, ...config };
  }

  /**
   * Update the API configuration
   * @param config - Partial configuration to merge with current config
   */
  setConfig(config: Partial<ApiConfig>): void {
    this.config = { ...this.config, ...config };
  }

  // Projects API methods
  listProjects = projectsApi.listProjects;
  getProject = projectsApi.getProject;

  // Components API methods
  listProjectComponents = componentsApi.listProjectComponents;
  getComponent = componentsApi.getComponent;

  // Organization API methods
  listOrganizations = organizationApi.listOrganizations;
} 