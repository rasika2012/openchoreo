import { jsx as _jsx } from "react/jsx-runtime";
import { FullPageLoader, PresetErrorPage, ResourceTable, } from "@open-choreo/common-views";
import { useGlobalState } from "@open-choreo/choreo-context";
import { useHomePath } from "@open-choreo/plugin-core";
const ComponentListPanel = () => {
    const { componentListQueryResult } = useGlobalState();
    const homePath = useHomePath();
    if (componentListQueryResult?.isLoading) {
        return _jsx(FullPageLoader, {});
    }
    if (componentListQueryResult?.error) {
        return _jsx(PresetErrorPage, { preset: "500" });
    }
    if (!componentListQueryResult?.data) {
        return _jsx(PresetErrorPage, { preset: "404" });
    }
    const components = componentListQueryResult?.data?.data?.items?.map((item) => ({
        id: item.name,
        name: item.name,
        description: item.type,
        type: item.type,
        lastUpdated: item.createdAt,
        href: `${homePath}/component/${item.name}`,
    }));
    return _jsx(ResourceTable, { resources: components || [] });
};
export default ComponentListPanel;
//# sourceMappingURL=ComponentListPanel.js.map