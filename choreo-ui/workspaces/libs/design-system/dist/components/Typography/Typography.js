import { jsx as _jsx } from "react/jsx-runtime";
import React from 'react';
import { StyledTypography } from './Typography.styled';
/**
 * Typography component
 * @component
 */
export const Typography = React.forwardRef(({ children, className, monospace, color, ...props }, ref) => {
    return (_jsx(StyledTypography, { ref: ref, className: className, monospace: monospace, color: color, ...props, children: children }));
});
Typography.displayName = 'Typography';
//# sourceMappingURL=Typography.js.map