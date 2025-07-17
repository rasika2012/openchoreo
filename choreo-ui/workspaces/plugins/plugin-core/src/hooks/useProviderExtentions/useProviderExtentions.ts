import { useMemo } from "react";
import {
  PluginExtensionProvider,
  PluginExtensionPoint,
} from "../../plugin-types";
import { usePluginRegistry } from "../../Providers";

export function useExtentionProviders(extensionPoint: PluginExtensionPoint) {
  const pluginRegistry = usePluginRegistry();
  const entries: PluginExtensionProvider[] = useMemo(
    () =>
      pluginRegistry.flatMap(
        (plugin) =>
          plugin.extensions.filter(
            (entry) =>
              entry.extensionPoint.id === extensionPoint.id &&
              entry.extensionPoint.type === extensionPoint.type,
          ) as PluginExtensionProvider[],
      ),
    [pluginRegistry, extensionPoint],
  );
  return entries;
}
