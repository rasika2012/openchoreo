import { jsx as _jsx } from "react/jsx-runtime";
import { FullPageLoader, PresetErrorPage } from "@open-choreo/common-views";
import { useSelectedComponent } from "@open-choreo/choreo-context";
import { PanelExtensionMounter, PluginExtensionType, } from "@open-choreo/plugin-core";
import { ResourcePageLayout } from "@open-choreo/resource-views";
export const componentOverviewMainExtensionPoint = {
    id: "component-overview-page-body",
    type: PluginExtensionType.PANEL,
};
const ComponentOverview = () => {
    const { data: selectedComponent, isLoading, isError, isFetching, } = useSelectedComponent();
    if (isLoading) {
        return _jsx(FullPageLoader, {});
    }
    if (isError) {
        return _jsx(PresetErrorPage, { preset: "500" });
    }
    if (!selectedComponent) {
        return _jsx(PresetErrorPage, { preset: "404" });
    }
    return (_jsx(ResourcePageLayout, { resource: selectedComponent?.data, testId: "component-overview-page", isRefreshing: isFetching, isLoading: isLoading, children: _jsx(PanelExtensionMounter, { extentionPoint: componentOverviewMainExtensionPoint }) }));
};
export default ComponentOverview;
//# sourceMappingURL=ComponentOverview.js.map