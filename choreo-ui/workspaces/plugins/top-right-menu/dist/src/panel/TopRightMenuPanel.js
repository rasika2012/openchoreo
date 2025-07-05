import { jsx as _jsx } from "react/jsx-runtime";
import { Box, Toggler, useChoreoTheme } from "@open-choreo/design-system";
import { useColorMode } from "@open-choreo/choreo-context";
const TopRightMenuPanel = () => {
    const theme = useChoreoTheme();
    const { colorMode, setColorMode } = useColorMode();
    return (_jsx(Box, { display: "flex", flexDirection: "row", gap: theme.spacing(1), padding: theme.spacing(0, 2), alignItems: "center", height: "100%", children: _jsx(Toggler, { onClick: () => {
                setColorMode(colorMode === "light" ? "dark" : "light");
            }, checked: colorMode === "light", color: "primary", size: "small" }, colorMode) }));
};
export default TopRightMenuPanel;
//# sourceMappingURL=TopRightMenuPanel.js.map