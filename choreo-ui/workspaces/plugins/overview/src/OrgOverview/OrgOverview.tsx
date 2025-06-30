import { PageLayout, PresetErrorPage, ResourceTable } from "@open-choreo/common-views";
import { useGlobalState } from "@open-choreo/api-client";
import { useHomePath, useUrlParams } from "@open-choreo/plugin-core";
import React from "react";
import { Box, Typography } from "@open-choreo/design-system";
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

    const project = projectListQueryResult.data.items.map(item => ({
        id: item.metadata.name,
        name: item.metadata.name,
        description: Object.values(item.metadata?.labels || []).join(', '),
        type: item.kind,
        lastUpdated: '',
        href: `${homePath}/project/${item.metadata.name}`,
    }));

    return (
        <PageLayout testId="overview-page" title={"Projects"}>
            <ResourceTable resources={project} />
        </PageLayout>
    );
};

export default OrgOverview;
