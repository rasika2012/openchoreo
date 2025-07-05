"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AvatarUserName = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = __importDefault(require("react"));
const AvatarUserName_styled_1 = require("./AvatarUserName.styled");
const Avatar_1 = require("../Avatar/Avatar");
const material_1 = require("@mui/material");
/**
 * AvatarUserName component
 * @component
 */
exports.AvatarUserName = react_1.default.forwardRef(({ children, className, onClick, disabled = false, ...props }, ref) => {
    return ((0, jsx_runtime_1.jsx)(AvatarUserName_styled_1.StyledAvatarUserName, { ref: ref, className: className, disabled: disabled, ...props, children: disabled ? ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)(Avatar_1.Avatar, { disabled: true, children: children }), !props.hideUsername && props.username && ((0, jsx_runtime_1.jsx)(material_1.Typography, { component: "span", children: props.username }))] })) : ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)(Avatar_1.Avatar, { children: children }), !props.hideUsername && props.username && ((0, jsx_runtime_1.jsx)(material_1.Typography, { component: "span", children: props.username }))] })) }));
});
exports.AvatarUserName.displayName = 'AvatarUserName';
//# sourceMappingURL=AvatarUserName.js.map