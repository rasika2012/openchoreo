import { jsx as _jsx } from "react/jsx-runtime";
import { FullPageLoader, PageLayout, PresetErrorPage, } from "@open-choreo/common-views";
import { useGlobalState } from "@open-choreo/choreo-context";
import { PanelExtensionMounter, PluginExtensionType, } from "@open-choreo/plugin-core";
import { IconButton, RefreshIcon, Rotate, } from "@open-choreo/design-system";
import { getResourceDescription, getResourceDisplayName, } from "@open-choreo/definitions";
export const organizationOverviewMainExtensionPoint = {
    id: "org-overview-page-body",
    type: PluginExtensionType.PANEL,
};
const OrgOverview = () => {
    const { projectListQueryResult, selectedOrganization, organizationListQueryResult, } = useGlobalState();
    if (organizationListQueryResult?.isLoading) {
        return _jsx(FullPageLoader, {});
    }
    if (organizationListQueryResult?.error) {
        return _jsx(PresetErrorPage, { preset: "500" });
    }
    if (!organizationListQueryResult?.data) {
        return _jsx(PresetErrorPage, { preset: "404" });
    }
    return (_jsx(PageLayout, { testId: "overview-page", title: getResourceDisplayName(selectedOrganization), description: getResourceDescription(selectedOrganization), actions: _jsx(IconButton, { size: "small", onClick: () => {
                projectListQueryResult.refetch();
            }, children: _jsx(Rotate, { disabled: !projectListQueryResult.isFetching, children: _jsx(RefreshIcon, { fontSize: "inherit" }) }) }), children: _jsx(PanelExtensionMounter, { extentionPoint: organizationOverviewMainExtensionPoint }) }));
};
export default OrgOverview;
//# sourceMappingURL=OrgOverview.js.map