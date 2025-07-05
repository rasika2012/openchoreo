import { jsx as _jsx } from "react/jsx-runtime";
import React from 'react';
import { StyledProgressBar } from './ProgressBar.styled';
/**
 * ProgressBar component
 * @component
 */
export const ProgressBar = React.forwardRef(({ children, className, onClick, size = 'small', disabled = false, ...props }, ref) => {
    const handleClick = React.useCallback((event) => {
        if (!disabled && onClick) {
            onClick(event);
        }
    }, [disabled, onClick]);
    return (_jsx(StyledProgressBar, { ref: ref, className: className, color: props.color || 'primary', variant: props.variant || 'indeterminate', onClick: handleClick, disabled: disabled, size: size, ...props }));
});
ProgressBar.displayName = 'ProgressBar';
//# sourceMappingURL=ProgressBar.js.map