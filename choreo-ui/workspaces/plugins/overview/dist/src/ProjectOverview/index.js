import { coreExtensionPoints, } from "@open-choreo/plugin-core";
import ProjectOverview from "./ProjectOverview";
export { projectOverviewMainExtensionPoint, projectOverviewSecondaryExtensionPoint, } from "./ProjectOverview";
export const projectOverview = {
    extentionPoint: coreExtensionPoints.projectLevelPage,
    component: ProjectOverview,
    pathPattern: "",
};
//# sourceMappingURL=index.js.map