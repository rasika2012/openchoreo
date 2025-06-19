import { type PluginEntry, PluginEntryType } from "../../../types";
// import React from "react";
// const OverviewPage = React.lazy(() => import("./OverviewPage"));
import OverviewPage from "./OverviewPage";

export const page: PluginEntry = {
    type: PluginEntryType.PAGE,
    path: "/overview",
    component: OverviewPage,
};