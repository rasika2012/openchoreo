"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Chip = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = __importDefault(require("react"));
const Chip_styled_1 = require("./Chip.styled");
/**
 * Chip component
 * @component
 */
exports.Chip = react_1.default.forwardRef(({ children, className, disabled = false, size = 'medium', variant = 'filled', color = 'default', ...props }, ref) => {
    return ((0, jsx_runtime_1.jsx)(Chip_styled_1.StyledChip, { ref: ref, ...props, size: size, variant: variant === 'filled' ? 'filled' : 'outlined', color: color, label: props.label, className: className, disabled: disabled, "data-cyid": `${props.testId}-chip`, children: children }));
});
exports.Chip.displayName = 'Chip';
//# sourceMappingURL=Chip.js.map