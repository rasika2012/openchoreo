import { apiRequest } from '../core/config';
export const projectsApi = {
    /**
     * List all projects
     * @param config - Optional API configuration
     * @returns Promise<ProjectList> - List of all projects
     */
    async listProjects(config) {
        return apiRequest('/api/v1/projects', { method: 'GET' }, config);
    },
    /**
     * Get project details
     * @param projectName - Name of the project
     * @param config - Optional API configuration
     * @returns Promise<Project> - Project details
     */
    async getProject(projectName, config) {
        const encodedProjectName = encodeURIComponent(projectName);
        return apiRequest(`/api/v1/projects/${encodedProjectName}`, { method: 'GET' }, config);
    },
};
//# sourceMappingURL=projects.js.map