import { Box } from "@open-choreo/design-system";
import { usePanelExtentions } from "../../hooks";
import { PluginExtensionPoint } from "../../plugin-types";

export interface PanelExtensionMounterCommonProps {
  extensionPoint: PluginExtensionPoint;
}

export function PanelExtensionMounter(props: PanelExtensionMounterCommonProps) {
  const { extensionPoint } = props;
  const extentions = usePanelExtentions(extensionPoint);
  return (
    <Box testId={`extention-mounter-${extensionPoint.id}`}>
      {extentions.map((entry) => (
        <entry.component key={entry.key} />
      ))}
    </Box>
  );
}
