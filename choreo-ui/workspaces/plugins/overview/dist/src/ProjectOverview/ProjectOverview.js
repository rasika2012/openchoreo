import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useSelectedProject } from "@open-choreo/choreo-context";
import { FullPageLoader, PresetErrorPage } from "@open-choreo/common-views";
import { PanelExtensionMounter, PluginExtensionType, } from "@open-choreo/plugin-core";
import { ResourcePageLayout } from "@open-choreo/resource-views";
import { Box, GridContainer, GridItem, useChoreoTheme, } from "@open-choreo/design-system";
export const projectOverviewMainExtensionPoint = {
    id: "project-overview-page-body",
    type: PluginExtensionType.PANEL,
};
export const projectOverviewSecondaryExtensionPoint = {
    id: "project-overview-side-panels",
    type: PluginExtensionType.PANEL,
};
const ProjectOverview = () => {
    const { data: selectedProject, isLoading, isError, isFetching, } = useSelectedProject();
    const theme = useChoreoTheme();
    if (isLoading) {
        return _jsx(FullPageLoader, {});
    }
    if (isError) {
        return _jsx(PresetErrorPage, { preset: "500" });
    }
    if (!selectedProject) {
        return _jsx(PresetErrorPage, { preset: "404" });
    }
    return (_jsx(ResourcePageLayout, { resource: selectedProject?.data, testId: "project-overview-page", isRefreshing: isFetching, isLoading: isLoading, children: _jsxs(GridContainer, { spacing: 2, children: [_jsx(GridItem, { size: { xs: 12, sm: 12, md: 8, lg: 9, xl: 10 }, children: _jsx(PanelExtensionMounter, { extentionPoint: projectOverviewMainExtensionPoint }) }), _jsx(GridItem, { size: { xs: 12, sm: 12, md: 4, lg: 3, xl: 1 }, children: _jsx(Box, { display: "flex", flexDirection: "row", gap: theme.spacing(2), children: _jsx(PanelExtensionMounter, { extentionPoint: projectOverviewSecondaryExtensionPoint }) }) })] }) }));
};
export default ProjectOverview;
//# sourceMappingURL=ProjectOverview.js.map