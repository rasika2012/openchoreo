"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StyledTableRow = void 0;
const material_1 = require("@mui/material");
exports.StyledTableRow = (0, material_1.styled)(material_1.TableRow)(({ theme, disabled, noBorderBottom }) => ({
    opacity: disabled ? 0.7 : 1,
    color: disabled ? theme.palette.text.disabled : theme.palette.text.primary,
    cursor: disabled ? 'not-allowed' : 'pointer',
    pointerEvents: disabled ? 'none' : 'auto',
    ...(noBorderBottom && {
        '& .MuiTableCell-root': {
            borderBottom: 'none',
        },
    }),
    '&:hover': {
        backgroundColor: disabled ? 'transparent' : theme.palette.action.hover,
    },
}));
//# sourceMappingURL=TableRow.styled.js.map