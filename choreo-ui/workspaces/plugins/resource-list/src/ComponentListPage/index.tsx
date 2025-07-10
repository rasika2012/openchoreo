import {
  type PluginExtension,
  rootExtensionPoints,
} from "@open-choreo/plugin-core";
import ComponentList from "./ComponentList";

export const componentList: PluginExtension = {
  extentionPoint: rootExtensionPoints.projectLevelPage,
  component: ComponentList,
  pathPattern: "/components",
};
