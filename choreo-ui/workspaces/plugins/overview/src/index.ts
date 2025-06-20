import { type PluginManifest } from "@open-choreo/plugin-core";

import {navigation} from "./nav-items";
import {page} from "./pages";
import {navigation as navigationsOthers} from "./nav-items-others";

export const overviewPlugin = {
    name: "Overview",
    description: "Overview plugin",
    extensions: [navigation, page, navigationsOthers],
} as PluginManifest;