"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StyledTableToolbar = void 0;
const material_1 = require("@mui/material");
exports.StyledTableToolbar = (0, material_1.styled)(material_1.Toolbar, {
    shouldForwardProp: (prop) => prop !== 'numSelected' && prop !== 'theme',
})(({ theme }) => ({
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    root: {
        paddingLeft: theme.spacing(2),
        paddingRight: theme.spacing(1),
        highlight: theme.palette.mode === 'light'
            ? {
                color: theme.palette.secondary.main,
                backgroundColor: (0, material_1.lighten)(theme.palette.secondary.light, 0.85),
            }
            : {
                color: theme.palette.text.primary,
                backgroundColor: theme.palette.secondary.dark,
            },
    },
    title: {
        flex: '1 1 100%',
    },
    virtualHidden: {
        border: 0,
        clip: 'rect(0 0 0 0)',
        height: 1,
        margin: -1,
        overflow: 'hidden',
        padding: 0,
        position: 'absolute',
        top: theme.spacing(2.5),
        width: 1,
    },
}));
//# sourceMappingURL=TableToolBar.styled.js.map