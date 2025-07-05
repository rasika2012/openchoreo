"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Radio = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = __importDefault(require("react"));
const Radio_styled_1 = require("./Radio.styled");
const material_1 = require("@mui/material");
/**
 * Radio component
 * @component
 */
exports.Radio = react_1.default.forwardRef(({ children, className, onClick, disabled = false, ...restProps }) => {
    const styledRadioProps = {
        className,
        onClick,
        disabled,
    };
    const radioIndicatorProps = {
        disabled,
        ...restProps,
    };
    return ((0, jsx_runtime_1.jsx)(Radio_styled_1.StyledRadio, { ...styledRadioProps, children: (0, jsx_runtime_1.jsx)(material_1.FormControlLabel, { control: (0, jsx_runtime_1.jsx)(Radio_styled_1.StyledRadioIndicator, { ...radioIndicatorProps, disableRipple: true, disableFocusRipple: true, disableTouchRipple: true }), label: children, disabled: disabled }) }));
});
exports.Radio.displayName = 'Radio';
//# sourceMappingURL=Radio.js.map