import { ApiConfig } from './config';
import { GeneralApi } from '../api/general';
import { ProjectsApi } from '../api/projects';
import { ComponentsApi } from '../api/components';
import { DeploymentsApi } from '../api/deployments';
export interface ChoreoApiClient extends GeneralApi, ProjectsApi, ComponentsApi, DeploymentsApi {
    config: ApiConfig;
    setConfig(config: Partial<ApiConfig>): void;
}
export declare class ChoreoClient implements ChoreoApiClient {
    config: ApiConfig;
    constructor(config?: Partial<ApiConfig>);
    /**
     * Update the API configuration
     * @param config - Partial configuration to merge with current config
     */
    setConfig(config: Partial<ApiConfig>): void;
    listEndpoints: (config?: ApiConfig) => Promise<import("..").EndpointsResponse>;
    listProjects: (config?: ApiConfig) => Promise<import("..").ProjectList>;
    getProject: (projectName: string, config?: ApiConfig) => Promise<import("..").Project>;
    listProjectComponents: (projectName: string, config?: ApiConfig) => Promise<import("..").ComponentList>;
    listComponentDeployments: (projectName: string, componentName: string, config?: ApiConfig) => Promise<import("..").DeploymentList>;
    getDeployment: (projectName: string, componentName: string, deploymentName: string, config?: ApiConfig) => Promise<import("..").Deployment>;
}
