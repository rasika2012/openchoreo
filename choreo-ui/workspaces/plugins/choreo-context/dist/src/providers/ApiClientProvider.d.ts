import React, { Dispatch, ReactNode } from "react";
import { IAppState, IAppStateAction } from "../reducers/appState";
import { ChoreoClient } from "@open-choreo/api-client";
export interface ApiClientProviderProps {
    children: ReactNode;
}
export interface IApiClientContext {
    state: IAppState;
    dispatch: Dispatch<IAppStateAction>;
    apiClient: ChoreoClient;
}
export declare const ApiClientContext: React.Context<IApiClientContext>;
declare const ApiClientProvider: React.FC<ApiClientProviderProps>;
export default ApiClientProvider;
