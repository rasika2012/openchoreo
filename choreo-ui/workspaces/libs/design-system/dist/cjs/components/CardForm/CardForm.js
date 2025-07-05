"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CardForm = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = __importDefault(require("react"));
const CardForm_styled_1 = require("./CardForm.styled");
/**
 * CardForm component
 * @component
 */
exports.CardForm = react_1.default.forwardRef(({ children, header, className, onClick, disabled = false, testId, ...props }, ref) => {
    const handleClick = react_1.default.useCallback((event) => {
        if (!disabled && onClick) {
            onClick(event);
        }
    }, [disabled, onClick]);
    return ((0, jsx_runtime_1.jsxs)(CardForm_styled_1.StyledCardForm, { ref: ref, className: className, onClick: handleClick, disabled: disabled, "data-cyid": testId, ...props, children: [header && (0, jsx_runtime_1.jsx)(CardForm_styled_1.StyledCardFormHeader, { children: header }), (0, jsx_runtime_1.jsx)(CardForm_styled_1.StyledCardFormContent, { children: children })] }));
});
exports.CardForm.displayName = 'CardForm';
//# sourceMappingURL=CardForm.js.map