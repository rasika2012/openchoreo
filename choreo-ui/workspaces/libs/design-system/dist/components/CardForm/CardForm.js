import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React from 'react';
import { StyledCardForm, StyledCardFormHeader, StyledCardFormContent, } from './CardForm.styled';
/**
 * CardForm component
 * @component
 */
export const CardForm = React.forwardRef(({ children, header, className, onClick, disabled = false, testId, ...props }, ref) => {
    const handleClick = React.useCallback((event) => {
        if (!disabled && onClick) {
            onClick(event);
        }
    }, [disabled, onClick]);
    return (_jsxs(StyledCardForm, { ref: ref, className: className, onClick: handleClick, disabled: disabled, "data-cyid": testId, ...props, children: [header && _jsx(StyledCardFormHeader, { children: header }), _jsx(StyledCardFormContent, { children: children })] }));
});
CardForm.displayName = 'CardForm';
//# sourceMappingURL=CardForm.js.map