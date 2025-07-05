import { ApiConfig } from '../core/config';
import { OrganizationList } from '../types/types';
export interface OrganizationApi {
    listOrganizations(config?: ApiConfig): Promise<OrganizationList>;
}
export declare const organizationApi: OrganizationApi;
