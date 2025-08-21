export interface BuildPlane {
  id: string;
  name: string;
  description: string;
  status: "pending" | "in_progress" | "completed" | "failed";
  createdAt: Date;
  updatedAt: Date;
}

export interface Build {
  name: string;
  uuid: string;
  componentName: string;
  projectName: string;
  orgName: string;
  commit: string;
  status: "pending" | "in_progress" | "completed" | "failed";
  createdAt: Date;
}
