import { useMemo } from "react";
import { PluginExtensionPanel, PluginExtensionPoint } from "../../plugin-types";
import { usePluginRegistry } from "../../Providers";

export function usePanelExtentions(extensionPoint: PluginExtensionPoint) {
  const pluginRegistry = usePluginRegistry();
  const entries: PluginExtensionPanel[] = useMemo(
    () =>
      pluginRegistry.flatMap(
        (plugin) =>
          plugin.extensions.filter(
            (entry) =>
              entry.extensionPoint.id === extensionPoint.id &&
              entry.extensionPoint.type === extensionPoint.type,
          ) as PluginExtensionPanel[],
      ),
    [pluginRegistry, extensionPoint],
  );
  return entries;
}
