import { useMemo } from "react";
import {
  PluginExtensionProvider,
  PluginExtensionPoint,
} from "../../plugin-types";
import { usePluginRegistry } from "../../Providers";

export function useExtentionProviders(extentionPoint: PluginExtensionPoint) {
  const pluginRegistry = usePluginRegistry();
  const entries: PluginExtensionProvider[] = useMemo(
    () =>
      pluginRegistry.flatMap(
        (plugin) =>
          plugin.extensions.filter(
            (entry) =>
              entry.extentionPoint.id === extentionPoint.id &&
              entry.extentionPoint.type === extentionPoint.type,
          ) as PluginExtensionProvider[],
      ),
    [pluginRegistry, extentionPoint],
  );
  return entries;
}
