"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StyledAvatar = void 0;
const material_1 = require("@mui/material");
exports.StyledAvatar = (0, material_1.styled)(material_1.Avatar)(({ theme, variant = 'circular', color = 'primary', disabled = false, height, width, }) => {
    const getBorderRadius = () => {
        switch (variant) {
            case 'circular':
                return '50%';
            case 'rounded':
                return '8px';
            case 'square':
                return '0px';
            default:
                return '50%';
        }
    };
    const getBackgroundColor = () => {
        switch (color) {
            case 'primary':
                return theme.palette.primary.main;
            case 'secondary':
                return theme.palette.secondary.light;
            case 'error':
                return theme.palette.error.main;
            case 'warning':
                return theme.palette.warning.main;
            case 'info':
                return theme.palette.info.main;
            case 'success':
                return theme.palette.success.main;
            default:
                return theme.palette.primary.main;
        }
    };
    const getColor = () => {
        switch (color) {
            case 'primary':
                return theme.palette.primary.contrastText;
            case 'secondary':
                return theme.palette.primary.light;
            case 'error':
                return theme.palette.error.contrastText;
            case 'warning':
                return theme.palette.warning.contrastText;
            case 'info':
                return theme.palette.info.contrastText;
            case 'success':
                return theme.palette.success.contrastText;
            default:
                return theme.palette.primary.contrastText;
        }
    };
    return {
        borderRadius: getBorderRadius(),
        backgroundColor: getBackgroundColor(),
        opacity: disabled ? 0.5 : 1,
        color: getColor(),
        cursor: disabled ? 'not-allowed' : 'pointer',
        textAlign: 'center',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width,
        height,
        boxShadow: theme.shadows[1],
        pointerEvents: disabled ? 'none' : 'auto',
    };
});
//# sourceMappingURL=Avatar.styled.js.map