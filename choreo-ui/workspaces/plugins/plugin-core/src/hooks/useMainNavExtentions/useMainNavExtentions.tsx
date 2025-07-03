import { Level, NavItemExpandableSubMenu } from "@open-choreo/design-system";
import React, { useMemo } from "react";
import { PluginExtensionNavigation, PluginExtensionType } from "../../plugin-types";
import { usePluginRegistry } from "../../Providers";

export function useMainNavExtentions(extentionPointId: string | Level, rootPath: string) {
  const pluginRegistry = usePluginRegistry();
  const navigationEntries: NavItemExpandableSubMenu[] = useMemo(
    () =>
      pluginRegistry.flatMap((plugin) =>
        plugin.extensions
          .filter((entry) => entry.type === PluginExtensionType.NAVIGATION && (entry.extentionPointId === extentionPointId))
          .map(
            (entry: PluginExtensionNavigation) =>
              ({
                title: entry.name,
                id: entry.name,
                icon: <entry.icon />,
                selectedIcon: <entry.iconSelected />,
                href: rootPath + entry.path,
                pathPattern: entry.pathPattern,
                subMenuItems: entry.submenu?.map((submenu) => ({
                  title: submenu.name,
                  id: submenu.name,
                  icon: <submenu.icon />,
                  selectedIcon: <submenu.iconSelected />,
                  href: rootPath + entry.path + submenu.path,
                  pathPattern: submenu.pathPattern,
                })),
              }) as NavItemExpandableSubMenu,
          ),
      ),
    [pluginRegistry],
  );

  return navigationEntries;
}
