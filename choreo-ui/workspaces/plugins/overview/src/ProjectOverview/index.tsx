import {
  type PluginExtension,
  rootExtensionPoints,
} from "@open-choreo/plugin-core";
import React from "react";
import ProjectOverview from "./ProjectOverview";
export { projectOverviewMainExtensionPoint } from "./ProjectOverview";

export const projectOverview: PluginExtension = {
  extentionPoint: rootExtensionPoints.projectLevelPage,
  component: ProjectOverview,
  pathPattern: "",
};
