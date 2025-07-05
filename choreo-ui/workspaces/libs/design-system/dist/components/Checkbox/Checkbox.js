import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React from 'react';
import { StyledCheckbox } from './Checkbox.styled';
import { Checkbox as MUICheckbox } from '@mui/material';
/**
 * Checkbox component
 * @component
 */
export const Checkbox = React.forwardRef(({ children, className, onClick, disabled = false, disableRipple = true, ...props }, ref) => {
    return (_jsxs(StyledCheckbox, { ref: ref, className: className, disabled: disabled, ...props, children: [_jsx(MUICheckbox, { ...props, className: className, checked: props.checked, indeterminate: props.indeterminate, disableRipple: disableRipple, name: props.name, value: props.value, size: props.size, disabled: disabled, onClick: onClick, "data-cyid": `${props.testId}-check-box`, color: props.color, sx: props.sx }), _jsx("span", { children: children })] }));
});
Checkbox.displayName = 'Checkbox';
//# sourceMappingURL=Checkbox.js.map