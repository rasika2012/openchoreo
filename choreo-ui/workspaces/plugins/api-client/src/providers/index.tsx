import {
  type PluginExtension,
  PluginExtensionType,
} from "@open-choreo/plugin-core";
import ApiClientProvider from "./ApiClientProvider";

export const provider: PluginExtension = {
  type: PluginExtensionType.PROVIDER,
  extentionPointId: "global",
  key: "api-client",
  component: ApiClientProvider,
};
