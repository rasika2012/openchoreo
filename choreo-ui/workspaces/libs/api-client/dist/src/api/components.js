import { apiRequest } from '../core/config';
export const componentsApi = {
    /**
     * List project components
     * @param projectName - Name of the project
     * @param config - Optional API configuration
     * @returns Promise<ComponentList> - List of components in the project
     */
    async listProjectComponents(projectName, config) {
        const encodedProjectName = encodeURIComponent(projectName);
        return apiRequest(`/api/v1/projects/${encodedProjectName}/components`, { method: 'GET' }, config);
    },
};
//# sourceMappingURL=components.js.map