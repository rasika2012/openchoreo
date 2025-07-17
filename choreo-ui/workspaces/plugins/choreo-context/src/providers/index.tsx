import {
  type PluginExtension,
  coreExtensionPoints,
} from "@open-choreo/plugin-core";
import ApiClientProvider from "./ApiClientProvider";

export const provider: PluginExtension = {
  extensionPoint: coreExtensionPoints.globalProvider,
  key: "choreo-context",
  component: ApiClientProvider,
};
