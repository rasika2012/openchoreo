"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Typography = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = __importDefault(require("react"));
const Typography_styled_1 = require("./Typography.styled");
/**
 * Typography component
 * @component
 */
exports.Typography = react_1.default.forwardRef(({ children, className, monospace, color, ...props }, ref) => {
    return ((0, jsx_runtime_1.jsx)(Typography_styled_1.StyledTypography, { ref: ref, className: className, monospace: monospace, color: color, ...props, children: children }));
});
exports.Typography.displayName = 'Typography';
//# sourceMappingURL=Typography.js.map