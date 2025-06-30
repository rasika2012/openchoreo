import { useQuery } from "@tanstack/react-query";
import { useClient } from "./useClient";

export const useProjectList = () => {
  const client = useClient();
  return useQuery({
    queryKey: ["projects"],
    queryFn: () => client.listProjects(),
  });
};

export const useProject = (projectId?: string) => {
  const client = useClient();
  return useQuery({
    queryKey: ["project", projectId],
    queryFn: () => {
      if (projectId) {
        return client.getProject(projectId);
      }
      return null;
    },
  });
};