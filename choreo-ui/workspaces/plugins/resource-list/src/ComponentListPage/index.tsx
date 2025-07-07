import { Level } from "@open-choreo/design-system";
import {
  type PluginExtension,
  PluginExtensionType,
  rootExtensionPoints,
} from "@open-choreo/plugin-core";
import React from "react";
const ComponentList = React.lazy(() => import("./ComponentList"));

export const componentList: PluginExtension = {
  extentionPoint: rootExtensionPoints.projectLevelPage,
  component: ComponentList,
  pathPattern: "/components",
};
