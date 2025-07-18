import {
  BasePathPatterns,
  type PluginExtension,
  coreExtensionPoints,
} from "@open-choreo/plugin-core";
import {
  MenuOverviewFilledIcon,
  MenuOverviewIcon,
} from "@open-choreo/design-system";

export const projectOverviewNavigation: PluginExtension = {
  extensionPoint: coreExtensionPoints.projectNavigation,
  icon: () => <MenuOverviewIcon fontSize="inherit" />,
  iconSelected: () => <MenuOverviewFilledIcon fontSize="inherit" />,
  path: "",
  name: "Overview",
  pathPattern: BasePathPatterns.PROJECT_LEVEL,
};

export const componentOverviewNavigation: PluginExtension = {
  extensionPoint: coreExtensionPoints.componentNavigation,
  icon: () => <MenuOverviewIcon fontSize="inherit" />,
  iconSelected: () => <MenuOverviewFilledIcon fontSize="inherit" />,
  path: "",
  name: "Overview",
  pathPattern: BasePathPatterns.COMPONENT_LEVEL,
};

export const organizationOverviewNavigation: PluginExtension = {
  extensionPoint: coreExtensionPoints.orgNavigation,
  icon: () => <MenuOverviewIcon fontSize="inherit" />,
  iconSelected: () => <MenuOverviewFilledIcon fontSize="inherit" />,
  path: "",
  name: "Overview",
  pathPattern: BasePathPatterns.ORG_LEVEL,
};
