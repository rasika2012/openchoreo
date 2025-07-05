"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TooltipBase = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = __importDefault(require("react"));
const TooltipBase_styled_1 = require("./TooltipBase.styled");
/**
 * TooltipBase component
 * @component
 */
exports.TooltipBase = react_1.default.forwardRef(({ children, title, className, onClick, ...props }, ref) => {
    const child = react_1.default.isValidElement(children) ? (react_1.default.cloneElement(children, {
        ...(onClick && { onClick }),
        ...(className && { className }),
        ref,
        ...props,
    })) : ((0, jsx_runtime_1.jsx)("span", { ref: ref, onClick: onClick, className: className, ...props, children: children }));
    return ((0, jsx_runtime_1.jsx)(TooltipBase_styled_1.StyledTooltipBase, { title: title || 'Tooltip content', children: child }));
});
exports.TooltipBase.displayName = 'TooltipBase';
//# sourceMappingURL=TooltipBase.js.map