import { Level } from "@open-choreo/design-system";
import {
  type PluginExtension,
  PluginExtensionType,
  PathsPatterns,
} from "@open-choreo/plugin-core";
import React from "react";
const OverviewPage = React.lazy(() => import("./OverviewPage"));

export const page: PluginExtension = {
  type: PluginExtensionType.PAGE,
  extentionPointId: Level.ORGANIZATION,
  component: OverviewPage,
  pathPattern: "/overview",
};

export const page2: PluginExtension = {
  type: PluginExtensionType.PAGE,
  extentionPointId: Level.PROJECT,
  pathPattern: "/home/3",
  component: () => <div>Home 2</div>,
};
