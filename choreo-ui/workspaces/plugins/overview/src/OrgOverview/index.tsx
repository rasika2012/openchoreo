import {
  type PluginExtension,
  rootExtensionPoints,
} from "@open-choreo/plugin-core";
import OrgOverview from "./OrgOverview";
export {
  organizationOverviewMainExtensionPoint,
  organizationOverviewActions,
} from "./OrgOverview";
export const orgOverview: PluginExtension = {
  extentionPoint: rootExtensionPoints.orgLevelPage,
  component: OrgOverview,
  pathPattern: "",
};
