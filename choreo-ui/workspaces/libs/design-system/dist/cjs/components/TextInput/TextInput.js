"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TextInput = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = __importDefault(require("react"));
const material_1 = require("@mui/material");
const Icons_1 = require("@design-system/Icons");
const TextInput_styled_1 = require("./TextInput.styled");
const Question_1 = __importDefault(require("@design-system/Icons/generated/Question"));
exports.TextInput = react_1.default.forwardRef(({ label, tooltip, value, error, errorMessage, testId, onChange, disabled, readonly, multiline = false, className, rows, optional, loading, info, actions, helperText, rounded = true, size = 'small', fullWidth = false, type, endAdornment, ...props }, ref) => {
    const computedError = !!errorMessage || !!error;
    const toolTip = tooltip && ((0, jsx_runtime_1.jsx)(material_1.Tooltip, { title: tooltip, placement: props.tooltipPlacement, children: (0, jsx_runtime_1.jsx)(material_1.Box, { className: "tooltipIcon", children: (0, jsx_runtime_1.jsx)(material_1.Box, { className: "textInputInfoIcon", children: (0, jsx_runtime_1.jsx)(Question_1.default, { fontSize: "inherit" }) }) }) }));
    return ((0, jsx_runtime_1.jsxs)(TextInput_styled_1.StyledFormControl, { ref: ref, className: className, children: [(label || toolTip || info || optional || actions) && ((0, jsx_runtime_1.jsxs)(TextInput_styled_1.HeadingWrapper, { children: [(0, jsx_runtime_1.jsx)(material_1.Typography, { children: label }), tooltip && ((0, jsx_runtime_1.jsx)(material_1.Tooltip, { title: tooltip, className: "formLabelTooltip", children: (0, jsx_runtime_1.jsx)(Icons_1.QuestionIcon, { fontSize: "inherit", className: "tooltipIcon" }) })), info && (0, jsx_runtime_1.jsx)(material_1.Box, { className: "formLabelInfo", children: info }), optional && ((0, jsx_runtime_1.jsx)(material_1.Typography, { variant: "body2", className: "formOptional", children: "(Optional)" })), actions && (0, jsx_runtime_1.jsx)(material_1.Box, { className: "formLabelAction", children: actions })] })), (0, jsx_runtime_1.jsx)(TextInput_styled_1.StyledTextField, { customSize: size, "data-cyid": testId, variant: "outlined", multiline: multiline, rows: rows, type: type, value: value, onChange: (evt) => onChange(evt.target.value), disabled: disabled, slotProps: {
                    input: {
                        readOnly: readonly,
                    },
                    inputLabel: {
                        shrink: false,
                    },
                }, InputProps: {
                    ...(props.InputProps || {}),
                    endAdornment: endAdornment ?? props.InputProps?.endAdornment,
                }, error: computedError, helperText: computedError && errorMessage ? ((0, jsx_runtime_1.jsxs)(material_1.Box, { display: "flex", alignItems: "center", gap: 0.5, children: [(0, jsx_runtime_1.jsx)(Icons_1.InfoIcon, { fontSize: "inherit" }), errorMessage] })) : (helperText), fullWidth: fullWidth, ...props }), loading && helperText && ((0, jsx_runtime_1.jsx)(material_1.FormHelperText, { children: (0, jsx_runtime_1.jsxs)(material_1.Box, { display: "flex", alignItems: "center", children: [(0, jsx_runtime_1.jsx)(material_1.CircularProgress, { size: 12 }), (0, jsx_runtime_1.jsx)(material_1.Box, { ml: 1, children: helperText })] }) }))] }));
});
exports.TextInput.displayName = 'TextInput';
//# sourceMappingURL=TextInput.js.map