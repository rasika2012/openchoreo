import {
  FullPageLoader,
  PageLayout,
  PresetErrorPage,
  ResourceTable,
} from "@open-choreo/common-views";
import { useGlobalState } from "@open-choreo/api-client";
import { useHomePath } from "@open-choreo/plugin-core";
import React from "react";

const ComponentListPanel: React.FC = () => {
  const { componentListQueryResult } = useGlobalState();
  const homePath = useHomePath();

  if (componentListQueryResult?.isLoading) {
    return <FullPageLoader />;
  }

  if (!componentListQueryResult?.data) {
    return <PresetErrorPage preset="404" />;
  }
  const components = componentListQueryResult?.data?.items?.map((item) => ({
    id: item.metadata.name,
    name: item.metadata.name,
    description: Object.values(item.metadata?.labels || []).join(", "),
    type: item.kind,
    lastUpdated: "",
    href: `${homePath}/component/${item.metadata.name}`,
  }));
  return <ResourceTable resources={components || []} />;
};

export default ComponentListPanel;
