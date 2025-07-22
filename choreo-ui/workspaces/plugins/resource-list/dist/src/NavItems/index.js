import { jsx as _jsx } from "react/jsx-runtime";
import { BasePathPatterns, coreExtensionPoints, } from "@open-choreo/plugin-core";
import { MenuComponentsFilledIcon, MenuComponentsIcon, } from "@open-choreo/design-system";
export const componentListNavigation = {
    extentionPoint: coreExtensionPoints.projectNavigation,
    icon: () => _jsx(MenuComponentsIcon, { fontSize: "inherit" }),
    iconSelected: () => _jsx(MenuComponentsFilledIcon, { fontSize: "inherit" }),
    path: "/components",
    name: "Components",
    pathPattern: BasePathPatterns.PROJECT_LEVEL + "/components",
};
//# sourceMappingURL=index.js.map