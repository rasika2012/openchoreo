export enum BuildStatusValues {
  Pending = "pending",
  InProgress = "in_progress",
  Completed = "completed",
  Failed = "failed",
}
export interface BuildPlane {
  id: string;
  name: string;
  description: string;
  status: BuildStatusValues;
  createdAt: string;
  updatedAt: string;
}

export interface Build {
  name: string;
  uuid: string;
  componentName: string;
  projectName: string;
  orgName: string;
  commit: string;
  status: BuildStatusValues;
  createdAt: string;
  image?: string;
}
