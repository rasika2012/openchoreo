"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Rotate = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = __importDefault(require("react"));
const Rotate_styled_1 = require("./Rotate.styled");
/**
 * Rotate component
 * @component
 */
exports.Rotate = react_1.default.forwardRef(({ children, disabled = false, ...props }, ref) => {
    return ((0, jsx_runtime_1.jsx)(Rotate_styled_1.StyledRotate, { ref: ref, disabled: disabled, ...props, children: children }));
});
exports.Rotate.displayName = 'Rotate';
//# sourceMappingURL=Rotate.js.map