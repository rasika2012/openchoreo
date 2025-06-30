import { defaultConfig } from './config';
import { generalApi } from '../api/general';
import { projectsApi } from '../api/projects';
import { componentsApi } from '../api/components';
import { deploymentsApi } from '../api/deployments';
export class ChoreoClient {
    config;
    constructor(config = {}) {
        this.config = { ...defaultConfig, ...config };
    }
    /**
     * Update the API configuration
     * @param config - Partial configuration to merge with current config
     */
    setConfig(config) {
        this.config = { ...this.config, ...config };
    }
    // General API methods
    listEndpoints = generalApi.listEndpoints;
    // Projects API methods
    listProjects = projectsApi.listProjects;
    getProject = projectsApi.getProject;
    // Components API methods
    listProjectComponents = componentsApi.listProjectComponents;
    // Deployments API methods
    listComponentDeployments = deploymentsApi.listComponentDeployments;
    getDeployment = deploymentsApi.getDeployment;
}
//# sourceMappingURL=client.js.map