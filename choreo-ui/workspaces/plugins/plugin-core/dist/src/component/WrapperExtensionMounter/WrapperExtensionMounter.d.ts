import React from "react";
import { PluginExtensionPoint } from "../../plugin-types";
export interface WrapperExtensionMounterProps {
    extentionPoint: PluginExtensionPoint;
    children: React.ReactNode;
}
export declare function WrapperExtensionMounter(props: WrapperExtensionMounterProps): import("react/jsx-runtime").JSX.Element;
