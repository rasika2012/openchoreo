import { ApiConfig } from '../core/config';
import { Project, ProjectList } from '../types/types';
export interface ProjectsApi {
    listProjects(config?: ApiConfig): Promise<ProjectList>;
    getProject(projectName: string, config?: ApiConfig): Promise<Project>;
}
export declare const projectsApi: ProjectsApi;
