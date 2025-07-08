export interface OrganizationItem {
  name: string;
  createdAt: string;
  description: string;
  displayName: string;
  namespace: string;
  status: string;
}

export interface OrganizationListData {
  items: OrganizationItem[];
  totalCount: number;
  page: number;
  pageSize: number;
}

export interface OrganizationList {
  success: boolean;
  data: OrganizationListData;
}

export interface ProjectItem {
  name: string;
  orgName: string;
  deploymentOipeline: string;
  createdAt: string;
  status: string;
}

export interface ProjectListData {
  items: ProjectItem[];
  totalCount: number;
  page: number;
  pageSize: number;
}

export interface ProjectList {
  success: boolean;
  data: ProjectListData;
}

export interface Project {
  success: boolean;
  data: ProjectItem;
}

export interface Component {
  success: boolean;
  data: ComponentItem;
}


export interface ComponentItem {
  name: string;
  type: string;
  projectName: string;
  orgName: string;
  repositoryUrl: string;
  branch: string;
  createdAt: string;
  status: string;
}

export interface ComponentListData {
  items: ComponentItem[];
  totalCount: number;
  page: number;
  pageSize: number;
}

export interface ComponentList {
  success: boolean;
  data: ComponentListData;
}
