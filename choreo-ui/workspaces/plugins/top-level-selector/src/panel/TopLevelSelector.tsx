import { Box, ConfigurationIcon, Level, TopLevelSelector, Typography, useChoreoTheme } from "@open-choreo/design-system";
import React from "react";

const Panel: React.FC = () => {
    const theme = useChoreoTheme();
    return (
        <Box display="flex" flexDirection="row" gap={theme.spacing(1)} padding={theme.spacing(0, 2)} alignItems="center" height="100%" >
            <Box display="flex" flexDirection="row" backgroundColor="secondary.light" gap={theme.spacing(1)} alignItems="center" padding={theme.spacing(0.5)}>
                <ConfigurationIcon />
                <Typography variant="h4">
                    Open Choreo
                </Typography>
            </Box>
            <TopLevelSelector items={[]} recentItems={[]} selectedItem={{ label: "Overview", id: "overview" }} level={Level.ORGANIZATION} onSelect={() => { }} />
            <TopLevelSelector items={[]} recentItems={[]} selectedItem={{ label: "Overview", id: "overview" }} level={Level.PROJECT} onSelect={() => { }} />
            <TopLevelSelector items={[]} recentItems={[]} selectedItem={{ label: "Overview", id: "overview" }} level={Level.COMPONENT} onSelect={() => { }} />
        </Box>
    );
};

export default Panel; 