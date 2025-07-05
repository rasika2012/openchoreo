"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StyledProgressBar = void 0;
const material_1 = require("@mui/material");
const getProgressBarHeight = (size, theme) => {
    switch (size) {
        case 'small':
            return theme.spacing(1);
        case 'medium':
            return theme.spacing(2);
        case 'large':
            return theme.spacing(3);
        default:
            return theme.spacing(2);
    }
};
exports.StyledProgressBar = (0, material_1.styled)(material_1.LinearProgress)(({ disabled, theme, size = 'medium', color = 'primary' }) => ({
    opacity: disabled ? 0.5 : 1,
    cursor: disabled ? 'not-allowed' : 'pointer',
    pointerEvents: disabled ? 'none' : 'auto',
    backgroundColor: color === 'primary'
        ? theme.palette.primary.light
        : theme.palette.grey[200],
    width: '100%',
    marginBottom: theme.spacing(2),
    borderRadius: theme.spacing(1),
    height: getProgressBarHeight(size, theme),
    determinatePrimary: {
        '&.MuiLinearProgress-determinate': {
            backgroundColor: theme.palette.primary.light,
        },
    },
    determinateSecondary: {
        '&.MuiLinearProgress-determinate': {
            backgroundColor: theme.palette.grey[200],
        },
    },
    progressPrimary: {
        '& .MuiLinearProgress-bar': {
            backgroundColor: theme.palette.primary.main,
        },
    },
    progressSecondary: {
        '& .MuiLinearProgress-bar': {
            backgroundColor: theme.palette.secondary.main,
        },
    },
}));
//# sourceMappingURL=ProgressBar.styled.js.map