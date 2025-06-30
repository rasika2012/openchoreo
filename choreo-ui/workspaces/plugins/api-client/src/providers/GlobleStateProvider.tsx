import React, { createContext } from "react";
import { useComponent, useComponentList } from "../hooks";
import { UseQueryResult } from "@tanstack/react-query";
import { Component, ComponentList, Project, ProjectList } from "@open-choreo/api-client-lib";
import { useProject, useProjectList } from "../hooks/useProjects";

export interface GlobalState {
    componentQueryResult: UseQueryResult<Component, Error> | null;
    componentListQueryResult: UseQueryResult<ComponentList, Error> | null;
    projectListQueryResult: UseQueryResult<ProjectList, Error> | null;
    projectQueryResult: UseQueryResult<Project, Error> | null;
}

export const GlobalStateContext = createContext<GlobalState>({
    componentQueryResult: null,
    componentListQueryResult: null,
    projectListQueryResult: null,
    projectQueryResult: null,
});

export function GlobalStateProvider({ children }: { children: React.ReactNode }) {
    const componentQueryResult = useComponent('dummy_id_prj', 'id_cmp');
    const componentListQueryResult = useComponentList('dummy_id_prj');
    const projectListQueryResult = useProjectList();
    const projectQueryResult = useProject('dummy_id_prj');

    return (
        <GlobalStateContext.Provider value={{ componentQueryResult, componentListQueryResult, projectListQueryResult, projectQueryResult }}>
            {children}
        </GlobalStateContext.Provider>
    );
}
