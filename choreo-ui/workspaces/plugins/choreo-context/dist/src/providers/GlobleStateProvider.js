import { jsx as _jsx } from "react/jsx-runtime";
import { createContext, useEffect, useMemo, useReducer, } from "react";
import { useComponent, useComponentList, useOrganizationList } from "../hooks";
import { useProject, useProjectList } from "../hooks/useProjects";
import { genaratePath, useComponentHandle, useOrgHandle, useProjectHandle, } from "@open-choreo/plugin-core";
import { useNavigate } from "react-router";
import { getResourceName, } from "@open-choreo/definitions";
import { appStateReducer, initialState, } from "../reducers/appState";
export const GlobalStateContext = createContext({
    componentQueryResult: null,
    componentListQueryResult: null,
    projectListQueryResult: null,
    projectQueryResult: null,
    organizationListQueryResult: null,
    selectedOrganization: null,
    selectedProject: null,
    selectedComponent: null,
    appState: initialState,
    dispatch: () => { },
});
export function GlobalStateProvider({ children, }) {
    const [appState, dispatch] = useReducer(appStateReducer, initialState);
    const projectHandle = useProjectHandle();
    const componentHandle = useComponentHandle();
    const orgHandle = useOrgHandle();
    const navigate = useNavigate();
    const componentQueryResult = useComponent(orgHandle, projectHandle, componentHandle);
    const componentListQueryResult = useComponentList(orgHandle, projectHandle);
    const projectListQueryResult = useProjectList(orgHandle);
    const projectQueryResult = useProject(orgHandle, projectHandle);
    const organizationListQueryResult = useOrganizationList();
    useEffect(() => {
        if (!orgHandle &&
            organizationListQueryResult.data?.data?.items.length > 0) {
            navigate(genaratePath({
                orgHandle: getResourceName(organizationListQueryResult.data?.data?.items[0]),
            }));
        }
    }, [orgHandle, organizationListQueryResult.data]);
    const selectedOrganization = useMemo(() => {
        return organizationListQueryResult?.data?.data?.items.find((org) => org.name === orgHandle);
    }, [organizationListQueryResult, orgHandle]);
    const selectedProject = useMemo(() => {
        return projectQueryResult?.data?.data;
    }, [projectQueryResult]);
    const selectedComponent = useMemo(() => {
        return componentQueryResult?.data?.data;
    }, [componentQueryResult]);
    return (_jsx(GlobalStateContext.Provider, { value: {
            componentQueryResult,
            componentListQueryResult,
            projectListQueryResult,
            projectQueryResult,
            organizationListQueryResult,
            selectedOrganization,
            selectedProject,
            selectedComponent,
            appState,
            dispatch,
        }, children: children }));
}
//# sourceMappingURL=GlobleStateProvider.js.map