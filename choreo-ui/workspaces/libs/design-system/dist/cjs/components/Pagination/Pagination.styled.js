"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StyledDiv = exports.StyledPagination = void 0;
const material_1 = require("@mui/material");
exports.StyledPagination = (0, material_1.styled)(material_1.Box)(({ theme }) => ({
    dropdown: {
        width: theme.spacing(8),
        marginLeft: theme.spacing(1),
    },
    color: theme.palette.text.primary,
    display: 'flex',
    alignItems: 'center',
    gap: theme.spacing(1.0),
}));
exports.StyledDiv = (0, material_1.styled)('div')(({ theme }) => ({
    flexShrink: 0,
    marginLeft: theme.spacing(2.5),
    marginRight: theme.spacing(6),
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    flexGrow: 1,
    gridGap: theme.spacing(0.5),
    color: theme.palette.text.primary,
}));
//# sourceMappingURL=Pagination.styled.js.map