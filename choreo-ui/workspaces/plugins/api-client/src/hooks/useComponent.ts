import { useContext } from "react";
import { ApiClientContext, IApiClientContext } from "../providers/ApiClientProvider";
import { ActionType } from "../reducers/appState";
import { Component } from "@open-choreo/api-client-lib";
import { useClient } from "./useClient";
import { useQuery } from "@tanstack/react-query";

export const useComponent = (prorjectId: string, componentId: string) => {
    const client = useClient();
    return useQuery({
        queryKey: ["component", prorjectId, componentId],
        queryFn: () => client.getComponent(prorjectId, componentId),
    });
};

