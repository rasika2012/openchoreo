export interface OrganizationItem {
  name: string;
  createdAt: string;
  description: string;
  displayName: string;
  namespace: string;
  status: string;
}

export interface ProjectItem {
  createdAt: string;
  deploymentPipeline: string;
  description: string;
  displayName: string;
  name: string;
  orgName: string;
  status: string;
}

export interface ComponentItem {
  displayName: string;
  name: string;
  type: string;
  projectName: string;
  description: string;
  orgName: string;
  createdAt: string;
  status: string;
  buildConfig?: BuildConfig;
  service?: Record<string, unknown>;
  webApplication?: Record<string, unknown>;
  scheduledTask?: Record<string, unknown>;
  api?: Record<string, unknown>;
  workload?: Record<string, unknown>;
}

export type Resource = OrganizationItem | ProjectItem | ComponentItem;

export interface BuildConfig {
  repoUrl?: string;
  repoBranch?: string;
  componentPath?: string;
  buildTemplateRef?: string;
  buildTemplateParams?: TemplateParameter[];
}

export interface TemplateParameter {
  name: string;
  value: string;
}
