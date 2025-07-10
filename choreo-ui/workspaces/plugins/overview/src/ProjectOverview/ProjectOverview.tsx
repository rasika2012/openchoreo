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
import { getResourceDescription, getResourceDisplayName } from "@open-choreo/definitions";
import { RefreshIcon } from "@open-choreo/design-system";
import { Rotate } from "@open-choreo/design-system";
import { IconButton } from "@open-choreo/design-system";

export const projectOverviewMainExtensionPoint: PluginExtensionPoint = {
  id: "project-overview-page-body",
  type: PluginExtensionType.PANEL,
};

const ProjectOverview: React.FC = () => {
  const { projectQueryResult,componentListQueryResult, selectedProject } = useGlobalState();
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
      title={getResourceDisplayName(selectedProject)}
      description={getResourceDescription(selectedProject)}
      actions={
        <IconButton
          size="small"
          onClick={() => {
            projectQueryResult.refetch();
            componentListQueryResult.refetch();
          }}
        >
          <Rotate disabled={!projectQueryResult.isFetching}>
            <RefreshIcon fontSize="inherit" />
          </Rotate>
        </IconButton>
      }
    >
      <PanelExtensionMounter
        extentionPoint={projectOverviewMainExtensionPoint}
      />
    </PageLayout>
  );
};

export default ProjectOverview;
