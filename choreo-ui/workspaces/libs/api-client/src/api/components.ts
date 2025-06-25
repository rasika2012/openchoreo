import { apiRequest, ApiConfig } from '../core/config';
import { Component, ComponentList } from '../types/types';

export interface ComponentsApi {
  listProjectComponents(projectName: string, config?: ApiConfig): Promise<ComponentList>;
}

export const componentsApi: ComponentsApi = {
  /**
   * List project components
   * @param projectName - Name of the project
   * @param config - Optional API configuration
   * @returns Promise<ComponentList> - List of components in the project
   */
  async listProjectComponents(projectName: string, config?: ApiConfig): Promise<ComponentList> {
    const encodedProjectName = encodeURIComponent(projectName);
    return apiRequest<ComponentList>(`/api/v1/projects/${encodedProjectName}/components`, { method: 'GET' }, config);
  },
}; 