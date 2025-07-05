import { jsx as _jsx } from "react/jsx-runtime";
import { useGlobalState } from "@open-choreo/choreo-context";
import { FullPageLoader, PageLayout, PresetErrorPage, } from "@open-choreo/common-views";
import { PanelExtensionMounter, PluginExtensionType, } from "@open-choreo/plugin-core";
import { getResourceDescription, getResourceDisplayName, } from "@open-choreo/definitions";
import { RefreshIcon, Rotate, IconButton } from "@open-choreo/design-system";
export const projectOverviewMainExtensionPoint = {
    id: "project-overview-page-body",
    type: PluginExtensionType.PANEL,
};
const ProjectOverview = () => {
    const { projectQueryResult, componentListQueryResult, selectedProject } = useGlobalState();
    if (projectQueryResult?.isLoading) {
        return _jsx(FullPageLoader, {});
    }
    if (projectQueryResult?.error) {
        return _jsx(PresetErrorPage, { preset: "500" });
    }
    if (!projectQueryResult?.data) {
        return _jsx(PresetErrorPage, { preset: "404" });
    }
    return (_jsx(PageLayout, { testId: "overview-page", title: getResourceDisplayName(selectedProject), description: getResourceDescription(selectedProject), actions: _jsx(IconButton, { size: "small", onClick: () => {
                projectQueryResult.refetch();
                componentListQueryResult.refetch();
            }, children: _jsx(Rotate, { disabled: !projectQueryResult.isFetching, children: _jsx(RefreshIcon, { fontSize: "inherit" }) }) }), children: _jsx(PanelExtensionMounter, { extentionPoint: projectOverviewMainExtensionPoint }) }));
};
export default ProjectOverview;
//# sourceMappingURL=ProjectOverview.js.map