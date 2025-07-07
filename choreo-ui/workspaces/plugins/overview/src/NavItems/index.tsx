import {
  BasePathPatterns,
  type PluginExtension,
  rootExtensionPoints,
} from "@open-choreo/plugin-core";
import {
  MenuOverviewFilledIcon,
  MenuOverviewIcon,
} from "@open-choreo/design-system";

export const projectOverviewNavigation: PluginExtension = {
  extentionPoint: rootExtensionPoints.projectNavigation,
  icon: () => <MenuOverviewIcon fontSize="inherit" />,
  iconSelected: () => <MenuOverviewFilledIcon fontSize="inherit" />,
  path: "",
  name: "Overview",
  pathPattern: BasePathPatterns.PROJECT_LEVEL,
};

export const componentOverviewNavigation: PluginExtension = {
  extentionPoint: rootExtensionPoints.componentNavigation,
  icon: () => <MenuOverviewIcon fontSize="inherit" />,
  iconSelected: () => <MenuOverviewFilledIcon fontSize="inherit" />,
  path: "",
  name: "Overview",
  pathPattern: BasePathPatterns.COMPONENT_LEVEL,
};

export const orgOverviewNavigation: PluginExtension = {
  extentionPoint: rootExtensionPoints.orgNavigation,
  icon: () => <MenuOverviewIcon fontSize="inherit" />,
  iconSelected: () => <MenuOverviewFilledIcon fontSize="inherit" />,
  path: "",
  name: "Overview",
  pathPattern: BasePathPatterns.ORG_LEVEL,
};
