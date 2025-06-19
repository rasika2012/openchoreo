import { type PluginEntry, PluginEntryType } from "../../../types";
// import React from "react";
// const MenuOverview = React.lazy(() => import("./assets/MenuOverview"));
// const MenuOverviewFilled = React.lazy(() => import("./assets/MenuOverviewFilled"));
import MenuOverview from "./assets/MenuOverview";
import MenuOverviewFilled from "./assets/MenuOverviewFilled";

export const navigation: PluginEntry = {
    type: PluginEntryType.NAVIGATION,
    path: "/overview/navigation",
    icon: () => <MenuOverview fontSize="inherit" />,
    iconSelected: () => <MenuOverviewFilled fontSize="inherit" />,
    name: "Overview",
};