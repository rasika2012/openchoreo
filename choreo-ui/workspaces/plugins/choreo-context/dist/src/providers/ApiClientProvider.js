import { jsx as _jsx } from "react/jsx-runtime";
import { createContext, useMemo, useReducer, } from "react";
import { appStateReducer, initialState, } from "../reducers/appState";
import { ChoreoClient } from "@open-choreo/api-client";
import { useBasePath } from "@open-choreo/plugin-core";
import { GlobalStateProvider } from "./GlobleStateProvider";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
export const ApiClientContext = createContext({
    state: initialState,
    dispatch: () => { },
    apiClient: new ChoreoClient(),
});
const ApiClientProvider = (props) => {
    const basePath = useBasePath();
    const apiClient = useMemo(() => new ChoreoClient({ baseUrl: basePath }), [basePath]);
    const queryClient = useMemo(() => new QueryClient(), []);
    const [state, dispatch] = useReducer(appStateReducer, initialState);
    return (_jsx(QueryClientProvider, { client: queryClient, children: _jsx(ApiClientContext.Provider, { value: { apiClient, state, dispatch }, children: _jsx(GlobalStateProvider, { children: props.children }) }) }));
};
export default ApiClientProvider;
//# sourceMappingURL=ApiClientProvider.js.map