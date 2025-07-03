import { FullPageLoader, PageLayout, PresetErrorPage, ResourceTable } from "@open-choreo/common-views";
import { useGlobalState } from "@open-choreo/api-client";
import { useHomePath, useUrlParams } from "@open-choreo/plugin-core";
import React from "react";

const ComponentOverview: React.FC = () => {
    const { componentQueryResult } = useGlobalState();
    const homePath = useHomePath();

    if (componentQueryResult?.isLoading) {
        return <FullPageLoader />;
    }

    if (!componentQueryResult?.data) {
        return <PresetErrorPage preset="404" />;
    }

    return (
        <PageLayout testId="overview-page" title={componentQueryResult.data.metadata.name}>
            <div>Component Overview</div>
        </PageLayout>
    );
};

export default ComponentOverview;
