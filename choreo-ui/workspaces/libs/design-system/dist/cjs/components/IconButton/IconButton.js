"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.IconButton = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = __importDefault(require("react"));
const IconButton_styled_1 = require("./IconButton.styled");
const styles_1 = require("@mui/material/styles");
exports.IconButton = react_1.default.forwardRef(({ children, ...props }, ref) => ((0, jsx_runtime_1.jsx)(IconButton_styled_1.StyledIconButton, { ref: ref, theme: (0, styles_1.useTheme)(), onClick: props.disabled ? undefined : props.onClick, disabled: props.disabled, ...props, children: children })));
exports.IconButton.displayName = 'IconButton';
//# sourceMappingURL=IconButton.js.map