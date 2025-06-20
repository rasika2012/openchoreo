// Plugin loader utility for dynamic imports
// Usage: const plugin = await loadPlugin('overview');

export async function loadPlugin(pluginName: string) {
    // Assumes each plugin has an index.ts exporting the manifest
    return (await import(`./${pluginName}`)).default;
} 