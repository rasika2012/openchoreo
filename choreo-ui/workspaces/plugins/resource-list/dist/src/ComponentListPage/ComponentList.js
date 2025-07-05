import { jsx as _jsx } from "react/jsx-runtime";
import { PageLayout, } from "@open-choreo/common-views";
import { useGlobalState } from "@open-choreo/choreo-context";
import { PanelExtensionMounter, PluginExtensionType, } from "@open-choreo/plugin-core";
import { useIntl } from "react-intl";
import { RefreshIcon, Rotate, IconButton } from "@open-choreo/design-system";
export const componentListMainExtensionPoint = {
    id: "component-list-page-body",
    type: PluginExtensionType.PANEL,
};
const ComponentList = () => {
    const { formatMessage } = useIntl();
    const { componentListQueryResult } = useGlobalState();
    return (_jsx(PageLayout, { testId: "component-list", actions: _jsx(IconButton, { size: "small", onClick: () => {
                componentListQueryResult.refetch();
            }, children: _jsx(Rotate, { disabled: !componentListQueryResult.isFetching, children: _jsx(RefreshIcon, { fontSize: "inherit" }) }) }), title: formatMessage({
            id: "componentListPage.title",
            defaultMessage: "Components List",
        }), children: _jsx(PanelExtensionMounter, { extentionPoint: componentListMainExtensionPoint }) }));
};
export default ComponentList;
//# sourceMappingURL=ComponentList.js.map