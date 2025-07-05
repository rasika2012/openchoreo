"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StyledRotate = void 0;
const material_1 = require("@mui/material");
exports.StyledRotate = (0, material_1.styled)(material_1.Box)(({ disabled }) => ({
    animation: disabled ? 'none' : 'spin 1s linear infinite',
    width: 'fit-content',
    height: 'fit-content',
    display: 'flex',
    placeItems: 'center',
    '@keyframes spin': {
        '0%': {
            transform: 'rotate(0deg)',
        },
        '100%': {
            transform: 'rotate(360deg)',
        },
    },
}));
//# sourceMappingURL=Rotate.styled.js.map