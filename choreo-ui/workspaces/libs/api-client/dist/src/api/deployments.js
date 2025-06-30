import { apiRequest } from '../core/config';
export const deploymentsApi = {
    /**
     * List component deployments
     * @param projectName - Name of the project
     * @param componentName - Name of the component
     * @param config - Optional API configuration
     * @returns Promise<DeploymentList> - List of deployments for the component
     */
    async listComponentDeployments(projectName, componentName, config) {
        const encodedProjectName = encodeURIComponent(projectName);
        const encodedComponentName = encodeURIComponent(componentName);
        return apiRequest(`/api/v1/projects/${encodedProjectName}/components/${encodedComponentName}/deployments`, { method: 'GET' }, config);
    },
    /**
     * Get deployment details
     * @param projectName - Name of the project
     * @param componentName - Name of the component
     * @param deploymentName - Name of the deployment
     * @param config - Optional API configuration
     * @returns Promise<Deployment> - Deployment details
     */
    async getDeployment(projectName, componentName, deploymentName, config) {
        const encodedProjectName = encodeURIComponent(projectName);
        const encodedComponentName = encodeURIComponent(componentName);
        const encodedDeploymentName = encodeURIComponent(deploymentName);
        return apiRequest(`/api/v1/projects/${encodedProjectName}/components/${encodedComponentName}/deployments/${encodedDeploymentName}`, { method: 'GET' }, config);
    },
};
//# sourceMappingURL=deployments.js.map