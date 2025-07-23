import { type PluginManifest } from "@open-choreo/plugin-core";
import {
  componentOverviewNavigation,
  organizationOverviewNavigation,
  projectOverviewNavigation,
} from "./NavItems";
import { organizationOverview } from "./OrganizationOverview";
import { projectOverview } from "./ProjectOverview";
import { componentOverview } from "./ComponentOverview";

export {
  organizationOverviewMainExtensionPoint,
  organizationOverviewSecondaryExtensionPoint,
} from "./OrgOverview";
export {
  projectOverviewMainExtensionPoint,
  projectOverviewSecondaryExtensionPoint,
} from "./ProjectOverview";
export { componentOverviewMainExtensionPoint } from "./ComponentOverview";

export const overviewPlugin = {
  name: "Overview",
  description:
    "Overview shows summary of the organization, project and component.",
  extensions: [
    componentOverviewNavigation,
    organizationOverviewNavigation,
    projectOverviewNavigation,
    organizationOverview,
    projectOverview,
    componentOverview,
  ],
} as PluginManifest;
