"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StyledCardFormContent = exports.StyledCardFormHeader = exports.StyledCardForm = void 0;
const material_1 = require("@mui/material");
exports.StyledCardForm = (0, material_1.styled)(material_1.Box)(({ disabled, theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: theme.palette.background.paper,
    borderRadius: theme.shape.borderRadius,
    boxShadow: theme.shadows[1],
    transition: theme.transitions.create(['box-shadow', 'transform', 'background-color'], {
        duration: theme.transitions.duration.short,
    }),
    border: `1px solid ${theme.palette.divider}`,
    opacity: disabled ? 0.5 : 1,
    cursor: disabled ? 'not-allowed' : 'pointer',
    '&:hover': {
        backgroundColor: theme.palette.action.hover,
        boxShadow: theme.shadows[3],
        transform: 'translateY(-2px)',
    },
    '&:active': {
        transform: 'translateY(0)',
        boxShadow: theme.shadows[2],
    },
}));
exports.StyledCardFormHeader = (0, material_1.styled)(material_1.Box)(({ theme }) => ({
    padding: theme.spacing(2),
    borderBottom: `1px solid ${theme.palette.divider}`,
    fontWeight: 500,
}));
exports.StyledCardFormContent = (0, material_1.styled)(material_1.Box)(({ theme }) => ({
    padding: theme.spacing(2),
}));
//# sourceMappingURL=CardForm.styled.js.map