import { type PluginManifest } from "@open-choreo/plugin-core";

import { topLevelSelector } from "./TopLevelSelector";

export const levelSelectorPlugin = {
  name: "Top Level Selector",
  description: "Top Level Selector to select cell architecture levels.",
  extensions: [topLevelSelector],
} as PluginManifest;
