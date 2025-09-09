import { type ComponentObserverResponse } from "@open-choreo/api-client";
import { useQuery } from "@tanstack/react-query";
import { useClient } from "../useClients";

export const useRuntimeObserverUrl = (
  orgHandle: string,
  projectHandle: string,
  componentHandle: string,
  environmentName: string,
) => {
  const client = useClient();
  const { data, error, isLoading, isFetching, refetch } = useQuery<
    ComponentObserverResponse,
    Error
  >({
    queryKey: [
      "runtimeObserver",
      client,
      orgHandle,
      projectHandle,
      componentHandle,
      environmentName,
    ],
    queryFn: () =>
      client.getRuntimeObserverUrl(
        orgHandle,
        projectHandle,
        componentHandle,
        environmentName,
      ),
    enabled:
      !!orgHandle && !!projectHandle && !!componentHandle && !!environmentName,
  });
  return { data, error, loading: isLoading, isFetching, refetch };
};

export const useBuildObserverUrl = (
  orgHandle: string,
  projectHandle: string,
  componentHandle: string,
) => {
  const client = useClient();
  const { data, error, isLoading, isFetching, refetch } = useQuery<
    ComponentObserverResponse,
    Error
  >({
    queryKey: [
      "buildObserver",
      client,
      orgHandle,
      projectHandle,
      componentHandle,
    ],
    queryFn: () =>
      client.getBuildObserverUrl(orgHandle, projectHandle, componentHandle),
    enabled: !!orgHandle && !!projectHandle && !!componentHandle,
  });
  return { data, error, loading: isLoading, isFetching, refetch };
};
