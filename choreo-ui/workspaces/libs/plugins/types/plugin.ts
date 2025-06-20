import { type ComponentType, type LazyExoticComponent } from "react";

export enum PluginEntryType {
    NAVIGATION = "nav-item",
    PAGE = "page"
}
export interface PluginManifest  {
    name: string;
    description: string;
    entries: PluginEntry[];
}

interface PluginEntrySubmenu {
    name: string;
    icon: ComponentType<{className?: string}> | LazyExoticComponent<ComponentType<{className?: string}>>;
    iconSelected: ComponentType<{className?: string}> | LazyExoticComponent<ComponentType<{className?: string}>>;
    path?: string;
}

interface PluginEntryNavigation  {
    type: PluginEntryType.NAVIGATION;
    name: string;
    icon: ComponentType<{className?: string}> | LazyExoticComponent<ComponentType<{className?: string}>>;
    iconSelected: ComponentType<{className?: string}> | LazyExoticComponent<ComponentType<{className?: string}>>;
    path?: string;
    submenu?: PluginEntrySubmenu[];
}

interface PluginEntryPage {
    type: PluginEntryType.PAGE;
    path: string;
    component: ComponentType<{}> | LazyExoticComponent<ComponentType<{}>>;
}

export type PluginEntry = PluginEntryNavigation | PluginEntryPage;
