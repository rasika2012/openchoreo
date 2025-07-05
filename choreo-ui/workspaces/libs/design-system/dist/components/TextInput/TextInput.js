import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React from 'react';
import { Box, CircularProgress, FormHelperText, Tooltip, Typography, } from '@mui/material';
import { QuestionIcon, InfoIcon } from '../../Icons';
import { StyledTextField, StyledFormControl, HeadingWrapper, } from './TextInput.styled';
import Question from '../../Icons/generated/Question';
export const TextInput = React.forwardRef(({ label, tooltip, value, error, errorMessage, testId, onChange, disabled, readonly, multiline = false, className, rows, optional, loading, info, actions, helperText, rounded = true, size = 'small', fullWidth = false, type, endAdornment, ...props }, ref) => {
    const computedError = !!errorMessage || !!error;
    const toolTip = tooltip && (_jsx(Tooltip, { title: tooltip, placement: props.tooltipPlacement, children: _jsx(Box, { className: "tooltipIcon", children: _jsx(Box, { className: "textInputInfoIcon", children: _jsx(Question, { fontSize: "inherit" }) }) }) }));
    return (_jsxs(StyledFormControl, { ref: ref, className: className, children: [(label || toolTip || info || optional || actions) && (_jsxs(HeadingWrapper, { children: [_jsx(Typography, { children: label }), tooltip && (_jsx(Tooltip, { title: tooltip, className: "formLabelTooltip", children: _jsx(QuestionIcon, { fontSize: "inherit", className: "tooltipIcon" }) })), info && _jsx(Box, { className: "formLabelInfo", children: info }), optional && (_jsx(Typography, { variant: "body2", className: "formOptional", children: "(Optional)" })), actions && _jsx(Box, { className: "formLabelAction", children: actions })] })), _jsx(StyledTextField, { customSize: size, "data-cyid": testId, variant: "outlined", multiline: multiline, rows: rows, type: type, value: value, onChange: (evt) => onChange(evt.target.value), disabled: disabled, slotProps: {
                    input: {
                        readOnly: readonly,
                    },
                    inputLabel: {
                        shrink: false,
                    },
                }, InputProps: {
                    ...(props.InputProps || {}),
                    endAdornment: endAdornment ?? props.InputProps?.endAdornment,
                }, error: computedError, helperText: computedError && errorMessage ? (_jsxs(Box, { display: "flex", alignItems: "center", gap: 0.5, children: [_jsx(InfoIcon, { fontSize: "inherit" }), errorMessage] })) : (helperText), fullWidth: fullWidth, ...props }), loading && helperText && (_jsx(FormHelperText, { children: _jsxs(Box, { display: "flex", alignItems: "center", children: [_jsx(CircularProgress, { size: 12 }), _jsx(Box, { ml: 1, children: helperText })] }) }))] }));
});
TextInput.displayName = 'TextInput';
//# sourceMappingURL=TextInput.js.map