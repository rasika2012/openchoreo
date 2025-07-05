import { jsx as _jsx } from "react/jsx-runtime";
import { BasePathPatterns, coreExtensionPoints, } from "@open-choreo/plugin-core";
import { MenuOverviewFilledIcon, MenuOverviewIcon, } from "@open-choreo/design-system";
export const projectOverviewNavigation = {
    extentionPoint: coreExtensionPoints.projectNavigation,
    icon: () => _jsx(MenuOverviewIcon, { fontSize: "inherit" }),
    iconSelected: () => _jsx(MenuOverviewFilledIcon, { fontSize: "inherit" }),
    path: "",
    name: "Overview",
    pathPattern: BasePathPatterns.PROJECT_LEVEL,
};
export const componentOverviewNavigation = {
    extentionPoint: coreExtensionPoints.componentNavigation,
    icon: () => _jsx(MenuOverviewIcon, { fontSize: "inherit" }),
    iconSelected: () => _jsx(MenuOverviewFilledIcon, { fontSize: "inherit" }),
    path: "",
    name: "Overview",
    pathPattern: BasePathPatterns.COMPONENT_LEVEL,
};
export const orgOverviewNavigation = {
    extentionPoint: coreExtensionPoints.orgNavigation,
    icon: () => _jsx(MenuOverviewIcon, { fontSize: "inherit" }),
    iconSelected: () => _jsx(MenuOverviewFilledIcon, { fontSize: "inherit" }),
    path: "",
    name: "Overview",
    pathPattern: BasePathPatterns.ORG_LEVEL,
};
//# sourceMappingURL=index.js.map