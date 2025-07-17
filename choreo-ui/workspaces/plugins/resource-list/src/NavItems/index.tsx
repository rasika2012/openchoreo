import {
  BasePathPatterns,
  type PluginExtension,
  coreExtensionPoints,
} from "@open-choreo/plugin-core";

import {
  MenuComponentsFilledIcon,
  MenuComponentsIcon,
} from "@open-choreo/design-system";

export const componentListNavigation: PluginExtension = {
  extensionPoint: coreExtensionPoints.projectNavigation,
  icon: () => <MenuComponentsIcon fontSize="inherit" />,
  iconSelected: () => <MenuComponentsFilledIcon fontSize="inherit" />,
  path: "/components",
  name: "Components",
  pathPattern: BasePathPatterns.PROJECT_LEVEL + "/components",
};
