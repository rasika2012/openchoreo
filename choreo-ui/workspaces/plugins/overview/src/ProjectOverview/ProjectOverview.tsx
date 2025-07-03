import { useGlobalState } from "@open-choreo/api-client";
import { PageLayout } from "@open-choreo/common-views";
import { ExtentionMounter } from "@open-choreo/plugin-core";
import React from "react";

const ProjectOverview: React.FC = () => {
    const { projectQueryResult } = useGlobalState();
    return (
        <PageLayout testId="overview-page" title={projectQueryResult?.data?.metadata.name}>
            <ExtentionMounter extentionPointId={"project-overview-page-body"} />
        </PageLayout>
    );
};

export default ProjectOverview;
