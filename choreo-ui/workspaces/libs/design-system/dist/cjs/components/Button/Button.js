"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Button = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = __importDefault(require("react"));
const Button_styled_1 = require("./Button.styled");
exports.Button = react_1.default.forwardRef(({ children, variant = 'contained', disabled = false, size = 'medium', onClick, color = 'primary', className, disableRipple = true, pill = false, fullWidth = false, testId, ...props }, ref) => {
    return ((0, jsx_runtime_1.jsx)(Button_styled_1.StyledButton, { ref: ref, variant: variant === 'subtle' || variant === 'link' ? 'text' : variant, disabled: disabled, size: size === 'tiny' ? 'small' : size, onClick: onClick, color: color, className: `${className || ''} 
        ${variant === 'subtle' ? 'subtle' : ''} 
        ${variant === 'link' ? 'link' : ''} 
        ${pill ? 'pill' : ''} 
        ${size === 'tiny' ? 'tiny' : ''} 
        ${variant === 'subtle' ? `subtle-${color}` : ''} 
        ${variant === 'link' ? `link-${color}` : ''}`, disableRipple: disableRipple, fullWidth: fullWidth, "data-testid": testId, ...props, children: children }));
});
exports.Button.displayName = 'Button';
//# sourceMappingURL=Button.js.map