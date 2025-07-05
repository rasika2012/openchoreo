import { jsx as _jsx } from "react/jsx-runtime";
import React from 'react';
import { StyledTooltipBase } from './TooltipBase.styled';
/**
 * TooltipBase component
 * @component
 */
export const TooltipBase = React.forwardRef(({ children, title, className, onClick, ...props }, ref) => {
    const child = React.isValidElement(children) ? (React.cloneElement(children, {
        ...(onClick && { onClick }),
        ...(className && { className }),
        ref,
        ...props,
    })) : (_jsx("span", { ref: ref, onClick: onClick, className: className, ...props, children: children }));
    return (_jsx(StyledTooltipBase, { title: title || 'Tooltip content', children: child }));
});
TooltipBase.displayName = 'TooltipBase';
//# sourceMappingURL=TooltipBase.js.map