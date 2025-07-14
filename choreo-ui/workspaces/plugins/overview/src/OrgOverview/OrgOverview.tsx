import {
  FullPageLoader,
  PageLayout,
  PresetErrorPage,
} from "@open-choreo/common-views";
import { useSelectedOrganization } from "@open-choreo/choreo-context";
import {
  PanelExtensionMounter,
  PluginExtensionPoint,
  PluginExtensionType,
  useHomePath,
} from "@open-choreo/plugin-core";
import React from "react";
import {
  IconButton,
  RefreshIcon,
  Rotate,
  useChoreoTheme,
} from "@open-choreo/design-system";
import {
  getResourceDescription,
  getResourceDisplayName,
} from "@open-choreo/definitions";

export const organizationOverviewMainExtensionPoint: PluginExtensionPoint = {
  id: "org-overview-page-body",
  type: PluginExtensionType.PANEL,
};

const OrgOverview: React.FC = () => {
  const {
    data: selectedOrganization,
    isLoading,
    isError,
    isFetching,
    refetch,
  } = useSelectedOrganization();

  const theme = useChoreoTheme();
  if (isLoading) {
    return <FullPageLoader />;
  }

  if (isError) {
    return <PresetErrorPage preset="500" />;
  }

  if (!selectedOrganization) {
    return <PresetErrorPage preset="404" />;
  }

  return (
    <PageLayout
      testId="overview-page"
      title={getResourceDisplayName(selectedOrganization?.data)}
      description={getResourceDescription(selectedOrganization?.data)}
      actions={
        <IconButton
          size="small"
          onClick={() => {
            refetch();
          }}
        >
          <Rotate disabled={!isFetching} color={theme.pallet.primary.main}>
            <RefreshIcon fontSize="inherit" />
          </Rotate>
        </IconButton>
      }
    >
      <PanelExtensionMounter
        extentionPoint={organizationOverviewMainExtensionPoint}
      />
    </PageLayout>
  );
};

export default OrgOverview;
