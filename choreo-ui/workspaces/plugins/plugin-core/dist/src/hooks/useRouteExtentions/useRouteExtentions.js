import { useMemo } from "react";
import { usePluginRegistry } from "../../Providers";
export function useRouteExtentions(extentionPoint) {
    const pluginRegistry = usePluginRegistry();
    return useMemo(() => {
        return pluginRegistry.flatMap((plugin) => plugin.extensions.filter((entry) => entry.extentionPoint.id === extentionPoint.id &&
            entry.extentionPoint.type === extentionPoint.type));
    }, [pluginRegistry, extentionPoint]);
}
//# sourceMappingURL=useRouteExtentions.js.map