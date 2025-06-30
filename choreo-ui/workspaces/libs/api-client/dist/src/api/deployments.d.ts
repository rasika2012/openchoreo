import { ApiConfig } from '../core/config';
import { Deployment, DeploymentList } from '../types/types';
export interface DeploymentsApi {
    listComponentDeployments(projectName: string, componentName: string, config?: ApiConfig): Promise<DeploymentList>;
    getDeployment(projectName: string, componentName: string, deploymentName: string, config?: ApiConfig): Promise<Deployment>;
}
export declare const deploymentsApi: DeploymentsApi;
