import { jsx as _jsx } from "react/jsx-runtime";
import { FullPageLoader, PageLayout, PresetErrorPage, } from "@open-choreo/common-views";
import { useComponentList } from "@open-choreo/choreo-context";
import { PanelExtensionMounter, PluginExtensionType, useOrgHandle, useProjectHandle, } from "@open-choreo/plugin-core";
import { useIntl } from "react-intl";
import { RefreshIcon, Rotate, IconButton } from "@open-choreo/design-system";
export const componentListMainExtensionPoint = {
    id: "component-list-page-body",
    type: PluginExtensionType.PANEL,
};
const ComponentList = () => {
    const { formatMessage } = useIntl();
    const orgHandle = useOrgHandle();
    const projectHandle = useProjectHandle();
    const { isLoading, isError, isFetching, refetch } = useComponentList(orgHandle, projectHandle);
    if (isLoading) {
        return _jsx(FullPageLoader, {});
    }
    if (isError) {
        return _jsx(PresetErrorPage, { preset: "500" });
    }
    return (_jsx(PageLayout, { testId: "component-list", actions: _jsx(IconButton, { size: "small", testId: "component-list-page-refresh", onClick: () => {
                refetch();
            }, children: _jsx(Rotate, { disabled: !isFetching, children: _jsx(RefreshIcon, { fontSize: "inherit" }) }) }), title: formatMessage({
            id: "componentListPage.title",
            defaultMessage: "Components List",
        }), children: _jsx(PanelExtensionMounter, { extentionPoint: componentListMainExtensionPoint }) }));
};
export default ComponentList;
//# sourceMappingURL=ComponentList.js.map