import { jsx as _jsx } from "react/jsx-runtime";
import { useMemo } from "react";
import { usePluginRegistry } from "../../Providers";
export function useMainNavExtentions(extentionPoint, rootPath) {
    const pluginRegistry = usePluginRegistry();
    const navigationEntries = useMemo(() => pluginRegistry.flatMap((plugin) => plugin.extensions
        .filter((entry) => entry.extentionPoint.id === extentionPoint.id &&
        entry.extentionPoint.type === extentionPoint.type)
        .map((entry) => ({
        title: entry.name,
        id: entry.name,
        icon: _jsx(entry.icon, {}),
        selectedIcon: _jsx(entry.iconSelected, {}),
        href: rootPath + entry.path,
        pathPattern: entry.pathPattern,
        subMenuItems: entry.submenu?.map((submenu) => ({
            title: submenu.name,
            id: submenu.name,
            icon: _jsx(submenu.icon, {}),
            selectedIcon: _jsx(submenu.iconSelected, {}),
            href: rootPath + entry.path + submenu.path,
            pathPattern: submenu.pathPattern,
        })),
    }))), [pluginRegistry, extentionPoint, rootPath]);
    return navigationEntries;
}
//# sourceMappingURL=useMainNavExtentions.js.map