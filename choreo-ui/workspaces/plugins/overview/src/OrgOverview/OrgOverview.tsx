import {
  PageLayout,
  PresetErrorPage,
  ResourceList,
} from "@open-choreo/common-views";
import { useGlobalState } from "@open-choreo/choreo-context";
import {
  ExtentionMounter,
  PluginExtensionPoint,
  PluginExtensionType,
  useHomePath,
} from "@open-choreo/plugin-core";
import React, { useMemo, useState } from "react";
import {
  Box,
  IconButton,
  RefreshIcon,
  Rotate,
  SearchBar,
  TimeIcon,
  Tooltip,
  Typography,
} from "@open-choreo/design-system";
import { useIntl } from "react-intl";

export const organizationOverviewMainExtensionPoint: PluginExtensionPoint = {
  id: "org-overview-page-body",
  type: PluginExtensionType.PANEL,
};

export const organizationOverviewActions: PluginExtensionPoint = {
  id: "org-overview-page-actions",
  type: PluginExtensionType.PANEL,
};

const OrgOverview: React.FC = () => {
  const { projectListQueryResult } = useGlobalState();
  const homePath = useHomePath();
  const [search, setSearch] = useState("");
  const { formatMessage } = useIntl();

  const projects = useMemo(
    () =>
      projectListQueryResult?.data?.data?.items
        ?.filter((item) =>
          item.name.toLowerCase().includes(search.toLowerCase()),
        )
        .map((item) => ({
          id: item.name,
          name: item.name,
          description: item?.description || "",
          type: item.status,
          lastUpdated: item.createdAt,
          href: `${homePath}/project/${item.name}`,
        })),
    [projectListQueryResult?.data?.data.items, search, homePath],
  );

  if (projectListQueryResult?.isLoading) {
    return <PresetErrorPage preset="500" />;
  }

  if (!projectListQueryResult?.data) {
    return <PresetErrorPage preset="404" />;
  }

  return (
    <PageLayout
      testId="overview-page"
      title={formatMessage({
        id: "overview.orgOverview.title",
        defaultMessage: "All Projects",
      })}
      actions={
        <IconButton
          size="small"
          onClick={() => {
            projectListQueryResult.refetch();
          }}
        >
          <Rotate disabled={!projectListQueryResult.isFetching}>
            <RefreshIcon fontSize="inherit" />
          </Rotate>
        </IconButton>
      }
    >
      <Box
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        gap={4}
      >
        <Box flexGrow={1}>
          <SearchBar
            inputValue={search}
            color="secondary"
            bordered
            onChange={(value) => setSearch(value)}
            testId="search-bar"
            placeholder={formatMessage({
              id: "overview.orgOverview.searchPlaceholder",
              defaultMessage: "Search projects",
            })}
          />
        </Box>
        <ExtentionMounter extentionPoint={organizationOverviewActions} />
      </Box>
      <ResourceList
        resources={projects}
        footerResourceListCardLeft={
          <Box display="flex" alignItems="center" gap={4}>
            <TimeIcon fontSize="inherit" />
            <Tooltip
              title={`Last updated: ${
                projects[0]?.lastUpdated
                  ? new Date(projects[0].lastUpdated).toLocaleDateString()
                  : "Unknown"
              }`}
            >
              <Typography variant="body1" color="text.secondary">
                {projects[0]?.lastUpdated
                  ? new Date(projects[0].lastUpdated).toLocaleDateString()
                  : "Unknown"}
              </Typography>
            </Tooltip>
          </Box>
        }
      />
      <ExtentionMounter
        extentionPoint={organizationOverviewMainExtensionPoint}
      />
    </PageLayout>
  );
};

export default OrgOverview;
