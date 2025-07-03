import { useClient } from "./useClient";
import { useQuery } from "@tanstack/react-query";

export const useComponent = (prorjectId?: string, componentId?: string) => {
  const client = useClient();
  return useQuery({
    queryKey: ["component", prorjectId, componentId],
    queryFn: () => {
      if (prorjectId && componentId) {
        return client.getComponent(prorjectId, componentId);
      }
      return null;
    },
  });
};

export const useComponentList = (projectId?: string) => {
  const client = useClient();
  return useQuery({
    queryKey: ["componentList", projectId],
    queryFn: () => {
      if (projectId) {
        return client.listProjectComponents(projectId);
      }
      return null;
    },
  });
};
