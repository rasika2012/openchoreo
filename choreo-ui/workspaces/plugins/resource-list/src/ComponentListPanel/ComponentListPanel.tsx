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

  if (componentListQueryResult?.error) {
    return <PresetErrorPage preset="500" />;
  }

  if (!componentListQueryResult?.data) {
    return <PresetErrorPage preset="404" />;
  }
  const components = componentListQueryResult?.data?.data?.items?.map(
    (item) => ({
      id: item.name,
      name: item.name,
      description: item.type,
      type: item.type,
      lastUpdated: item.createdAt,
      href: `${homePath}/component/${item.name}`,
    }),
  );
  return <ResourceTable resources={components || []} />;
};

export default ComponentListPanel;
