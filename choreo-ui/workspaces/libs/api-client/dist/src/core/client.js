import { defaultConfig } from './config';
import { projectsApi } from '../api/projects';
import { componentsApi } from '../api/components';
import { organizationApi } from '../api/organization';
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
        console.log("configs", this.config);
        this.config = { ...this.config, ...config };
    }
    // Projects API methods
    listProjects = (orgName) => projectsApi.listProjects(orgName, this.config);
    getProject = (orgName, projectName) => projectsApi.getProject(orgName, projectName, this.config);
    // Components API methods
    listProjectComponents = (orgName, projectName) => componentsApi.listProjectComponents(orgName, projectName, this.config);
    getComponent = (orgName, projectName, componentName) => componentsApi.getComponent(orgName, projectName, componentName, this.config);
    // Organization API methods
    listOrganizations = () => organizationApi.listOrganizations(this.config);
}
//# sourceMappingURL=client.js.map