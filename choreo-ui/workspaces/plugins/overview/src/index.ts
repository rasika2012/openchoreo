import { type PluginManifest } from "@open-choreo/plugin-core";
import { navigation } from "./nav-items";
import { orgOverview } from "./OrgOverview";
import { projectOverview } from "./ProjectOverview";

export const overviewPlugin = {
  name: "Overview",
  description: "Overview plugin",
  extensions: [navigation, orgOverview, projectOverview],
} as PluginManifest;
