import { Level } from "@open-choreo/design-system";
import {
  type PluginExtension,
  PluginExtensionType,
} from "@open-choreo/plugin-core";
import React from "react";

const ComponentOverview = React.lazy(() => import("./ComponentOverview"));


export const componentOverview: PluginExtension = {
  type: PluginExtensionType.PAGE,
  extentionPointId: Level.COMPONENT,
  component: ComponentOverview,
  pathPattern: "",
};