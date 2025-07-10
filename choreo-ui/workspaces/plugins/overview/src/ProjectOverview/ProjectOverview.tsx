import { useGlobalState } from "@open-choreo/choreo-context";
import {
  FullPageLoader,
  PageLayout,
  PresetErrorPage,
} from "@open-choreo/common-views";
import {
  PanelExtensionMounter,
  PluginExtensionPoint,
  PluginExtensionType,
} from "@open-choreo/plugin-core";
import React from "react";

export const projectOverviewMainExtensionPoint: PluginExtensionPoint = {
  id: "project-overview-page-body",
  type: PluginExtensionType.PANEL,
};

const ProjectOverview: React.FC = () => {
  const { projectQueryResult } = useGlobalState();
  if (projectQueryResult?.isLoading) {
    return <FullPageLoader />;
  }

  if (projectQueryResult?.error) {
    return <PresetErrorPage preset="500" />;
  }

  if (!projectQueryResult?.data) {
    return <PresetErrorPage preset="404" />;
  }

  return (
    <PageLayout
      testId="overview-page"
      title={projectQueryResult?.data?.data?.name}
    >
      <PanelExtensionMounter
        extentionPoint={projectOverviewMainExtensionPoint}
      />
    </PageLayout>
  );
};

export default ProjectOverview;
