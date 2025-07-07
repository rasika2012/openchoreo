import {
  type PluginExtension,
  rootExtensionPoints,
} from "@open-choreo/plugin-core";
import React from "react";
const ComponentListPanel = React.lazy(() => import("./ComponentListPanel"));
import { projectOverviewExtensionPoint } from "@open-choreo/plugin-overview";

export const componentListPanel: PluginExtension = {
  extentionPoint: projectOverviewExtensionPoint,
  component: ComponentListPanel,
  key: "component-list-panel",
};

export const projectOverviewComponentListPanel: PluginExtension = {
  extentionPoint: rootExtensionPoints.projectLevelPage,
  component: ComponentListPanel,
  key: "component-list-project-overview-panel",
};
