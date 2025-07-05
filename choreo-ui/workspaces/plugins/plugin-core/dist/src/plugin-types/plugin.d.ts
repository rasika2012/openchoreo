import { ReactNode, type ComponentType, type LazyExoticComponent } from "react";
export declare enum PluginExtensionType {
    NAVIGATION = "nav-item",
    ROUTE = "route",
    PANEL = "panel",
    PROVIDER = "provider"
}
export interface PluginExtensionPoint {
    id: string;
    type: PluginExtensionType;
}
export interface PluginManifest {
    name: string;
    description: string;
    extensions: PluginExtension[];
    extentionPoints: PluginExtensionPoint[];
}
export interface PluginExtensionSubmenu {
    name: string;
    icon: ComponentType<{
        className?: string;
    }> | LazyExoticComponent<ComponentType<{
        className?: string;
    }>>;
    iconSelected: ComponentType<{
        className?: string;
    }> | LazyExoticComponent<ComponentType<{
        className?: string;
    }>>;
    path?: string;
    pathPattern?: string;
}
export interface PluginExtensionNavigation {
    extentionPoint: PluginExtensionPoint;
    name: string;
    icon: ComponentType<{
        className?: string;
    }> | LazyExoticComponent<ComponentType<{
        className?: string;
    }>>;
    iconSelected: ComponentType<{
        className?: string;
    }> | LazyExoticComponent<ComponentType<{
        className?: string;
    }>>;
    path?: string;
    pathPattern?: string;
    submenu?: PluginExtensionSubmenu[];
}
export interface PluginExtensionRoute {
    extentionPoint: PluginExtensionPoint;
    pathPattern: string;
    component: ComponentType | LazyExoticComponent<ComponentType>;
}
export interface PluginExtensionPanel {
    extentionPoint: PluginExtensionPoint;
    key: string;
    component: ComponentType | LazyExoticComponent<ComponentType>;
}
export interface PluginExtensionProvider {
    extentionPoint: PluginExtensionPoint;
    key: string;
    component: ComponentType<{
        children: ReactNode;
    }> | LazyExoticComponent<ComponentType<{
        children: ReactNode;
    }>>;
}
export declare const coreExtensionPoints: {
    globalProvider: {
        id: string;
        type: PluginExtensionType;
    };
    componentLevelPage: {
        id: string;
        type: PluginExtensionType;
    };
    projectLevelPage: {
        id: string;
        type: PluginExtensionType;
    };
    orgLevelPage: {
        id: string;
        type: PluginExtensionType;
    };
    globalPage: {
        id: string;
        type: PluginExtensionType;
    };
    headerLeft: {
        id: string;
        type: PluginExtensionType;
    };
    headerRight: {
        id: string;
        type: PluginExtensionType;
    };
    sidebarRight: {
        id: string;
        type: PluginExtensionType;
    };
    componentNavigation: {
        id: string;
        type: PluginExtensionType;
    };
    projectNavigation: {
        id: string;
        type: PluginExtensionType;
    };
    orgNavigation: {
        id: string;
        type: PluginExtensionType;
    };
    footer: {
        id: string;
        type: PluginExtensionType;
    };
};
export type PluginExtension = PluginExtensionNavigation | PluginExtensionRoute | PluginExtensionPanel | PluginExtensionProvider;
