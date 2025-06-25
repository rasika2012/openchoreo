import { type PluginManifest } from "@open-choreo/plugin-core";

import {panel} from "./panel";

export const LevelSelectorPlugin = {
    name: "Top Level Selector",
    description: "Top Level Selector",
    extensions: [panel],
} as PluginManifest;