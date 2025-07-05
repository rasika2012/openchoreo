import { jsx as _jsx } from "react/jsx-runtime";
import { FullPageLoader, PageLayout, PresetErrorPage, } from "@open-choreo/common-views";
import { useGlobalState } from "@open-choreo/choreo-context";
import { PanelExtensionMounter, PluginExtensionType, } from "@open-choreo/plugin-core";
import { getResourceDescription, getResourceDisplayName, } from "@open-choreo/definitions";
import { RefreshIcon, Rotate, IconButton } from "@open-choreo/design-system";
export const componentOverviewMainExtensionPoint = {
    id: "component-overview-page-body",
    type: PluginExtensionType.PANEL,
};
const ComponentOverview = () => {
    const { componentQueryResult, selectedComponent } = useGlobalState();
    if (componentQueryResult?.isLoading) {
        return _jsx(FullPageLoader, {});
    }
    if (componentQueryResult?.error) {
        return _jsx(PresetErrorPage, { preset: "500" });
    }
    if (!componentQueryResult?.data) {
        return _jsx(PresetErrorPage, { preset: "404" });
    }
    return (_jsx(PageLayout, { testId: "overview-page", title: getResourceDisplayName(selectedComponent), description: getResourceDescription(selectedComponent), actions: _jsx(IconButton, { size: "small", onClick: () => {
                componentQueryResult.refetch();
            }, children: _jsx(Rotate, { disabled: !componentQueryResult.isFetching, children: _jsx(RefreshIcon, { fontSize: "inherit" }) }) }), children: _jsx(PanelExtensionMounter, { extentionPoint: componentOverviewMainExtensionPoint }) }));
};
export default ComponentOverview;
//# sourceMappingURL=ComponentOverview.js.map