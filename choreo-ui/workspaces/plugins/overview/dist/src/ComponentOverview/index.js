import { coreExtensionPoints, } from "@open-choreo/plugin-core";
import ComponentOverview from "./ComponentOverview";
export { componentOverviewMainExtensionPoint } from "./ComponentOverview";
export const componentOverview = {
    extentionPoint: coreExtensionPoints.componentLevelPage,
    component: ComponentOverview,
    pathPattern: "",
};
//# sourceMappingURL=index.js.map