import { useMemo } from "react";
import { usePluginRegistry } from "../../Providers";
export function useExtentionProviders(extentionPoint) {
    const pluginRegistry = usePluginRegistry();
    const entries = useMemo(() => pluginRegistry.flatMap((plugin) => plugin.extensions.filter((entry) => entry.extentionPoint.id === extentionPoint.id &&
        entry.extentionPoint.type === extentionPoint.type)), [pluginRegistry, extentionPoint]);
    return entries;
}
//# sourceMappingURL=useProviderExtentions.js.map