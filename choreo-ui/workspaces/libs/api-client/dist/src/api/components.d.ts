import { ApiConfig } from '../core/config';
import { ComponentList } from '../types/types';
export interface ComponentsApi {
    listProjectComponents(projectName: string, config?: ApiConfig): Promise<ComponentList>;
}
export declare const componentsApi: ComponentsApi;
