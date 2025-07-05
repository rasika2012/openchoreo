import { jsx as _jsx } from "react/jsx-runtime";
import { Box } from "@open-choreo/design-system";
import { usePanelExtentions } from "../../hooks";
export function PanelExtensionMounter(props) {
    const { extentionPoint } = props;
    const extentions = usePanelExtentions(extentionPoint);
    return (_jsx(Box, { testId: `extention-mounter-${extentionPoint.id}`, children: extentions.map((entry) => (_jsx(entry.component, {}, entry.key))) }));
}
//# sourceMappingURL=PanelExtensionMounter.js.map