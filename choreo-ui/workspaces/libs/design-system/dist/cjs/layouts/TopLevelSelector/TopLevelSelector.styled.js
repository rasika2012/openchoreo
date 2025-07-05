"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StyledPopover = exports.StyledTopLevelSelector = void 0;
const material_1 = require("@mui/material");
exports.StyledTopLevelSelector = (0, material_1.styled)(material_1.Card)(({ disabled, theme, isHighlighted }) => ({
    opacity: disabled ? 0.5 : 1,
    cursor: disabled ? 'not-allowed' : 'pointer',
    pointerEvents: disabled ? 'none' : 'auto',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'space-between',
    justifyContent: 'center',
    height: theme.spacing(5),
    gap: theme.spacing(1),
    backgroundColor: isHighlighted
        ? (0, material_1.alpha)(theme.palette.primary.light, 0.05)
        : 'transparent',
    borderColor: isHighlighted
        ? theme.palette.primary.main
        : theme.palette.divider,
    transition: theme.transitions.create(['background-color'], {
        duration: theme.transitions.duration.short,
    }),
    '&:hover': {
        backgroundColor: isHighlighted
            ? (0, material_1.alpha)(theme.palette.primary.light, 0.15)
            : theme.palette.action.hover,
    },
    padding: theme.spacing(0.615),
}));
exports.StyledPopover = (0, material_1.styled)(material_1.Popover)(({ theme }) => ({
    '& .MuiPopover-paper': {
        boxShadow: theme.shadows[1],
        width: theme.spacing(40),
    },
}));
//# sourceMappingURL=TopLevelSelector.styled.js.map