"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const material_1 = require("@mui/material");
const SplitMenuItem = (0, material_1.styled)(material_1.MenuItem, {
    shouldForwardProp: (prop) => !['disabled', 'colorVariant'].includes(prop),
})(({ theme, disabled, colorVariant, }) => {
    const paletteColor = colorVariant ? theme.palette[colorVariant] : undefined;
    const isPaletteColor = (color) => typeof color === 'object' &&
        color !== null &&
        'main' in color &&
        'dark' in color &&
        'contrastText' in color;
    const selectedStyles = isPaletteColor(paletteColor)
        ? {
            '&.Mui-selected': {
                color: paletteColor.contrastText,
                backgroundColor: paletteColor.main,
                '&:hover': {
                    backgroundColor: paletteColor.dark,
                },
            },
        }
        : {};
    return {
        opacity: disabled ? 0.5 : 1,
        paddingTop: theme.spacing(1.25),
        paddingBottom: theme.spacing(1.25),
        '&:hover': {
            backgroundColor: theme.palette.action.hover,
        },
        '&:first-of-type': {
            borderTopLeftRadius: 5,
            borderTopRightRadius: 5,
        },
        '&:last-of-type': {
            borderBottomLeftRadius: 5,
            borderBottomRightRadius: 5,
        },
        ...selectedStyles,
    };
});
exports.default = SplitMenuItem;
//# sourceMappingURL=SplitMenuItem.js.map