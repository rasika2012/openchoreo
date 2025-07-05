"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StyledSimpleSelect = void 0;
const material_1 = require("@mui/material");
exports.StyledSimpleSelect = (0, material_1.styled)(material_1.Box)(({ disabled, size, isSearchBarItem, theme }) => ({
    opacity: disabled ? 0.5 : 1,
    cursor: disabled ? 'not-allowed' : 'pointer',
    pointerEvents: disabled ? 'none' : 'auto',
    backgroundColor: 'transparent',
    '& .MuiSelect-select': {
        padding: size === 'small' ? theme.spacing(1, 1.5) : theme.spacing(1.5, 2),
        fontSize: size === 'small'
            ? theme.typography.body2.fontSize
            : theme.typography.body1.fontSize,
    },
    '& .MuiInputBase-root': {
        backgroundColor: 'dark' in theme.palette
            ? theme.palette.background.default
            : 'transparent',
        minHeight: size === 'small' ? '32px' : '40px',
    },
    '& .MuiOutlinedInput-notchedOutline': {
        border: isSearchBarItem ? 'none' : `1px solid ${theme.palette.divider}`,
        outline: 'none',
        '&:hover': {
            outline: 'none',
            border: 'none',
        },
        '&:focus': {
            outline: 'none',
            border: 'none',
        },
    },
    '& .Mui-focused': {
        boxShadow: `0 -3px 9px 0 ${(0, material_1.alpha)(theme.palette.common.black, 0.04)}`,
        '& .MuiOutlinedInput-notchedOutline': {
            borderColor: theme.palette.primary.main,
            borderWidth: 2,
        },
    },
    '& .MuiSelect-icon': {
        fontSize: size === 'small' ? '0.6rem' : '0.8rem',
    },
    '&.Mui-error': {
        '& .MuiOutlinedInput-notchedOutline': {
            borderColor: theme.palette.error.main,
        },
    },
    '.loadingIcon': {
        marginRight: theme.spacing(1.5),
    },
}));
//# sourceMappingURL=SimpleSelect.styled.js.map