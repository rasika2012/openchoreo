import { apiRequest } from '../core/config';
export const componentsApi = {
    /**
     * List project components
     * @param orgName - Name of the organization
     * @param projectName - Name of the project
     * @param config - Optional API configuration
     * @returns Promise<ComponentList> - List of components in the project
     */
    async listProjectComponents(orgName, projectName, config) {
        const encodedProjectName = encodeURIComponent(projectName);
        return apiRequest(`/api/v1/orgs/${orgName}/projects/${encodedProjectName}/components`, { method: 'GET' }, config);
    },
    /**
     * Get component details
     * @param orgName - Name of the organization
     * @param projectName - Name of the project
     * @param componentName - Name of the component
     * @param config - Optional API configuration
     * @returns Promise<Component> - Component details
     */
    async getComponent(orgName, projectName, componentName, config) {
        const encodedProjectName = encodeURIComponent(projectName);
        const encodedComponentName = encodeURIComponent(componentName);
        return apiRequest(`/api/v1/orgs/${orgName}/projects/${encodedProjectName}/components/${encodedComponentName}`, { method: 'GET' }, config);
    },
};
//# sourceMappingURL=components.js.map