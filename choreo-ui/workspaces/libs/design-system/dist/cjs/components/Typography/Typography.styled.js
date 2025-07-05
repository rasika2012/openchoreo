"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StyledTypography = void 0;
const material_1 = require("@mui/material");
exports.StyledTypography = (0, material_1.styled)(material_1.Typography)(({ monospace }) => ({
    fontFamily: monospace ? 'monospace' : 'inherit',
}));
//# sourceMappingURL=Typography.styled.js.map