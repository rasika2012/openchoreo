import { useMemo } from "react";
import { PluginExtensionPanel, PluginExtensionPoint } from "../../plugin-types";
import { usePluginRegistry } from "../../Providers";

export function usePanelExtentions(extentionPoint: PluginExtensionPoint) {
  const pluginRegistry = usePluginRegistry();
  const entries: PluginExtensionPanel[] = useMemo(
    () =>
      pluginRegistry.flatMap(
        (plugin) =>
          plugin.extensions.filter(
            (entry) =>
              entry.extentionPoint.id === extentionPoint.id &&
              entry.extentionPoint.type === extentionPoint.type,
          ) as PluginExtensionPanel[],
      ),
    [pluginRegistry, extentionPoint],
  );
  return entries;
}
