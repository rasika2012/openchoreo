import { bindingsApi, type BindingsApi } from "../api/bindings";
import { BuildsApi, buildsApi } from "../api/build";
import { componentsApi, type ComponentsApi } from "../api/components";
import {
  deploymentPipelineApi,
  type DeploymentPipelineApi,
} from "../api/deployment-pipeline";
import { workloadsApi, type WorkloadsApi } from "../api/workloads";
import { organizationApi, type OrganizationApi } from "../api/organization";
import { projectsApi, type ProjectsApi } from "../api/projects";
import { type ApiConfig, defaultConfig } from "./config";

export interface ChoreoApiClient
  extends ProjectsApi,
    ComponentsApi,
    OrganizationApi,
    BindingsApi,
    BuildsApi,
    DeploymentPipelineApi,
    WorkloadsApi {
  config: ApiConfig;
  setConfig(config: Partial<ApiConfig>): void;
}

export class ChoreoClient implements ChoreoApiClient {
  public config: ApiConfig;

  constructor(config: Partial<ApiConfig> = {}) {
    this.config = { ...defaultConfig, ...config };
  }

  /**
   * Update the API configuration
   * @param config - Partial configuration to merge with current config
   */
  setConfig(config: Partial<ApiConfig>): void {
    this.config = { ...this.config, ...config };
  }

  // Projects API methods
  listProjects = (orgName: string) =>
    projectsApi.listProjects(orgName, this.config);
  getProject = (orgName: string, projectName: string) =>
    projectsApi.getProject(orgName, projectName, this.config);

  // Components API methods
  listProjectComponents = (orgName: string, projectName: string) =>
    componentsApi.listProjectComponents(orgName, projectName, this.config);
  getComponent = (
    orgName: string,
    projectName: string,
    componentName: string,
  ) =>
    componentsApi.getComponent(
      orgName,
      projectName,
      componentName,
      this.config,
    );

  // Organization API methods
  listOrganizations = () => organizationApi.listOrganizations(this.config);
  getOrganization = (orgHandle: string) =>
    organizationApi.getOrganization(orgHandle, this.config);
  listBuildPlanes = (orgName: string) =>
    buildsApi.listBuildPlanes(orgName, this.config);
  listBuilds = (orgName: string, projectName: string, componentName: string) =>
    buildsApi.listBuilds(orgName, projectName, componentName, this.config);
  postBuild = (orgName: string, projectName: string, componentName: string) =>
    buildsApi.postBuild(orgName, projectName, componentName, this.config);

  // Bindings API methods
  listComponentBindings = (
    orgName: string,
    projectName: string,
    componentName: string,
  ) =>
    bindingsApi.listComponentBindings(
      orgName,
      projectName,
      componentName,
      this.config,
    );
  updateComponentBinding = (
    orgName: string,
    projectName: string,
    componentName: string,
    bindingName: string,
    data: Parameters<typeof bindingsApi.updateComponentBinding>[4],
  ) =>
    bindingsApi.updateComponentBinding(
      orgName,
      projectName,
      componentName,
      bindingName,
      data,
      this.config,
    );

  // Deployment Pipeline API methods
  getDeploymentPipeline = (orgName: string, projectName: string) =>
    deploymentPipelineApi.getDeploymentPipeline(
      orgName,
      projectName,
      this.config,
    );

  // Workloads API methods
  listWorkloads = (
    orgName: string,
    projectName: string,
    componentName: string,
  ) =>
    workloadsApi.listWorkloads(
      orgName,
      projectName,
      componentName,
      this.config,
    );
  createWorkload = (
    orgName: string,
    projectName: string,
    componentName: string,
    data: Parameters<typeof workloadsApi.createWorkload>[3],
  ) =>
    workloadsApi.createWorkload(
      orgName,
      projectName,
      componentName,
      data,
      this.config,
    );
}
