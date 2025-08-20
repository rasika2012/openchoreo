import { UpdateComponentBindingRequest } from "@open-choreo/definitions";
import { apiRequest, type ApiConfig } from "../core/config";
import type {
  ComponentBindingList,
  ComponentBindingResponse,
} from "../types/types";

export interface BindingsApi {
  listComponentBindings(
    orgName: string,
    projectName: string,
    componentName: string,
    config?: ApiConfig,
  ): Promise<ComponentBindingList>;
  updateComponentBinding(
    orgName: string,
    projectName: string,
    componentName: string,
    bindingName: string,
    data: UpdateComponentBindingRequest,
    config?: ApiConfig,
  ): Promise<ComponentBindingResponse>;
}

export const bindingsApi: BindingsApi = {
  /**
   * Get all bindings for a component
   * @param orgName - Name of the organization
   * @param projectName - Name of the project
   * @param componentName - Name of the component
   * @param config - Optional API configuration
   * @returns Promise<ComponentBindingList> - List of component bindings
   */
  async listComponentBindings(
    orgName: string,
    projectName: string,
    componentName: string,
    config?: ApiConfig,
  ): Promise<ComponentBindingList> {
    const encodedOrgName = encodeURIComponent(orgName);
    const encodedProjectName = encodeURIComponent(projectName);
    const encodedComponentName = encodeURIComponent(componentName);
    return apiRequest<ComponentBindingList>(
      `/api/v1/orgs/${encodedOrgName}/projects/${encodedProjectName}/components/${encodedComponentName}/bindings`,
      { method: "GET" },
      config,
    );
  },

  /**
   * Update a specific component binding
   * @param orgName - Name of the organization
   * @param projectName - Name of the project
   * @param componentName - Name of the component
   * @param bindingName - Name of the binding to update
   * @param data - Update data for the binding
   * @param config - Optional API configuration
   * @returns Promise<ComponentBindingResponse> - Updated binding details
   */
  async updateComponentBinding(
    orgName: string,
    projectName: string,
    componentName: string,
    bindingName: string,
    data: UpdateComponentBindingRequest,
    config?: ApiConfig,
  ): Promise<ComponentBindingResponse> {
    const encodedOrgName = encodeURIComponent(orgName);
    const encodedProjectName = encodeURIComponent(projectName);
    const encodedComponentName = encodeURIComponent(componentName);
    const encodedBindingName = encodeURIComponent(bindingName);
    const baseUrl = `/api/v1/orgs/${encodedOrgName}/projects/${encodedProjectName}`;
    const url = `${baseUrl}/components/${encodedComponentName}/bindings/${encodedBindingName}`;

    return apiRequest<ComponentBindingResponse>(
      url,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      },
      config,
    );
  },
};
