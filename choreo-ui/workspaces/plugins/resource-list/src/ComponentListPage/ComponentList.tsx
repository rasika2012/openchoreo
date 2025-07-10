import {
  FullPageLoader,
  PageLayout,
  PresetErrorPage,
} from "@open-choreo/common-views";
import { useGlobalState } from "@open-choreo/choreo-context";
import {
  PanelExtensionMounter,
  PluginExtensionPoint,
  PluginExtensionType,
} from "@open-choreo/plugin-core";
import React from "react";

export const componentListMainExtensionPoint: PluginExtensionPoint = {
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
      <PanelExtensionMounter extentionPoint={componentListMainExtensionPoint} />
    </PageLayout>
  );
};

export default ComponentList;
