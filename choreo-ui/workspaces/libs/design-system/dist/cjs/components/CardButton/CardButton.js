"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CardButton = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = __importDefault(require("react"));
const CardButton_styled_1 = require("./CardButton.styled");
const material_1 = require("@mui/material");
/**
 * CardButton component
 * @component
 */
exports.CardButton = react_1.default.forwardRef(({ icon, fullHeight = false, active, text, error, testId = false, onClick, size = 'large', disabled, endIcon, ...rest }, _ref) => {
    return ((0, jsx_runtime_1.jsxs)(CardButton_styled_1.StyledCardButton, { onClick: onClick, disabled: disabled, variant: "text", fullWidth: true, size: size, "data-button-root-active": active, "data-button-root-error": error, "data-button-root-full-height": fullHeight, startIcon: icon, "data-button-label-size": size, "data-cyid": `${testId}-card-button`, disableRipple: true, disableFocusRipple: true, disableElevation: true, disableTouchRipple: true, ...rest, children: [(0, jsx_runtime_1.jsx)(material_1.Box, { className: "buttonLabelText", children: text }), (0, jsx_runtime_1.jsx)(material_1.Box, { onClick: onClick, className: "endIcon", children: endIcon })] }));
});
exports.CardButton.displayName = 'CardButton';
//# sourceMappingURL=CardButton.js.map