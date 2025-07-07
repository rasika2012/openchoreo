import {
  type PluginExtension,
  rootExtensionPoints,
} from "@open-choreo/plugin-core";
import React from "react";
const OverviewPage = React.lazy(() => import("./TopLevelSelector"));

export const panel: PluginExtension = {
  extentionPoint: rootExtensionPoints.headerLeft,
  key: "top-level-selector",
  component: OverviewPage,
};
