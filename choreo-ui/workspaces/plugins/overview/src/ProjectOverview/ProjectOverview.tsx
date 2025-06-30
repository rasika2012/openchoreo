import { PageLayout, PresetErrorPage, ResourceTable } from "@open-choreo/common-views";
import { useGlobalState } from "@open-choreo/api-client";
import { useHomePath, useUrlParams } from "@open-choreo/plugin-core";
import React from "react";

const ProjectOverview: React.FC = () => {
    const { componentListQueryResult } = useGlobalState();
    const homePath = useHomePath();

    if (componentListQueryResult?.isLoading) {
        return <PresetErrorPage preset="500" />;
    }

    if (!componentListQueryResult?.data) {
        return <PresetErrorPage preset="404" />;
    }
    const project = componentListQueryResult.data.items.map(item => ({
        id: item.metadata.name,
        name: item.metadata.name,
        description: Object.values(item.metadata.labels).join(', '),
        type: item.kind,
        lastUpdated: '',
        href: `${homePath}/component/${item.metadata.name}`,
    }));
    return (
        <PageLayout testId="overview-page" title={"Components"}>
            <ResourceTable resources={project} />
        </PageLayout>
    );
};

export default ProjectOverview;
