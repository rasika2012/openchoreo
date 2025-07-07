import { type PluginManifest } from "@open-choreo/plugin-core";
import {
  componentOverviewNavigation,
  orgOverviewNavigation,
  projectOverviewNavigation,
} from "./NavItems";
import { orgOverview } from "./OrgOverview";
import { projectOverview } from "./ProjectOverview";
import { componentOverview } from "./ComponentOverview";

export { orgOverviewExtensionPoint } from "./OrgOverview";
export { projectOverviewExtensionPoint } from "./ProjectOverview";
export { componentOverviewExtensionPoint } from "./ComponentOverview";

export const overviewPlugin = {
  name: "Overview",
  description: "Overview plugin",
  extensions: [
    componentOverviewNavigation,
    orgOverviewNavigation,
    projectOverviewNavigation,
    orgOverview,
    projectOverview,
    componentOverview,
  ],
} as PluginManifest;
