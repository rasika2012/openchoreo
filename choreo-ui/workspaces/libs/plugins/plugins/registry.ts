import { type PluginManifest } from "../types";
import { overview } from "./overview";

// Static registry for plugins known at build time
export const registry: PluginManifest[] = [
    overview,
];
