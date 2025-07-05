import { jsx as _jsx } from "react/jsx-runtime";
import { createContext, useContext } from "react";
const PluginContext = createContext({
    pluginRegistry: [],
    basePath: "localhost:3000",
});
export function PluginProvider({ pluginRegistry, children, basePath, }) {
    return (_jsx(PluginContext.Provider, { value: { pluginRegistry, basePath }, children: children }));
}
export function usePluginRegistry() {
    const { pluginRegistry } = useContext(PluginContext);
    return pluginRegistry;
}
export function useBasePath() {
    const { basePath } = useContext(PluginContext);
    return basePath;
}
//# sourceMappingURL=PluginProvider.js.map