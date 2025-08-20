import { BuildList } from "@open-choreo/api-client";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useClient } from "./useClient";

export const useBuilds = (
  orgHandle: string,
  projectHandle: string,
  componentHandle: string,
) => {
  const client = useClient();
  const { data, error, isLoading } = useQuery<BuildList, Error>({
    queryKey: ["builds", client, orgHandle, projectHandle, componentHandle],
    queryFn: () => client.listBuilds(orgHandle, projectHandle, componentHandle),
  });
  return { builds: data, error, loading: isLoading };
};

export const useTriggerBuild = (
  orgHandle: string,
  projectHandle: string,
  componentHandle: string,
) => {
  const client = useClient();
  const { data, error, isPending, mutate } = useMutation({
    mutationFn: () =>
      client.postBuild(orgHandle, projectHandle, componentHandle),
  });
  return { triggerBuild: mutate, error, loading: isPending, data };
};
