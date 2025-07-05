"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StyledSelectMenuSubHeader = void 0;
const material_1 = require("@mui/material");
const styles_1 = require("@mui/material/styles");
exports.StyledSelectMenuSubHeader = (0, styles_1.styled)(material_1.ListSubheader)(({ theme }) => ({
    '.selectMenuSubHeader': {
        pointerEvents: 'none',
        lineHeight: `${theme.spacing(4)}px`,
        color: theme.palette.secondary.main,
        fontSize: theme.spacing(1.25),
        fontWeight: 700,
        textTransform: 'uppercase',
    },
    '.selectMenuSubHeaderInset': {},
}));
//# sourceMappingURL=SelectMenuSubHeader.styled.js.map