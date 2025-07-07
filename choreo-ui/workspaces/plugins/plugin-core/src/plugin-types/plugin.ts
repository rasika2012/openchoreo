import { Level } from "@open-choreo/design-system";
import { ReactNode, type ComponentType, type LazyExoticComponent } from "react";

export enum PluginExtensionType {
  NAVIGATION = "nav-item",
  PAGE = "page",
  PANEL = "panel",
  PROVIDER = "provider",
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
  icon:
    | ComponentType<{ className?: string }>
    | LazyExoticComponent<ComponentType<{ className?: string }>>;
  iconSelected:
    | ComponentType<{ className?: string }>
    | LazyExoticComponent<ComponentType<{ className?: string }>>;
  path?: string;
  pathPattern?: string;
}

export interface PluginExtensionNavigation {
  extentionPoint: PluginExtensionPoint;
  name: string;
  icon:
    | ComponentType<{ className?: string }>
    | LazyExoticComponent<ComponentType<{ className?: string }>>;
  iconSelected:
    | ComponentType<{ className?: string }>
    | LazyExoticComponent<ComponentType<{ className?: string }>>;
  path?: string;
  pathPattern?: string;
  submenu?: PluginExtensionSubmenu[];
}

export interface PluginExtensionPage {
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
  component:
    | ComponentType<{ children: ReactNode }>
    | LazyExoticComponent<ComponentType<{ children: ReactNode }>>;
}

export const rootExtensionPoints = {
  globalProvider: {
    id: "global",
    type: PluginExtensionType.PROVIDER,
  },
  componentLevelPage: {
    id: "component-level-page",
    type: PluginExtensionType.PAGE,
  },
  projectLevelPage: {
    id: "project-level-page",
    type: PluginExtensionType.PAGE,
  },
  orgLevelPage: {
    id: "org-level-page",
    type: PluginExtensionType.PAGE,
  },
  globalPage: {
    id: "global-page",
    type: PluginExtensionType.PAGE,
  },
  headerLeft: {
    id: "header-left",
    type: PluginExtensionType.PANEL,
  },
  headerRight: {
    id: "header-right",
    type: PluginExtensionType.PANEL,
  },
  sidebarRight: {
    id: "sidebar-right",
    type: PluginExtensionType.PANEL,
  },
  componentNavigation: {
    id: "component-navigation",
    type: PluginExtensionType.NAVIGATION,
  },
  projectNavigation: {
    id: "project-navigation",
    type: PluginExtensionType.NAVIGATION,
  },
  orgNavigation: {
    id: "org-navigation",
    type: PluginExtensionType.NAVIGATION,
  },
};

export type PluginExtension =
  | PluginExtensionNavigation
  | PluginExtensionPage
  | PluginExtensionPanel
  | PluginExtensionProvider;
