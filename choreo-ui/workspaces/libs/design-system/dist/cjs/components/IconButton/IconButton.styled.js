"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StyledIconButton = void 0;
const styled_1 = __importDefault(require("@emotion/styled"));
const material_1 = require("@mui/material");
const styles_1 = require("@mui/material/styles");
const getFocusShadow = (theme) => `0 ${theme.spacing(0.125)} ${theme.spacing(0.75)} ${theme.spacing(0.25)} ${(0, styles_1.alpha)(theme.palette.common.black, 0.1)}`;
exports.StyledIconButton = (0, styled_1.default)(material_1.IconButton, {
    shouldForwardProp: (prop) => !['size', 'color', 'disabled', 'edge'].includes(prop),
})(({ theme, size = 'medium', color = 'default', disabled, }) => {
    const sizeStyles = {
        small: {
            padding: theme.spacing(0.875),
            '& svg': {
                fontSize: theme.spacing(2),
            },
        },
        medium: {
            padding: theme.spacing(1),
            '& > *:first-of-type': {
                fontSize: theme.spacing(2.5),
            },
        },
        tiny: {
            padding: theme.spacing(0.625),
            '& svg': {
                fontSize: theme.spacing(1.375),
            },
        },
    };
    let colorStyles = {};
    switch (color) {
        case 'primary':
            colorStyles = {
                color: theme.palette.primary.main,
                '&:hover': {
                    backgroundColor: (0, styles_1.alpha)(theme.palette.primary.main, 0.04),
                },
            };
            break;
        case 'secondary':
            colorStyles = {
                color: theme.palette.secondary.main,
                '&:hover': {
                    backgroundColor: (0, styles_1.alpha)(theme.palette.secondary.main, 0.04),
                },
            };
            break;
        case 'error':
            colorStyles = {
                color: theme.palette.error.main,
                '&:hover': {
                    backgroundColor: (0, styles_1.alpha)(theme.palette.error.main, 0.04),
                },
            };
            break;
        case 'warning':
            colorStyles = {
                color: theme.palette.warning.main,
                '&:hover': {
                    backgroundColor: (0, styles_1.alpha)(theme.palette.warning.main, 0.04),
                },
            };
            break;
        case 'info':
            colorStyles = {
                color: theme.palette.info.main,
                '&:hover': {
                    backgroundColor: (0, styles_1.alpha)(theme.palette.info.main, 0.04),
                },
            };
            break;
        case 'success':
            colorStyles = {
                color: theme.palette.success.main,
                '&:hover': {
                    backgroundColor: (0, styles_1.alpha)(theme.palette.success.main, 0.04),
                },
            };
            break;
        case 'default':
        default:
            colorStyles = {
                color: theme.palette.text.primary,
                '&:hover': {
                    backgroundColor: (0, styles_1.alpha)(theme.palette.action.active, 0.04),
                },
            };
            break;
    }
    return {
        borderRadius: theme.spacing(0.625),
        ...sizeStyles[size],
        ...colorStyles,
        opacity: disabled ? 0.5 : 1,
        cursor: disabled ? 'not-allowed' : 'pointer',
        '&.Mui-disabled': {
            opacity: 0.5,
            cursor: 'not-allowed',
            pointerEvents: 'none',
        },
        '&:focus-visible': {
            boxShadow: getFocusShadow(theme),
        },
        '&:hover': {
            ...colorStyles['&:hover'],
        },
    };
});
//# sourceMappingURL=IconButton.styled.js.map