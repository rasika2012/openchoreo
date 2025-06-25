import { type ComponentType, type LazyExoticComponent } from "react";

export enum PluginExtensionType {
    NAVIGATION = "nav-item",
    PAGE = "page",
    PANEL = "panel"
}
export interface PluginManifest  {
    name: string;
    description: string;
    extensions: PluginExtension[];
}

export interface PluginExtensionSubmenu {
    name: string;
    icon: ComponentType<{className?: string}> | LazyExoticComponent<ComponentType<{className?: string}>>;
    iconSelected: ComponentType<{className?: string}> | LazyExoticComponent<ComponentType<{className?: string}>>;
    path?: string;
}

export interface PluginExtensionNavigation  {
    type: PluginExtensionType.NAVIGATION;
    name: string;
    icon: ComponentType<{className?: string}> | LazyExoticComponent<ComponentType<{className?: string}>>;
    iconSelected: ComponentType<{className?: string}> | LazyExoticComponent<ComponentType<{className?: string}>>;
    path?: string;
    submenu?: PluginExtensionSubmenu[];
}

export interface PluginExtensionPage {
    type: PluginExtensionType.PAGE;
    path: string;
    component: ComponentType<{}> | LazyExoticComponent<ComponentType<{}>>;
}

export interface PluginExtensionPanel {
    type: PluginExtensionType.PANEL;
    mountPointId: string;
    key: string;
    component: ComponentType<{}> | LazyExoticComponent<ComponentType<{}>>;
}

export type PluginExtension = PluginExtensionNavigation | PluginExtensionPage | PluginExtensionPanel;
