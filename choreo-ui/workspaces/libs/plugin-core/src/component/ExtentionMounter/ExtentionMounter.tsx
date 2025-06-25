import { Box } from "@open-choreo/design-system";
import { usePanelExtentions } from "../../hooks"
import React from "react";
import { PluginManifest } from "../../../plugin-types";

export interface ExtentionMounterProps {
    mountPointId: string;
    pluginRegistry: PluginManifest[];
}

export function ExtentionMounter(props: ExtentionMounterProps) {
    const { mountPointId, pluginRegistry } = props;
    const extentions = usePanelExtentions(pluginRegistry, mountPointId);
    return <Box testId={`extention-mounter-${mountPointId}`}>
        {
            extentions.map(entry => (
                <entry.component key={entry.key} />
            ))
        }
    </Box>;
}