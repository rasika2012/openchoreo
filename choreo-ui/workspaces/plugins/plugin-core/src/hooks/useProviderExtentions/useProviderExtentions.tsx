import { NavItemExpandableSubMenu } from "@open-choreo/design-system";
import React, { useMemo } from "react";
import { PluginExtensionType, PluginManifest, PluginExtensionProvider } from "../../../plugin-types";
import { usePluginRegistry } from "../../Providers";

export function useExtentionProviders(extentionPointId: string) {
  const pluginRegistry = usePluginRegistry();
  const entries: PluginExtensionProvider[] = useMemo(() => pluginRegistry.flatMap(plugin => plugin.extensions.filter(entry => entry.type === PluginExtensionType.PROVIDER && entry.extentionPointId === extentionPointId) as PluginExtensionProvider[]), [pluginRegistry]);
  return entries;
}