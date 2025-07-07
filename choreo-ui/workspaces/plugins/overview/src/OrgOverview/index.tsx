import {
  type PluginExtension,
  rootExtensionPoints,
} from "@open-choreo/plugin-core";
import React from "react";
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
