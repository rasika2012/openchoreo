"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StyledCheckbox = void 0;
const material_1 = require("@mui/material");
exports.StyledCheckbox = (0, material_1.styled)(material_1.Box, {
    shouldForwardProp: (prop) => !['disabled'].includes(prop),
})(({ disabled, theme }) => ({
    display: 'flex',
    alignItems: 'center',
    cursor: disabled ? 'not-allowed' : 'pointer',
    opacity: disabled ? theme.palette.action.disabledOpacity : 1,
    textAlign: 'left',
    gap: theme.spacing(0.5),
    backgroundColor: 'transparent',
    '& span': {
        color: theme.palette.text.primary,
        fontFamily: theme.typography.fontFamily,
        fontSize: theme.typography.body1.fontSize,
        fontWeight: theme.typography.fontWeightRegular,
    },
    '&:disabled': {
        cursor: 'not-allowed',
        opacity: theme.palette.action.disabledOpacity,
        pointerEvents: 'none',
    },
}));
//# sourceMappingURL=Checkbox.styled.js.map