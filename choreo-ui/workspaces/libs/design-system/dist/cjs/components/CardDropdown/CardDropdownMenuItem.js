"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CardDropdownMenuItem = void 0;
const material_1 = require("@mui/material");
exports.CardDropdownMenuItem = (0, material_1.styled)(material_1.MenuItem)(({ theme }) => ({
    lineHeight: `${theme.spacing(3)}px`,
    padding: theme.spacing(1, 2),
    '&:focus': {
        backgroundColor: theme.palette.secondary.light,
    },
    '&:hover': {
        backgroundColor: theme.palette.secondary.light,
    },
    '&$selected': {
        backgroundColor: theme.palette.secondary.light,
    },
    selected: {},
}));
exports.default = exports.CardDropdownMenuItem;
//# sourceMappingURL=CardDropdownMenuItem.js.map