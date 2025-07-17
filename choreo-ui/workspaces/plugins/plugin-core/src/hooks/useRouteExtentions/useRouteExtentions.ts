import React, { useMemo } from "react";
import { PluginExtensionPoint, PluginExtensionRoute } from "../../plugin-types";
import { usePluginRegistry } from "../../Providers";

export function useRouteExtentions(extensionPoint: PluginExtensionPoint) {
  const pluginRegistry = usePluginRegistry();
  return useMemo(() => {
    return pluginRegistry.flatMap(
      (plugin) =>
        plugin.extensions.filter(
          (entry) =>
            entry.extensionPoint.id === extensionPoint.id &&
            entry.extensionPoint.type === extensionPoint.type,
        ) as PluginExtensionRoute[],
    );
  }, [pluginRegistry, extensionPoint]);
}
