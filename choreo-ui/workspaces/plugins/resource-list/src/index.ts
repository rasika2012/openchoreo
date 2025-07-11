import { type PluginManifest } from "@open-choreo/plugin-core";
import { componentList } from "./ComponentListPage";
import { componentListNavigation } from "./NavItems";
import {
  componentListPanel,
  projectOverviewComponentListPanel,
} from "./ComponentListPanel";

export const resourceListingPlugin = {
  name: "Resource Listing",
  description: "Resource Listing Plugin lists the resources in the project",
  extensions: [
    componentList,
    componentListNavigation,
    componentListPanel,
    projectOverviewComponentListPanel,
  ],
} as PluginManifest;
