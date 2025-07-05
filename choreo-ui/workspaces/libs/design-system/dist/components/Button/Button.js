import { jsx as _jsx } from "react/jsx-runtime";
import React from 'react';
import { StyledButton } from './Button.styled';
export const Button = React.forwardRef(({ children, variant = 'contained', disabled = false, size = 'medium', onClick, color = 'primary', className, disableRipple = true, pill = false, fullWidth = false, testId, ...props }, ref) => {
    return (_jsx(StyledButton, { ref: ref, variant: variant === 'subtle' || variant === 'link' ? 'text' : variant, disabled: disabled, size: size === 'tiny' ? 'small' : size, onClick: onClick, color: color, className: `${className || ''} 
        ${variant === 'subtle' ? 'subtle' : ''} 
        ${variant === 'link' ? 'link' : ''} 
        ${pill ? 'pill' : ''} 
        ${size === 'tiny' ? 'tiny' : ''} 
        ${variant === 'subtle' ? `subtle-${color}` : ''} 
        ${variant === 'link' ? `link-${color}` : ''}`, disableRipple: disableRipple, fullWidth: fullWidth, "data-testid": testId, ...props, children: children }));
});
Button.displayName = 'Button';
//# sourceMappingURL=Button.js.map