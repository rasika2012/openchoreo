import {
  BasePathPatterns,
  type PluginExtension,
  PluginExtensionType,
  rootExtensionPoints,
} from "@open-choreo/plugin-core";

import {
  Level,
  MenuComponentsFilledIcon,
  MenuComponentsIcon,
} from "@open-choreo/design-system";
import React from "react";

export const componentListNavigation: PluginExtension = {
  extentionPoint: rootExtensionPoints.projectNavigation,
  icon: () => <MenuComponentsIcon fontSize="inherit" />,
  iconSelected: () => <MenuComponentsFilledIcon fontSize="inherit" />,
  path: "/components",
  name: "Components",
  pathPattern: BasePathPatterns.PROJECT_LEVEL + "/components",
};
