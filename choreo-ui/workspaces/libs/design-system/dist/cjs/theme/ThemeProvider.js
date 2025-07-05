"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ThemeProvider = ThemeProvider;
const jsx_runtime_1 = require("react/jsx-runtime");
const material_1 = require("@mui/material");
const styles_1 = require("@mui/material/styles");
const theme_json_1 = __importDefault(require("./theme.json"));
const react_1 = __importDefault(require("react"));
require("../fonts/fonts.css");
require("./initialLoader.css");
function ThemeProvider(props) {
    const { children, mode = 'light', customPalette } = props;
    const darkTheme = react_1.default.useMemo(() => {
        const typography = {
            ...theme_json_1.default.typography,
            overline: {
                ...theme_json_1.default.typography.overline,
                textTransform: 'none',
            },
        };
        return (0, material_1.createTheme)({
            typography,
            zIndex: theme_json_1.default.zIndex,
            palette: {
                ...theme_json_1.default.colorSchemes.dark.palette,
                ...customPalette?.dark,
                mode: 'dark',
            },
            shadows: theme_json_1.default.dark.shadows,
        });
    }, [customPalette]);
    const lightTheme = react_1.default.useMemo(() => {
        const typography = {
            ...theme_json_1.default.typography,
            overline: {
                ...theme_json_1.default.typography.overline,
                textTransform: 'none',
            },
        };
        return (0, material_1.createTheme)({
            typography,
            zIndex: theme_json_1.default.zIndex,
            palette: {
                ...theme_json_1.default.colorSchemes.light.palette,
                ...customPalette?.light,
                mode: 'light',
            },
            shadows: theme_json_1.default.light.shadows,
        });
    }, [customPalette]);
    return ((0, jsx_runtime_1.jsx)(styles_1.ThemeProvider, { theme: mode === 'dark' ? darkTheme : lightTheme, children: children }));
}
//# sourceMappingURL=ThemeProvider.js.map