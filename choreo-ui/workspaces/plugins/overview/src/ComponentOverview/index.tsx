import {
  type PluginExtension,
  rootExtensionPoints,
} from "@open-choreo/plugin-core";
import React from "react";
import ComponentOverview from "./ComponentOverview";
export { componentOverviewExtensionPoint } from "./ComponentOverview";

export const componentOverview: PluginExtension = {
  extentionPoint: rootExtensionPoints.componentLevelPage,
  component: ComponentOverview,
  pathPattern: "",
};
