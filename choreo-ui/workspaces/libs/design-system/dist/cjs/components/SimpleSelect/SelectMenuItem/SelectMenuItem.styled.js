"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StyledSelectMenuItem = void 0;
const styles_1 = require("@mui/material/styles");
const material_1 = require("@mui/material");
exports.StyledSelectMenuItem = (0, styles_1.styled)(material_1.MenuItem)(({ theme }) => ({
    '.selectMenuItem': {
        whiteSpace: 'normal',
        wordWrap: 'break-word',
        display: 'block',
    },
    '.selectMenuItemDisabled': {},
    '.selectMenuSubHeader': {
        pointerEvents: 'none',
        lineHeight: `${theme.spacing(4)}px`,
        color: theme.palette.secondary.main,
        fontSize: theme.spacing(1.25),
        fontWeight: 700,
        textTransform: 'uppercase',
    },
    '.description': {
        color: theme.palette.text.secondary,
        marginTop: theme.spacing(0.5),
        flexGrow: 1,
        wordWrap: 'break-word',
        whiteSpace: 'normal',
        lineHeight: 1.5,
        maxWidth: `calc(100% - ${theme.spacing(1.5)})`,
    },
}));
//# sourceMappingURL=SelectMenuItem.styled.js.map