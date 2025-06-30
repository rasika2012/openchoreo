import {
    type PluginExtension,
    PluginExtensionType,
} from "@open-choreo/plugin-core";
import { MenuHomeFilledIcon, MenuHomeIcon, MenuObserveFilledIcon, MenuObserveIcon, MenuOverviewFilledIcon, MenuOverviewIcon } from "@open-choreo/design-system";

export const navigation: PluginExtension = {
    type: PluginExtensionType.NAVIGATION,
    icon: () => <MenuHomeIcon fontSize="inherit" />,
    iconSelected: () => <MenuHomeFilledIcon fontSize="inherit" />,
    path: "",
    name: "Overview",
};
