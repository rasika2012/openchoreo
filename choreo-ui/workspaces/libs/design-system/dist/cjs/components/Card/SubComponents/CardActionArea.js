"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CardActionArea = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const material_1 = require("@mui/material");
const StyledCardActionArea = (0, material_1.styled)(material_1.CardActionArea, {
    shouldForwardProp: (prop) => prop !== 'variant' && prop !== 'fullHeight',
})(({ theme, variant = 'elevation', fullHeight = false }) => ({
    padding: 0,
    border: `1px solid transparent`,
    borderRadius: 'inherit',
    transition: 'all 0.25s',
    '&:hover': {
        borderColor: theme.palette.primary.main,
        backgroundColor: 'transparent',
        '& .MuiCardActionArea-focusHighlight': {
            opacity: 0,
            backgroundColor: `transparent`,
        },
    },
    '&.Mui-disabled': {
        borderColor: theme.palette.grey[100],
    },
    ...(variant === 'outlined' && {
        border: `1px solid ${theme.palette.grey[200]}`,
        '&:hover': {
            borderColor: theme.palette.primary.main,
            backgroundColor: 'transparent',
        },
    }),
    ...(variant === 'elevation' && {
        boxShadow: theme.shadows[1],
        '&:hover': {
            boxShadow: `none`,
            borderColor: theme.palette.primary.main,
            backgroundColor: 'transparent',
        },
    }),
    ...(fullHeight && {
        height: '100%',
    }),
}));
const CardActionArea = ({ children, variant = 'elevation', testId, fullHeight = false, sx, ...rest }) => ((0, jsx_runtime_1.jsx)(StyledCardActionArea, { variant: variant, fullHeight: fullHeight, "data-cyid": `${testId}-card-action-area`, disableRipple: true, sx: sx || { backgroundColor: 'transparent' }, ...rest, children: children }));
exports.CardActionArea = CardActionArea;
//# sourceMappingURL=CardActionArea.js.map