import { jsx as _jsx } from "react/jsx-runtime";
import React from 'react';
import { StyledRotate } from './Rotate.styled';
/**
 * Rotate component
 * @component
 */
export const Rotate = React.forwardRef(({ children, disabled = false, ...props }, ref) => {
    return (_jsx(StyledRotate, { ref: ref, disabled: disabled, ...props, children: children }));
});
Rotate.displayName = 'Rotate';
//# sourceMappingURL=Rotate.js.map