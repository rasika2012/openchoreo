"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ButtonContainer = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = __importDefault(require("react"));
const ButtonContainer_styled_1 = require("./ButtonContainer.styled");
exports.ButtonContainer = react_1.default.forwardRef(({ children, className, onClick, disabled = false, ...props }, ref) => {
    return ((0, jsx_runtime_1.jsx)(ButtonContainer_styled_1.StyledButtonContainer, { ref: ref, className: className, onClick: disabled ? undefined : onClick, disabled: disabled, ...props, children: children }));
});
exports.ButtonContainer.displayName = 'ButtonContainer';
//# sourceMappingURL=ButtonContainer.js.map