import { ApiConfig } from '../core/config';
import { Component, ComponentList } from '../types/types';
export interface ComponentsApi {
    listProjectComponents(orgName: string, projectName: string, config?: ApiConfig): Promise<ComponentList>;
    getComponent(orgName: string, projectName: string, componentName: string, config?: ApiConfig): Promise<Component>;
}
export declare const componentsApi: ComponentsApi;
