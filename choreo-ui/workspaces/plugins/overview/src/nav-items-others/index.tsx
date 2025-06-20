// import { HomeFilled } from "@mui/icons-material";
import { type PluginExtension, PluginExtensionType } from "@open-choreo/plugin-core";
import React from "react";
import { MenuObserveFilledIcon, MenuObserveIcon, MenuOverviewFilledIcon, MenuOverviewIcon } from "@open-choreo/design-system";

export const navigation: PluginExtension = {
    type: PluginExtensionType.NAVIGATION,
    icon: () => <MenuOverviewIcon fontSize="inherit" />,
    iconSelected: () => <MenuOverviewFilledIcon fontSize="inherit" />,
    name: "Overview",
    submenu: [
        {
            icon: () => <MenuOverviewIcon fontSize="inherit" />,
            iconSelected: () => <MenuOverviewFilledIcon fontSize="inherit" />,
            name: "Overview 4",
            path: "/overview/5",
        },
        {
            icon: () => <MenuObserveIcon fontSize="inherit" />,
            iconSelected: () => <MenuObserveFilledIcon fontSize="inherit" />,
            name: "Overview 5",
            path: "/overview/6",
        },
    ],
};