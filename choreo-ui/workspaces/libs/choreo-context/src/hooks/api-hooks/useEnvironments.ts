import { EnvironmentList, EnvironmentResponse } from "@open-choreo/api-client";
import { CreateEnvironmentRequest } from "@open-choreo/definitions";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useClient } from "../useClients";

export const useEnvironments = (orgHandle: string) => {
  const client = useClient();
  const { data, error, isLoading, isFetching, refetch } = useQuery<
    EnvironmentList,
    Error
  >({
    queryKey: ["environments", client, orgHandle],
    queryFn: () => client.listEnvironments(orgHandle),
    enabled: !!orgHandle,
  });
  return {
    environments: data?.data?.items,
    totalCount: data?.data?.totalCount,
    error,
    loading: isLoading,
    isFetching,
    refetch,
  };
};

export const useEnvironment = (orgHandle: string, envName: string) => {
  const client = useClient();
  const { data, error, isLoading, isFetching, refetch } = useQuery<
    EnvironmentResponse,
    Error
  >({
    queryKey: ["environment", client, orgHandle, envName],
    queryFn: () => client.getEnvironment(orgHandle, envName),
    enabled: !!orgHandle && !!envName,
  });
  return {
    environment: data?.data,
    error,
    loading: isLoading,
    isFetching,
    refetch,
  };
};

export const useCreateEnvironment = (orgHandle: string) => {
  const client = useClient();
  const queryClient = useQueryClient();

  const { data, error, isPending, mutate } = useMutation<
    EnvironmentResponse,
    Error,
    CreateEnvironmentRequest
  >({
    mutationFn: (environmentData) =>
      client.createEnvironment(orgHandle, environmentData),
    onSuccess: () => {
      // Invalidate and refetch environments after successful creation
      queryClient.invalidateQueries({
        queryKey: ["environments", client, orgHandle],
      });
    },
  });

  return {
    createEnvironment: mutate,
    error,
    loading: isPending,
    data: data?.data,
  };
};
