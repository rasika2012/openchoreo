import { apiRequest } from '../core/config';
export const projectsApi = {
    /**
     * List all projects
     * @param orgName - Name of the organization
     * @param config - Optional API configuration
     * @returns Promise<ProjectList> - List of all projects
     */
    async listProjects(orgName, config) {
        const encodedOrgName = encodeURIComponent(orgName);
        return apiRequest(`/api/v1/orgs/${encodedOrgName}/projects`, { method: 'GET' }, config);
    },
    /**
     * Get project details
     * @param orgName - Name of the organization
     * @param projectName - Name of the project
     * @param config - Optional API configuration
     * @returns Promise<Project> - Project details
     */
    async getProject(orgName, projectName, config) {
        const encodedProjectName = encodeURIComponent(projectName);
        const encodedOrgName = encodeURIComponent(orgName);
        return apiRequest(`/api/v1/orgs/${encodedOrgName}/projects/${encodedProjectName}`, { method: 'GET' }, config);
    },
};
//# sourceMappingURL=projects.js.map