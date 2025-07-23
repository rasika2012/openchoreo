import { type PluginManifest } from "@open-choreo/plugin-core";
import { componentList } from "./ComponentListPage";
import { componentListNavigation } from "./NavItems";
import {
  componentListPanel,
  projectOverviewComponentListPanel,
} from "./ComponentListPanel";
import { projectListPanel } from "./ProjectListPanel";
import { componentSummary } from "./ComponentSummary";

export const componentListingPlugin = {
  name: "Component Listing Plugin",
  description: "List down selected project's components",
  extensions: [
    componentList,
    componentListNavigation,
    componentListPanel,
    projectOverviewComponentListPanel,
    projectListPanel,
    componentSummary,
  ],
} as PluginManifest;
