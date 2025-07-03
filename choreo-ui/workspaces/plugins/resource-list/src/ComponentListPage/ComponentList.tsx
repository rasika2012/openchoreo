import {
  FullPageLoader,
  PageLayout,
  PresetErrorPage,
  ResourceTable,
} from "@open-choreo/common-views";
import { useGlobalState } from "@open-choreo/api-client";
import { useHomePath, ExtentionMounter } from "@open-choreo/plugin-core";
import React from "react";

const ComponentList: React.FC = () => {
  const { componentListQueryResult } = useGlobalState();
  const homePath = useHomePath();

  if (componentListQueryResult?.isLoading) {
    return <FullPageLoader />;
  }

  if (!componentListQueryResult?.data) {
    return <PresetErrorPage preset="404" />;
  }
  const project = componentListQueryResult.data.items.map((item) => ({
    id: item.metadata.name,
    name: item.metadata.name,
    description: Object.values(item.metadata?.labels || []).join(", "),
    type: item.kind,
    lastUpdated: "",
    href: `${homePath}/component/${item.metadata.name}`,
  }));
  return (
    <PageLayout testId="component-list" title={"Components List"}>
      <ExtentionMounter extentionPointId={"component-list-page-body"} />
    </PageLayout>
  );
};

export default ComponentList;
