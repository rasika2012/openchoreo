import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { FullPageLoader, PresetErrorPage } from "@open-choreo/common-views";
import { useSelectedOrganization } from "@open-choreo/choreo-context";
import { PanelExtensionMounter, PluginExtensionType, } from "@open-choreo/plugin-core";
import { Box, GridContainer, GridItem, useChoreoTheme, } from "@open-choreo/design-system";
import { ResourcePageLayout } from "@open-choreo/resource-views";
export const organizationOverviewMainExtensionPoint = {
    id: "org-overview-page-body",
    type: PluginExtensionType.PANEL,
};
export const organizationOverviewSecondaryExtensionPoint = {
    id: "org-overview-side-panels",
    type: PluginExtensionType.PANEL,
};
const OrgOverview = () => {
    const { data: selectedOrganization, isLoading, isError, isFetching, refetch, } = useSelectedOrganization();
    const theme = useChoreoTheme();
    if (isLoading) {
        return _jsx(FullPageLoader, {});
    }
    if (isError) {
        return _jsx(PresetErrorPage, { preset: "500" });
    }
    if (!selectedOrganization) {
        return _jsx(PresetErrorPage, { preset: "404" });
    }
    return (_jsx(ResourcePageLayout, { resource: selectedOrganization?.data, testId: "org-overview-page", isRefreshing: isFetching, isLoading: isLoading, onRefresh: () => {
            refetch();
        }, children: _jsxs(GridContainer, { children: [_jsx(GridItem, { size: { xs: 12, sm: 12, md: 8, lg: 9, xl: 10 }, children: _jsx(PanelExtensionMounter, { extentionPoint: organizationOverviewMainExtensionPoint }) }), _jsx(GridItem, { size: { xs: 12, sm: 12, md: 4, lg: 3, xl: 1 }, children: _jsx(Box, { display: "flex", flexDirection: "row", gap: theme.spacing(2), children: _jsx(PanelExtensionMounter, { extentionPoint: organizationOverviewSecondaryExtensionPoint }) }) })] }) }));
};
export default OrgOverview;
//# sourceMappingURL=OrgOverview.js.map