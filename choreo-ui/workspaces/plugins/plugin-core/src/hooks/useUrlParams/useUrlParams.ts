import { useMemo } from "react";
import { useMatch, useParams } from "react-router";
import { PathsPatterns } from "../../plugin-types";

export function useUrlParams() {
  return useParams<{ orgHandle: string, projectHandle: string, componentHandle: string, page: string, subPage: string }>();
}

export function usePathMatchOrg() {
  return useMatch(PathsPatterns.ORG_LEVEL)
}

export function useOrgHandle() {
  const match = usePathMatchOrg();
  return match?.params?.orgHandle;
}

export function useProjectHandle() {
  const match = usePathMatchProject();
  return match?.params?.projectHandle;
}

export function useComponentHandle() {
  const match = usePathMatchComponent();
  return match?.params?.componentHandle;
}

export function usePathMatchProject() {
  return useMatch(PathsPatterns.PROJECT_LEVEL)
}

export function usePathMatchComponent() {
  return useMatch(PathsPatterns.COMPONENT_LEVEL)
}

export function useHomePath() {
  const orgMatch = usePathMatchOrg()
  const projectMatch = usePathMatchProject()
  const componentMatch = usePathMatchComponent()
  return useMemo(() => {
    if (componentMatch) {
      const {orgHandle, projectHandle, componentHandle} = componentMatch?.params
      return `/organization/${orgHandle}/project/${projectHandle}/component/${componentHandle}`
    }
    if (projectMatch) {
      const {orgHandle, projectHandle} = projectMatch?.params
      return `/organization/${orgHandle}/project/${projectHandle}`
    }
    if (orgMatch) {
      const {orgHandle} = orgMatch?.params
      return `/organization/${orgHandle}`
    }
    return `/`
  }, [orgMatch, projectMatch, componentMatch])
}