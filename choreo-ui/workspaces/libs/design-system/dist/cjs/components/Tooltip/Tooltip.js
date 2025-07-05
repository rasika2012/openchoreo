"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Tooltip = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = __importDefault(require("react"));
const Tooltip_styled_1 = require("./Tooltip.styled");
const material_1 = require("@mui/material");
/**
 * Tooltip component
 * @component
 */
exports.Tooltip = react_1.default.forwardRef(({ children, className, onClick, ...props }, ref) => {
    const infoTooltipFragment = ((0, jsx_runtime_1.jsxs)(material_1.Box, { p: 0.5, children: [props.title && ((0, jsx_runtime_1.jsx)(material_1.Box, { mb: props.content ? 1 : 0, children: (0, jsx_runtime_1.jsx)(material_1.Typography, { variant: "h5", children: props.title }) })), props.content && ((0, jsx_runtime_1.jsx)(material_1.Box, { children: (0, jsx_runtime_1.jsx)(material_1.Typography, { variant: "body2", children: props.content }) })), (props.example || props.action) && (0, jsx_runtime_1.jsx)(material_1.Divider, { className: "divider" }), props.example && ((0, jsx_runtime_1.jsxs)(material_1.Typography, { variant: "body2", children: ["Eg: ", props.example] })), props.action && ((0, jsx_runtime_1.jsx)(material_1.Link, { href: props.action.link, target: "_blank", rel: "noreferrer", children: props.action.text }))] }));
    if (!children)
        return null;
    return ((0, jsx_runtime_1.jsx)(Tooltip_styled_1.StyledTooltip, { ref: ref, className: className, arrow: props.arrow, placement: props.placement || 'bottom', title: infoTooltipFragment, ...props, children: react_1.default.isValidElement(children) ? (react_1.default.cloneElement(children, {
            ...props,
        })) : ((0, jsx_runtime_1.jsx)("span", { children: children })) }));
});
exports.Tooltip.displayName = 'Tooltip';
//# sourceMappingURL=Tooltip.js.map