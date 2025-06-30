import { ApiConfig } from '../core/config';
import { EndpointsResponse } from '../types/types';
export interface GeneralApi {
    listEndpoints(config?: ApiConfig): Promise<EndpointsResponse>;
}
export declare const generalApi: GeneralApi;
