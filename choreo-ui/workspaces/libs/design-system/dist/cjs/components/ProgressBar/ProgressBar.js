"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProgressBar = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = __importDefault(require("react"));
const ProgressBar_styled_1 = require("./ProgressBar.styled");
/**
 * ProgressBar component
 * @component
 */
exports.ProgressBar = react_1.default.forwardRef(({ children, className, onClick, size = 'small', disabled = false, ...props }, ref) => {
    const handleClick = react_1.default.useCallback((event) => {
        if (!disabled && onClick) {
            onClick(event);
        }
    }, [disabled, onClick]);
    return ((0, jsx_runtime_1.jsx)(ProgressBar_styled_1.StyledProgressBar, { ref: ref, className: className, color: props.color || 'primary', variant: props.variant || 'indeterminate', onClick: handleClick, disabled: disabled, size: size, ...props }));
});
exports.ProgressBar.displayName = 'ProgressBar';
//# sourceMappingURL=ProgressBar.js.map