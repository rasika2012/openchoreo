import {
  PageLayout,
  PresetErrorPage,
  ResourceList,
} from "@open-choreo/common-views";
import { useGlobalState } from "@open-choreo/api-client";
import { useHomePath, useUrlParams } from "@open-choreo/plugin-core";
import React from "react";
import {
  Box,
  IconButton,
  OpenProjectIcon,
  SettingsIcon,
  TimeIcon,
  Tooltip,
  Typography,
} from "@open-choreo/design-system";
import { Route, Routes } from "react-router";

const OrgOverview: React.FC = () => {
  const { projectListQueryResult } = useGlobalState();
  const { orgHandle, projectHandle, componentHandle } = useUrlParams();
  const homePath = useHomePath();

  if (projectListQueryResult?.isLoading) {
    return <PresetErrorPage preset="500" />;
  }

  if (!projectListQueryResult?.data) {
    return <PresetErrorPage preset="404" />;
  }

  const project = projectListQueryResult.data.items.map((item) => ({
    id: item.metadata.name,
    name: item.metadata.name,
    description: Object.values(item.metadata?.labels || []).join(", "),
    type: item.kind,
    lastUpdated: "",
    href: `${homePath}/project/${item.metadata.name}`,
  }));

  return (
    <PageLayout testId="overview-page" title={"Projects"}>
      <ResourceList
        resources={project}
        footerResourceListCardLeft={
          <Box display="flex" alignItems="center" gap={4}>
            <TimeIcon fontSize="inherit" />
            <Tooltip
              title={`Last updated: ${new Date(
                project[0].lastUpdated
              ).toLocaleDateString()}`}
            >
              <Typography variant="body1" color="text.secondary">
                {new Date(project[0].lastUpdated).toLocaleDateString()}
              </Typography>
            </Tooltip>
          </Box>
        }
        footerResourceListCardRight={
          <>
            <Tooltip title="Open project with vs code">
              <IconButton color="secondary" size="small">
                <OpenProjectIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title="Project settings">
              <IconButton color="secondary" size="small">
                <SettingsIcon />
              </IconButton>
            </Tooltip>
          </>
        }
      />
    </PageLayout>
  );
};

export default OrgOverview;
