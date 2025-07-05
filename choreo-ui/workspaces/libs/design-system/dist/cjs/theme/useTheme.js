"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useMediaQuery = useMediaQuery;
exports.useChoreoTheme = useChoreoTheme;
const styles_1 = require("@mui/material/styles");
const material_1 = require("@mui/material");
function useMediaQuery(query, side = 'up') {
    const theme = (0, styles_1.useTheme)();
    return (0, material_1.useMediaQuery)(theme.breakpoints[side](query));
}
function useChoreoTheme() {
    const theme = (0, styles_1.useTheme)();
    return {
        pallet: theme.palette,
        shadows: theme.shadows,
        typography: theme.typography,
        zIndex: theme.zIndex,
        breakpoints: theme.breakpoints,
        components: theme.components,
        transitions: theme.transitions,
        spacing: theme.spacing,
        shape: theme.shape,
    };
}
//# sourceMappingURL=useTheme.js.map