import React from "react";
import { PluginManifest } from "../../plugin-types";
export interface PluginProviderValue {
    pluginRegistry: PluginManifest[];
    basePath: string;
}
export interface PluginProviderProps {
    children: React.ReactNode;
    pluginRegistry: PluginManifest[];
    basePath?: string;
}
export declare function PluginProvider({ pluginRegistry, children, basePath, }: PluginProviderProps): import("react/jsx-runtime").JSX.Element;
export declare function usePluginRegistry(): PluginManifest[];
export declare function useBasePath(): string;
