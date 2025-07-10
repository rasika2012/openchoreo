import {
  FullPageLoader,
  PageLayout,
  PresetErrorPage,
} from "@open-choreo/common-views";
import { useGlobalState } from "@open-choreo/api-client";
import {
  ExtentionMounter,
  PluginExtensionPoint,
  PluginExtensionType,
} from "@open-choreo/plugin-core";
import React from "react";

export const componentListExtensionPoint: PluginExtensionPoint = {
  id: "component-list-page-body",
  type: PluginExtensionType.PANEL,
};

const ComponentList: React.FC = () => {
  const { componentListQueryResult } = useGlobalState();

  if (componentListQueryResult?.isLoading) {
    return <FullPageLoader />;
  }

  if (componentListQueryResult?.error) {
    return <PresetErrorPage preset="500" />;
  }

  if (!componentListQueryResult?.data) {
    return <PresetErrorPage preset="404" />;
  }

  return (
    <PageLayout testId="component-list" title={"Components List"}>
      <ExtentionMounter extentionPoint={componentListExtensionPoint} />
    </PageLayout>
  );
};

export default ComponentList;
