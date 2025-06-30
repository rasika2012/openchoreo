import { Level } from "@open-choreo/design-system";
import {
  type PluginExtension,
  PluginExtensionType,
} from "@open-choreo/plugin-core";
import React from "react";
const ProjectOverview = React.lazy(() => import("./ProjectOverview"));

export const projectOverview: PluginExtension = {
  type: PluginExtensionType.PAGE,
  extentionPointId: Level.PROJECT,
  component: ProjectOverview,
  pathPattern: "/",
};