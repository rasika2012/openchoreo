import {
  type PluginExtension,
  rootExtensionPoints,
} from "@open-choreo/plugin-core";
import ApiClientProvider from "./ApiClientProvider";

export const provider: PluginExtension = {
  extentionPoint: rootExtensionPoints.globalProvider,
  key: "api-client",
  component: ApiClientProvider,
};
