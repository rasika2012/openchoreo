import { Box } from "@open-choreo/design-system";
import { usePanelExtentions } from "../../hooks"
import React from "react";
import { PluginExtensionType, PluginManifest } from "../../../plugin-types";

export interface ExtentionMounterCommonProps {
    extentionPointId: string;
}

export function ExtentionMounter(props: ExtentionMounterCommonProps) {
    const { extentionPointId } = props;
    const extentions = usePanelExtentions(extentionPointId);
    return <Box testId={`extention-mounter-${extentionPointId}`}>
        {
            extentions.map(entry => (
                <entry.component key={entry.key} />
            ))
        }
    </Box>;
}