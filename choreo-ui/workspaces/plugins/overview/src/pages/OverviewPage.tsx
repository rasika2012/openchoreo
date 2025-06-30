import { PageLayout, PresetErrorPage } from "@open-choreo/common-views";
import { useGlobalState } from "@open-choreo/api-client";
import React from "react";

const OverviewPage: React.FC = () => {
    const { projectQueryResult } = useGlobalState();

    if (projectQueryResult?.isLoading) {
        return <PresetErrorPage preset="500" />;
    }

    if (!projectQueryResult?.data) {
        return <PresetErrorPage preset="404" />;
    }

    const project = projectQueryResult.data;

    return (
        <PageLayout testId="overview-page" title={project.metadata.name}>
            <PresetErrorPage preset="404" />
        </PageLayout>
    );
};

export default OverviewPage;
