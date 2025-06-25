import { type ComponentType, type LazyExoticComponent } from "react";

export enum PluginExtensionType {
    NAVIGATION = "nav-item",
    PAGE = "page"
}
export interface PluginManifest  {
    name: string;
    description: string;
    extensions: PluginExtension[];
}

interface PluginExtensionSubmenu {
    name: string;
    icon: ComponentType<{className?: string}> | LazyExoticComponent<ComponentType<{className?: string}>>;
    iconSelected: ComponentType<{className?: string}> | LazyExoticComponent<ComponentType<{className?: string}>>;
    path?: string;
}

interface PluginExtensionNavigation  {
    type: PluginExtensionType.NAVIGATION;
    name: string;
    icon: ComponentType<{className?: string}> | LazyExoticComponent<ComponentType<{className?: string}>>;
    iconSelected: ComponentType<{className?: string}> | LazyExoticComponent<ComponentType<{className?: string}>>;
    path?: string;
    submenu?: PluginExtensionSubmenu[];
}

interface PluginExtensionPage {
    type: PluginExtensionType.PAGE;
    path: string;
    component: ComponentType<{}> | LazyExoticComponent<ComponentType<{}>>;
}

export type PluginExtension = PluginExtensionNavigation | PluginExtensionPage;
