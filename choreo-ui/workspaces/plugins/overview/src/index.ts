import { type PluginManifest } from "@open-choreo/plugin-core";

import { navigation, navigation2 } from "./nav-items";
import { page } from "./pages";

export const overviewPlugin = {
  name: "Overview",
  description: "Overview plugin",
  extensions: [navigation, navigation2, page],
} as PluginManifest;
