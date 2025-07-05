import { coreExtensionPoints, } from "@open-choreo/plugin-core";
import OrgOverview from "./OrgOverview";
export { organizationOverviewMainExtensionPoint } from "./OrgOverview";
export const orgOverview = {
    extentionPoint: coreExtensionPoints.orgLevelPage,
    component: OrgOverview,
    pathPattern: "",
};
//# sourceMappingURL=index.js.map