"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CardContent = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const material_1 = require("@mui/material");
const StyledCardContent = (0, material_1.styled)(material_1.CardContent, {
    shouldForwardProp: (prop) => prop !== 'paddingSize' && prop !== 'fullHeight',
})(({ theme, paddingSize = 'lg', fullHeight = false }) => ({
    padding: paddingSize === 'lg' ? theme.spacing(3) : theme.spacing(2),
    '&:last-child': {
        paddingBottom: paddingSize === 'lg' ? theme.spacing(3) : theme.spacing(2),
    },
    ...(fullHeight && {
        height: '100%',
    }),
}));
const CardContent = ({ children, paddingSize = 'lg', fullHeight = false, testId, sx, }) => ((0, jsx_runtime_1.jsx)(StyledCardContent, { paddingSize: paddingSize, fullHeight: fullHeight, "data-cyid": testId ? `${testId}-card-content` : undefined, sx: sx, children: children }));
exports.CardContent = CardContent;
//# sourceMappingURL=CardContent.js.map