import { Level } from "@open-choreo/design-system";
import {
  type PluginExtension,
  PluginExtensionType,
} from "@open-choreo/plugin-core";
import React from "react";
const OrgOverview = React.lazy(() => import("./OrgOverview"));

export const orgOverview: PluginExtension = {
  type: PluginExtensionType.PAGE,
  extentionPointId: Level.ORGANIZATION,
  component: OrgOverview,
  pathPattern: "/",
};