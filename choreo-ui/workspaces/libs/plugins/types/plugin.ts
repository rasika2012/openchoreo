import { type ComponentType, type LazyExoticComponent } from "react";

export enum PluginEntryType {
    NAVIGATION = "navigation",
    PAGE = "page"
}

export interface PluginManifest  {
    name: string;
    description: string;
    version: string;
    author: string;
    license: string;
    entries: PluginEntry[];
}

interface PluginEntryNavigation  {
    type: PluginEntryType.NAVIGATION;
    name: string;
    icon: ComponentType<{className?: string}> | LazyExoticComponent<ComponentType<{className?: string}>>;
    iconSelected: ComponentType<{className?: string}> | LazyExoticComponent<ComponentType<{className?: string}>>;
    path: string;
}

interface PluginEntryPage {
    type: PluginEntryType.PAGE;
    path: string;
    component: ComponentType<{}> | LazyExoticComponent<ComponentType<{}>>;
}

export type PluginEntry = PluginEntryNavigation | PluginEntryPage;
