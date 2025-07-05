"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StyledLink = void 0;
const material_1 = require("@mui/material");
exports.StyledLink = (0, material_1.styled)(material_1.Link)(({ disabled }) => ({
    opacity: disabled ? 0.4 : 1,
    cursor: disabled ? 'default' : 'pointer',
    backgroundColor: 'transparent',
    pointerEvents: disabled ? 'none' : 'auto',
}));
//# sourceMappingURL=Link.styled.js.map