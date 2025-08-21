import { DeploymentPipelineResponse } from "@open-choreo/api-client";
import { useQuery } from "@tanstack/react-query";
import { useClient } from "./useClients";

export const useDeploymentPipeline = (
  orgHandle: string,
  projectHandle: string,
) => {
  const client = useClient();
  const { data, error, isLoading, refetch } = useQuery<
    DeploymentPipelineResponse,
    Error
  >({
    queryKey: ["deployment-pipeline", client, orgHandle, projectHandle],
    queryFn: () => client.getDeploymentPipeline(orgHandle, projectHandle),
    enabled: !!orgHandle && !!projectHandle,
  });
  return {
    deploymentPipeline: data?.data,
    error,
    loading: isLoading,
    refetch,
  };
};
