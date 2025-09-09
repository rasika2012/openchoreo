import {
  type DataPlaneList,
  type DataPlaneResponse,
} from "@open-choreo/api-client";
import { type CreateDataPlaneRequest } from "@open-choreo/definitions";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useClient } from "../useClients";

export const useDataPlanes = (orgHandle: string) => {
  const client = useClient();
  const { data, error, isLoading, isFetching, refetch } = useQuery<
    DataPlaneList,
    Error
  >({
    queryKey: ["dataplanes", client, orgHandle],
    queryFn: () => client.listDataPlanes(orgHandle),
    enabled: !!orgHandle,
  });
  return {
    data,
    error,
    loading: isLoading,
    isFetching,
    refetch,
  };
};

export const useDataPlane = (orgHandle: string, dpName: string) => {
  const client = useClient();
  const { data, error, isLoading, isFetching, refetch } = useQuery<
    DataPlaneResponse,
    Error
  >({
    queryKey: ["dataplane", client, orgHandle, dpName],
    queryFn: () => client.getDataPlane(orgHandle, dpName),
    enabled: !!orgHandle && !!dpName,
  });
  return {
    data,
    error,
    loading: isLoading,
    isFetching,
    refetch,
  };
};

export const useCreateDataPlane = (orgHandle: string) => {
  const client = useClient();
  const queryClient = useQueryClient();

  const { data, error, isPending, mutate } = useMutation<
    DataPlaneResponse,
    Error,
    CreateDataPlaneRequest
  >({
    mutationFn: (payload: CreateDataPlaneRequest) =>
      client.createDataPlane(orgHandle, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["dataplanes", client, orgHandle],
      });
    },
  });

  return {
    createDataPlane: mutate,
    error,
    loading: isPending,
    data,
  };
};
