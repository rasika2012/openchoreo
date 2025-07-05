"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Divider = Divider;
const jsx_runtime_1 = require("react/jsx-runtime");
const material_1 = require("@mui/material");
/**
 * Divider component
 * @component
 */
function Divider(props) {
    const { testId, variant = 'fullWidth', orientation = 'horizontal' } = props;
    return ((0, jsx_runtime_1.jsx)(material_1.Divider, { "data-testid": testId, variant: variant, orientation: orientation }));
}
Divider.displayName = 'Divider';
//# sourceMappingURL=Divider.js.map