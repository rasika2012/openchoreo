"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Checkbox = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = __importDefault(require("react"));
const Checkbox_styled_1 = require("./Checkbox.styled");
const material_1 = require("@mui/material");
/**
 * Checkbox component
 * @component
 */
exports.Checkbox = react_1.default.forwardRef(({ children, className, onClick, disabled = false, disableRipple = true, ...props }, ref) => {
    return ((0, jsx_runtime_1.jsxs)(Checkbox_styled_1.StyledCheckbox, { ref: ref, className: className, disabled: disabled, ...props, children: [(0, jsx_runtime_1.jsx)(material_1.Checkbox, { ...props, className: className, checked: props.checked, indeterminate: props.indeterminate, disableRipple: disableRipple, name: props.name, value: props.value, size: props.size, disabled: disabled, onClick: onClick, "data-cyid": `${props.testId}-check-box`, color: props.color, sx: props.sx }), (0, jsx_runtime_1.jsx)("span", { children: children })] }));
});
exports.Checkbox.displayName = 'Checkbox';
//# sourceMappingURL=Checkbox.js.map