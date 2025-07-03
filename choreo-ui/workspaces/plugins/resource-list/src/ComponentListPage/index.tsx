import { Level } from "@open-choreo/design-system";
import {
  type PluginExtension,
  PluginExtensionType,
} from "@open-choreo/plugin-core";
import React from "react";
const ComponentList = React.lazy(() => import("./ComponentList"));

export const componentList: PluginExtension = {
  type: PluginExtensionType.PAGE,
  extentionPointId: Level.PROJECT,
  component: ComponentList,
  pathPattern: "/components",
};
