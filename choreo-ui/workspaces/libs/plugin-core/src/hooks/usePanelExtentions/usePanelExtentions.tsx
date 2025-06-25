import { NavItemExpandableSubMenu } from "@open-choreo/design-system";
import React, { useMemo } from "react";
import { PluginExtensionType, PluginManifest, PluginExtensionPanel } from "../../../plugin-types";

export function usePanelExtentions(pluginRegistry: PluginManifest[], mountPointId: string) {
  const entries: PluginExtensionPanel[] = useMemo(() => pluginRegistry.flatMap(plugin => plugin.extensions.filter(entry => entry.type === PluginExtensionType.PANEL && entry.mountPointId === mountPointId) as PluginExtensionPanel[]), [pluginRegistry]);
  return entries;
}