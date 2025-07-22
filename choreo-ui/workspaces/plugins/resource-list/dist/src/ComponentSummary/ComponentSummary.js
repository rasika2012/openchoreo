import { jsx as _jsx } from "react/jsx-runtime";
import { useMemo } from "react";
import { useHomePath, useOrgHandle, useProjectHandle, } from "@open-choreo/plugin-core";
import { useComponentList } from "@open-choreo/choreo-context";
import { getComponentType, getResourceCreatedAt, getResourceDescription, getResourceDisplayName, getResourceName, } from "@open-choreo/definitions";
import { FullPageLoader, PresetErrorPage } from "@open-choreo/common-views";
import { ComponentTypes } from "@open-choreo/resource-views";
const ComponentSummary = () => {
    const orgHandle = useOrgHandle();
    const projectHandle = useProjectHandle();
    const { data: components, isLoading, isError, refetch, } = useComponentList(orgHandle, projectHandle);
    const homePath = useHomePath();
    const componentList = useMemo(() => components?.data?.items?.map((item) => ({
        id: getResourceName(item),
        name: getResourceDisplayName(item),
        description: getResourceDescription(item),
        type: getComponentType(item),
        webAppType: getComponentType(item),
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
    return (_jsx(ComponentTypes, { components: componentList || [], heading: "Component Types" }));
};
export default ComponentSummary;
//# sourceMappingURL=ComponentSummary.js.map