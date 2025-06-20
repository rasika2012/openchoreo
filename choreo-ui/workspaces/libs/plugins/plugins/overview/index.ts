import { type PluginManifest } from "../../types";

import {navigation} from "./nav-items";
import {page} from "./pages";
import {navigation as navigationsOthers} from "./nav-items-others";

export default {
    name: "Overview",
    description: "Overview plugin",
    entries: [navigation, page, navigationsOthers],
} as PluginManifest;