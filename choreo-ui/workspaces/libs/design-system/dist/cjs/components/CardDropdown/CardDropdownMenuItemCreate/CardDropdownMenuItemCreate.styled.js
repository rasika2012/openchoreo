"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StyledCardDropdownMenuItemCreate = void 0;
const CardDropdown_1 = require("../CardDropdown");
const material_1 = require("@mui/material");
exports.StyledCardDropdownMenuItemCreate = (0, material_1.styled)(CardDropdown_1.CardDropdown)(({ theme }) => ({
    '& .createMenuItem': {
        color: theme.palette.primary.main,
        alignItems: 'center',
    },
    '& .createIcon': {
        marginRight: theme.spacing(1),
        fontSize: theme.spacing(1.5),
        alignItems: 'center',
        display: 'flex',
    },
    '& .createText': {},
}));
//# sourceMappingURL=CardDropdownMenuItemCreate.styled.js.map