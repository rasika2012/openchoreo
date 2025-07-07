import {
  FullPageLoader,
  PageLayout,
  PresetErrorPage,
} from "@open-choreo/common-views";
import { useGlobalState } from "@open-choreo/api-client";
import React from "react";
import {
  ExtentionMounter,
  PluginExtensionPoint,
  PluginExtensionType,
} from "@open-choreo/plugin-core";

export const componentOverviewMainExtensionPoint: PluginExtensionPoint = {
  id: "component-overview-page-body",
  type: PluginExtensionType.PANEL,
};
const ComponentOverview: React.FC = () => {
  const { componentQueryResult } = useGlobalState();

  if (componentQueryResult?.isLoading) {
    return <FullPageLoader />;
  }

  if (!componentQueryResult?.data) {
    return <PresetErrorPage preset="404" />;
  }

  return (
    <PageLayout
      testId="overview-page"
      title={componentQueryResult.data.metadata.name}
    >
      <div>Component Overview</div>
      <ExtentionMounter extentionPoint={componentOverviewMainExtensionPoint} />
    </PageLayout>
  );
};

export default ComponentOverview;
