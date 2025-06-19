import { type PluginManifest } from "../../types";
import {navigation} from "./navigation";
import {page} from "./page";

export const overview: PluginManifest = {
    name: "Overview",
    description: "Overview plugin",
    version: "1.0.0",
    author: "Open Choreo",
    license: "MIT",
    entries: [navigation, page],
};