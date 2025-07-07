import {
  type PluginExtension,
  rootExtensionPoints,
} from "@open-choreo/plugin-core";
import React from "react";
const TopRightMenuPanel = React.lazy(() => import("./TopRightMenuPanel"));

export const panel: PluginExtension = {
  extentionPoint: rootExtensionPoints.headerRight,
  key: "toprightmenu",
  component: TopRightMenuPanel,
};
