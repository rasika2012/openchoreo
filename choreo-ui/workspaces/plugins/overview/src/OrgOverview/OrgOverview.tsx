import {
  PageLayout,
  PresetErrorPage,
  ResourceList,
} from "@open-choreo/common-views";
import { useGlobalState } from "@open-choreo/api-client";
import { useHomePath } from "@open-choreo/plugin-core";
import React, { useMemo, useState } from "react";
import {
  Box,
  SearchBar,
  TimeIcon,
  Tooltip,
  Typography,
} from "@open-choreo/design-system";
import { useIntl } from "react-intl";

const OrgOverview: React.FC = () => {
  const { projectListQueryResult } = useGlobalState();
  const homePath = useHomePath();
  const [search, setSearch] = useState("");
  const { formatMessage } = useIntl();

  const project = useMemo(
    () =>
      projectListQueryResult?.data?.data?.items
        ?.filter((item) =>
          item.name.toLowerCase().includes(search.toLowerCase()),
        )
        .map((item) => ({
          id: item.name,
          name: item.name,
          description: item.deploymentOipeline,
          type: item.status,
          lastUpdated: item.createdAt,
          href: `${homePath}/project/${item.name}`,
        })),
    [projectListQueryResult?.data?.data.items, search],
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
        defaultMessage: "Projects",
      })}
    >
      <Box>
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
      <ResourceList
        resources={project}
        footerResourceListCardLeft={
          <Box display="flex" alignItems="center" gap={4}>
            <TimeIcon fontSize="inherit" />
            <Tooltip
              title={`Last updated: ${
                project?.[0]?.lastUpdated
                  ? new Date(project?.[0]?.lastUpdated).toLocaleDateString()
                  : "Unknown"
              }`}
            >
              <Typography variant="body1" color="text.secondary">
                {project?.[0]?.lastUpdated
                  ? new Date(project?.[0]?.lastUpdated).toLocaleDateString()
                  : "Unknown"}
              </Typography>
            </Tooltip>
          </Box>
        }
      />
    </PageLayout>
  );
};

export default OrgOverview;
