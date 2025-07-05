import { ApiConfig } from '../core/config';
import { Project, ProjectList } from '../types/types';
export interface ProjectsApi {
    listProjects(orgName: string, config?: ApiConfig): Promise<ProjectList>;
    getProject(orgName: string, projectName: string, config?: ApiConfig): Promise<Project>;
}
export declare const projectsApi: ProjectsApi;
