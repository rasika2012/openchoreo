import { jsx as _jsx } from "react/jsx-runtime";
import { FullPageLoader, PresetErrorPage } from "@open-choreo/common-views";
import { useComponentList } from "@open-choreo/choreo-context";
import { useHomePath, useOrgHandle, useProjectHandle, } from "@open-choreo/plugin-core";
import { useMemo } from "react";
import { ResourceTable } from "@open-choreo/resource-views";
import { getComponentType, getResourceCreatedAt, getResourceDescription, getResourceDisplayName, getResourceName, } from "@open-choreo/definitions";
const ComponentListPanel = () => {
    const orgHandle = useOrgHandle();
    const projectHandle = useProjectHandle();
    const { data: components, isLoading, isError, refetch, } = useComponentList(orgHandle, projectHandle);
    const homePath = useHomePath();
    const componentList = useMemo(() => components?.data?.items?.map((item) => ({
        id: getResourceName(item),
        name: getResourceDisplayName(item),
        description: getResourceDescription(item),
        type: getComponentType(item),
        lastUpdated: new Date(getResourceCreatedAt(item)),
        href: `${homePath}/component/${getResourceName(item)}`,
    })), [components, homePath]);
    if (isLoading) {
        return _jsx(FullPageLoader, {});
    }
    if (isError) {
        return _jsx(PresetErrorPage, { preset: "500" });
    }
    if (!components) {
        return _jsx(PresetErrorPage, { preset: "404" });
    }
    return (_jsx(ResourceTable, { resources: componentList || [], resourceKind: "component", onRefresh: () => {
            refetch();
        }, isLoading: isLoading, enableAvatar: true }));
};
export default ComponentListPanel;
//# sourceMappingURL=ComponentListPanel.js.map