import {
  FullPageLoader,
  PageLayout,
  PresetErrorPage,
} from "@open-choreo/common-views";
import { useSelectedComponent } from "@open-choreo/choreo-context";
import React from "react";
import {
  PanelExtensionMounter,
  PluginExtensionPoint,
  PluginExtensionType,
} from "@open-choreo/plugin-core";
import {
  getResourceDescription,
  getResourceDisplayName,
} from "@open-choreo/definitions";
import {
  RefreshIcon,
  Rotate,
  IconButton,
  useChoreoTheme,
} from "@open-choreo/design-system";

export const componentOverviewMainExtensionPoint: PluginExtensionPoint = {
  id: "component-overview-page-body",
  type: PluginExtensionType.PANEL,
};
const ComponentOverview: React.FC = () => {
  const {
    data: selectedComponent,
    isLoading,
    isError,
    isFetching,
    refetch,
  } = useSelectedComponent();
  const theme = useChoreoTheme();

  if (isLoading) {
    return <FullPageLoader />;
  }

  if (isError) {
    return <PresetErrorPage preset="500" />;
  }

  if (!selectedComponent) {
    return <PresetErrorPage preset="404" />;
  }

  return (
    <PageLayout
      testId="overview-page"
      title={getResourceDisplayName(selectedComponent?.data)}
      description={getResourceDescription(selectedComponent?.data)}
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
        extentionPoint={componentOverviewMainExtensionPoint}
      />
    </PageLayout>
  );
};

export default ComponentOverview;
