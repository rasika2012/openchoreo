import {
    BasePathPatterns,
    PathsPatterns,
    type PluginExtension,
    PluginExtensionType,
} from "@open-choreo/plugin-core";
import { Level, MenuHomeFilledIcon, MenuHomeIcon, MenuObserveFilledIcon, MenuObserveIcon, MenuOverviewFilledIcon, MenuOverviewIcon } from "@open-choreo/design-system";

export const projectOverviewNavigation: PluginExtension = {
    type: PluginExtensionType.NAVIGATION,
    icon: () => <MenuHomeIcon fontSize="inherit" />,
    iconSelected: () => <MenuHomeFilledIcon fontSize="inherit" />,
    path: "",
    name: "Overview",
    pathPattern: BasePathPatterns.PROJECT_LEVEL,
    extentionPointId: Level.PROJECT,
};

export const componentOverviewNavigation: PluginExtension = {
    type: PluginExtensionType.NAVIGATION,
    icon: () => <MenuHomeIcon fontSize="inherit" />,
    iconSelected: () => <MenuHomeFilledIcon fontSize="inherit" />,
    path: "",
    name: "Overview",
    pathPattern: BasePathPatterns.COMPONENT_LEVEL,
    extentionPointId: Level.COMPONENT,
};

export const orgOverviewNavigation: PluginExtension = {
    type: PluginExtensionType.NAVIGATION,
    icon: () => <MenuHomeIcon fontSize="inherit" />,
    iconSelected: () => <MenuHomeFilledIcon fontSize="inherit" />,
    path: "",
    name: "Overview",
    pathPattern: BasePathPatterns.ORG_LEVEL,
    extentionPointId: Level.ORGANIZATION,
};
