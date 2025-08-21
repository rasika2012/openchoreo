import {
  ComponentBindingList,
  ComponentBindingResponse,
} from "@open-choreo/api-client";
import { ComponentBinding } from "@open-choreo/definitions";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useClient } from "./useClients";

export const useComponentBindings = (
  orgHandle: string,
  projectHandle: string,
  componentHandle: string,
) => {
  const client = useClient();
  const { data, error, isLoading } = useQuery<ComponentBindingList, Error>({
    queryKey: [
      "componentBindings",
      client,
      orgHandle,
      projectHandle,
      componentHandle,
    ],
    queryFn: () =>
      client.listComponentBindings(orgHandle, projectHandle, componentHandle),
  });
  return { bindings: data, error, loading: isLoading };
};

export const useUpdateComponentBinding = (
  orgHandle: string,
  projectHandle: string,
  componentHandle: string,
  bindingName: string,
) => {
  const client = useClient();
  const { data, error, isPending, mutate } = useMutation<
    ComponentBindingResponse,
    Error,
    ComponentBinding
  >({
    mutationFn: (updateData: ComponentBinding) =>
      client.updateComponentBinding(
        orgHandle,
        projectHandle,
        componentHandle,
        bindingName,
        updateData,
      ),
  });
  return { updateBinding: mutate, error, loading: isPending, data };
};
