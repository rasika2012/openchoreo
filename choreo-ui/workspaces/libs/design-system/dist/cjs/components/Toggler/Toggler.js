"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Toggler = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = __importDefault(require("react"));
const Toggler_styled_1 = require("./Toggler.styled");
/**
 * Toggler component
 * @component
 */
exports.Toggler = react_1.default.forwardRef(({ className, onClick, disabled = false, color = 'default', // Set default to 'default'
testId, ...props }, ref) => {
    const handleChange = (event) => {
        if (disabled)
            return;
        // Convert ChangeEvent to MouseEvent for onClick handler
        const mouseEvent = event;
        onClick?.(mouseEvent);
    };
    return ((0, jsx_runtime_1.jsx)(Toggler_styled_1.StyledToggler, { ref: ref, size: props.size || 'medium', className: className, onChange: handleChange, disabled: disabled, checked: props.checked, color: color, disableRipple: true, disableTouchRipple: true, disableFocusRipple: true, "data-testid": testId, ...props }));
});
exports.Toggler.displayName = 'Toggler';
//# sourceMappingURL=Toggler.js.map