import {
  type PluginExtension,
  rootExtensionPoints,
} from "@open-choreo/plugin-core";
import ComponentOverview from "./ComponentOverview";
export { componentOverviewMainExtensionPoint } from "./ComponentOverview";

export const componentOverview: PluginExtension = {
  extentionPoint: rootExtensionPoints.componentLevelPage,
  component: ComponentOverview,
  pathPattern: "",
};
