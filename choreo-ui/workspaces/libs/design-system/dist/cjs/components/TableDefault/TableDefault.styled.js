"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StyledTable = void 0;
const material_1 = require("@mui/material");
exports.StyledTable = (0, material_1.styled)(material_1.Table, {
    shouldForwardProp: (prop) => prop !== 'disabled' && prop !== 'variant',
})(({ theme, variant }) => ({
    ...(variant === 'dark' && {
        borderCollapse: 'separate',
        borderSpacing: theme.spacing(0, 1),
        '& .MuiTableBody-root': {
            '& .MuiTableRow-root': {
                boxShadow: `0px 2px 2px ${(0, material_1.alpha)(theme.palette.secondary.main, 0.2)} `,
                borderRadius: theme.spacing(1),
            },
        },
        '& .MuiTableCell-body': {
            backgroundColor: theme.palette.secondary.light,
            borderBottom: 'none',
            padding: theme.spacing(1, 2),
            '&:first-child': {
                borderLeft: '1px solid transparent',
                borderTopLeftRadius: theme.spacing(1),
                borderBottomLeftRadius: theme.spacing(1),
            },
            '&:last-child': {
                borderRight: '1px solid transparent',
                borderTopRightRadius: theme.spacing(1),
                borderBottomRightRadius: theme.spacing(1),
            },
            '&[data-padding="checkbox"]': {
                backgroundColor: 'transparent',
            },
        },
    }),
}));
//# sourceMappingURL=TableDefault.styled.js.map