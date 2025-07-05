import { ApiConfig } from './config';
import { ProjectsApi } from '../api/projects';
import { ComponentsApi } from '../api/components';
import { OrganizationApi } from '../api/organization';
export interface ChoreoApiClient extends ProjectsApi, ComponentsApi, OrganizationApi {
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
    listProjects: (orgName: string) => Promise<import("..").ProjectList>;
    getProject: (orgName: string, projectName: string) => Promise<import("..").Project>;
    listProjectComponents: (orgName: string, projectName: string) => Promise<import("..").ComponentList>;
    getComponent: (orgName: string, projectName: string, componentName: string) => Promise<import("..").Component>;
    listOrganizations: () => Promise<import("..").OrganizationList>;
}
