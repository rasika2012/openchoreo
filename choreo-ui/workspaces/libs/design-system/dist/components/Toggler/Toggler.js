import { jsx as _jsx } from "react/jsx-runtime";
import React from 'react';
import { StyledToggler } from './Toggler.styled';
/**
 * Toggler component
 * @component
 */
export const Toggler = React.forwardRef(({ className, onClick, disabled = false, color = 'default', // Set default to 'default'
testId, ...props }, ref) => {
    const handleChange = (event) => {
        if (disabled)
            return;
        // Convert ChangeEvent to MouseEvent for onClick handler
        const mouseEvent = event;
        onClick?.(mouseEvent);
    };
    return (_jsx(StyledToggler, { ref: ref, size: props.size || 'medium', className: className, onChange: handleChange, disabled: disabled, checked: props.checked, color: color, disableRipple: true, disableTouchRipple: true, disableFocusRipple: true, "data-testid": testId, ...props }));
});
Toggler.displayName = 'Toggler';
//# sourceMappingURL=Toggler.js.map