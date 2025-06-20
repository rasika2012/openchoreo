// import { HomeFilled } from "@mui/icons-material";
import { type PluginEntry, PluginEntryType } from "../../../types";
import React from "react";
const MenuOverview = React.lazy(() => import("./assets/MenuOverview"));
const MenuOverviewFilled = React.lazy(() => import("./assets/MenuOverviewFilled"));
// import MenuOverview from "./assets/MenuOverview";
// import MenuOverviewFilled from "./assets/MenuOverviewFilled";
import { MenuObserveFilledIcon, MenuObserveIcon } from "@open-choreo/design-system";

export const navigation: PluginEntry = {
    type: PluginEntryType.NAVIGATION,
    icon: () => <MenuOverview fontSize="inherit" />,
    iconSelected: () => <MenuOverviewFilled fontSize="inherit" />,
    name: "Overview",
    submenu: [
        {
            icon: () => <MenuOverview fontSize="inherit" />,
            iconSelected: () => <MenuOverviewFilled fontSize="inherit" />,
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