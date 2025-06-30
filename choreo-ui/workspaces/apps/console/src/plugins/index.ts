import type { PluginManifest } from '@open-choreo/plugin-core';
import { apiClientPlugin } from '@open-choreo/api-client';

// Lazy load all plugins
const overviewPlugin = () => import('@open-choreo/plugin-overview').then(module => module.overviewPlugin);
const levelSelectorPlugin = () => import('@open-choreo/plugin-top-level-selector').then(module => module.levelSelectorPlugin);
const topRightMenuPlugin = () => import('@open-choreo/top-right-menu').then(module => module.topRightMenuPlugin);
// const apiClientPlugin = () => import('@open-choreo/api-client').then(module => module.apiClientPlugin);

// Export the plugin registry as a function that returns promises
export const getPluginRegistry = async (): Promise<PluginManifest[]> => {
  const [overview, levelSelector, topRightMenu] = await Promise.all([
    overviewPlugin(),
    levelSelectorPlugin(),
    topRightMenuPlugin()
  ]);
  
  return [overview, levelSelector, topRightMenu, apiClientPlugin];
};

// For backward compatibility, export a synchronous version that loads plugins on demand
export const pluginRegistry: PluginManifest[] = [];
 