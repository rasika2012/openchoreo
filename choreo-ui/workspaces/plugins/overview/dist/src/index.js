import { componentOverviewNavigation, orgOverviewNavigation, projectOverviewNavigation, } from "./NavItems";
import { orgOverview } from "./OrgOverview";
import { projectOverview } from "./ProjectOverview";
import { componentOverview } from "./ComponentOverview";
export { organizationOverviewMainExtensionPoint, organizationOverviewSecondaryExtensionPoint, } from "./OrgOverview";
export { projectOverviewMainExtensionPoint, projectOverviewSecondaryExtensionPoint, } from "./ProjectOverview";
export { componentOverviewMainExtensionPoint } from "./ComponentOverview";
export const overviewPlugin = {
    name: "Overview",
    description: "Overview shows summary of the organization, project and component.",
    extensions: [
        componentOverviewNavigation,
        orgOverviewNavigation,
        projectOverviewNavigation,
        orgOverview,
        projectOverview,
        componentOverview,
    ],
};
//# sourceMappingURL=index.js.map