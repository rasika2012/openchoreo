import {
  type ApplyResponse,
  type DeleteResponse,
} from "@open-choreo/api-client";
import { useMutation } from "@tanstack/react-query";
import { useClient } from "../useClients";

export const useApplyResource = () => {
  const client = useClient();
  const { data, error, isPending, mutate } = useMutation<
    ApplyResponse,
    Error,
    Record<string, unknown>
  >({
    mutationFn: (body) => client.applyResource(body),
  });
  return { applyResource: mutate, error, loading: isPending, data };
};

export const useDeleteResource = () => {
  const client = useClient();
  const { data, error, isPending, mutate } = useMutation<
    DeleteResponse,
    Error,
    Record<string, unknown>
  >({
    mutationFn: (body) => client.deleteResource(body),
  });
  return { deleteResource: mutate, error, loading: isPending, data };
};
