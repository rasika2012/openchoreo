import { jsx as _jsx } from "react/jsx-runtime";
import React from 'react';
import { StyledButtonContainer } from './ButtonContainer.styled';
export const ButtonContainer = React.forwardRef(({ children, className, onClick, disabled = false, ...props }, ref) => {
    return (_jsx(StyledButtonContainer, { ref: ref, className: className, onClick: disabled ? undefined : onClick, disabled: disabled, ...props, children: children }));
});
ButtonContainer.displayName = 'ButtonContainer';
//# sourceMappingURL=ButtonContainer.js.map