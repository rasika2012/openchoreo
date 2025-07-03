import { Level } from "@open-choreo/design-system";
import {
  type PluginExtension,
  PluginExtensionType,
} from "@open-choreo/plugin-core";
import React from "react";
const ComponentListPanel = React.lazy(() => import("./ComponentListPanel"));

export const componentListPanel: PluginExtension = {
  type: PluginExtensionType.PANEL,
  extentionPointId: "component-list-page-body",
  component: ComponentListPanel,
  key: "component-list-panel",
};

export const projectOverviewComponentListPanel: PluginExtension = {
  type: PluginExtensionType.PANEL,
  extentionPointId: "project-overview-page-body",
  component: ComponentListPanel,
  key: "component-list-project-overview-panel",
};
