import React, { Dispatch } from "react";
import { UseQueryResult } from "@tanstack/react-query";
import { Component, ComponentList, OrganizationList, Project, ProjectList } from "@open-choreo/api-client";
import { ComponentItem, OrganizationItem, ProjectItem } from "@open-choreo/definitions";
import { IAppState, IAppStateAction } from "../reducers/appState";
export interface GlobalState {
    componentQueryResult: UseQueryResult<Component, Error> | null;
    componentListQueryResult: UseQueryResult<ComponentList, Error> | null;
    projectListQueryResult: UseQueryResult<ProjectList, Error> | null;
    projectQueryResult: UseQueryResult<Project, Error> | null;
    organizationListQueryResult: UseQueryResult<OrganizationList, Error> | null;
    selectedOrganization: OrganizationItem | null;
    selectedProject: ProjectItem | null;
    selectedComponent: ComponentItem | null;
    appState: IAppState;
    dispatch: Dispatch<IAppStateAction>;
}
export declare const GlobalStateContext: React.Context<GlobalState>;
export declare function GlobalStateProvider({ children, }: {
    children: React.ReactNode;
}): import("react/jsx-runtime").JSX.Element;
