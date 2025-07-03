import React, { createContext } from "react";
import { useComponent, useComponentList } from "../hooks";
import { UseQueryResult } from "@tanstack/react-query";
import {
  Component,
  ComponentList,
  Project,
  ProjectList,
} from "@open-choreo/api-client-lib";
import { useProject, useProjectList } from "../hooks/useProjects";
import { useComponentHandle, useProjectHandle } from "@open-choreo/plugin-core";

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

export function GlobalStateProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const projectHandle = useProjectHandle();
  const componentHandle = useComponentHandle();

  const componentQueryResult = useComponent(projectHandle, componentHandle);
  const componentListQueryResult = useComponentList(projectHandle);
  const projectListQueryResult = useProjectList();
  const projectQueryResult = useProject(projectHandle);

  return (
    <GlobalStateContext.Provider
      value={{
        componentQueryResult,
        componentListQueryResult,
        projectListQueryResult,
        projectQueryResult,
      }}
    >
      {children}
    </GlobalStateContext.Provider>
  );
}
