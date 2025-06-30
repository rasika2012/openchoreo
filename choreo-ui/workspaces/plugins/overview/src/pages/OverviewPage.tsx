import { PageLayout, PresetErrorPage } from "@open-choreo/common-views";
import { useGlobalState } from "@open-choreo/api-client";
import { useUrlParams } from "@open-choreo/plugin-core";
import React from "react";
import { Box, Typography } from "@open-choreo/design-system";
import { Route, Routes } from "react-router";


const OverviewPage: React.FC = () => {
    const { projectQueryResult } = useGlobalState();
    const { orgHandle, projectHandle, componentHandle } = useUrlParams();

    if (projectQueryResult?.isLoading) {
        return <PresetErrorPage preset="500" />;
    }

    if (!projectQueryResult?.data) {
        return <PresetErrorPage preset="404" />;
    }

    const project = projectQueryResult.data;

    return (
        <PageLayout testId="overview-page" title={project.metadata.name}>
            <Box display="flex" flexDirection="column" gap={2}>
                <Typography>{orgHandle}</Typography>
                <Typography>{projectHandle}</Typography>
                <Typography>{componentHandle}</Typography>
                <Routes>
                    <Route path="/home/2" element={<div>Home 2</div>} />
                    <Route path="/home/1" element={<div>Home 1</div>} />
                    <Route path="/home/3" element={<div>Home 3</div>} />
                    <Route path="/home/4" element={<div>Home 4</div>} />
                </Routes>
            </Box>
            <PresetErrorPage preset="404" />
        </PageLayout>
    );
};

export default OverviewPage;
