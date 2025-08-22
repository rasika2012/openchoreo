export interface BuildPlane {
  id: string;
  name: string;
  description: string;
  status: "pending" | "in_progress" | "completed" | "failed";
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
  status: "pending" | "in_progress" | "completed" | "failed";
  createdAt: string;
}
