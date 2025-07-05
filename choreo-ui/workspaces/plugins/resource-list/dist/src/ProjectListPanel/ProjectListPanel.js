import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { FullPageLoader, PresetErrorPage, ResourceList, } from "@open-choreo/common-views";
import { useGlobalState } from "@open-choreo/choreo-context";
import { PanelExtensionMounter, PluginExtensionType, useHomePath, } from "@open-choreo/plugin-core";
import { useMemo, useState } from "react";
import { Box, SearchBar } from "@open-choreo/design-system";
import { useIntl } from "react-intl";
export const organizationOverviewActionsExtensionPoint = {
    id: "org-overview-page-actions",
    type: PluginExtensionType.PANEL,
};
export const ProjectListPanel = () => {
    const { projectListQueryResult } = useGlobalState();
    const homePath = useHomePath();
    const [search, setSearch] = useState("");
    const { formatMessage } = useIntl();
    const projects = useMemo(() => projectListQueryResult?.data?.data?.items
        ?.filter((item) => item.name.toLowerCase().includes(search.toLowerCase()))
        .map((item) => ({
        id: item.name,
        name: item.name,
        description: item?.description || "",
        type: item.status,
        lastUpdated: item.createdAt,
        href: `${homePath}/project/${item.name}`,
    })), [projectListQueryResult?.data?.data.items, search, homePath]);
    if (projectListQueryResult?.isLoading) {
        return _jsx(FullPageLoader, {});
    }
    if (projectListQueryResult?.error) {
        return _jsx(PresetErrorPage, { preset: "500" });
    }
    if (!projectListQueryResult?.data) {
        return _jsx(PresetErrorPage, { preset: "404" });
    }
    return (_jsxs(Box, { display: "flex", flexDirection: "column", gap: 16, children: [_jsxs(Box, { display: "flex", alignItems: "center", justifyContent: "space-between", gap: 4, children: [_jsx(Box, { flexGrow: 1, children: _jsx(SearchBar, { inputValue: search, color: "secondary", bordered: true, onChange: (value) => setSearch(value), testId: "search-bar", placeholder: formatMessage({
                                id: "overview.orgOverview.searchPlaceholder",
                                defaultMessage: "Search projects",
                            }) }) }), _jsx(PanelExtensionMounter, { extentionPoint: organizationOverviewActionsExtensionPoint })] }), _jsx(ResourceList, { resources: projects })] }));
};
//# sourceMappingURL=ProjectListPanel.js.map