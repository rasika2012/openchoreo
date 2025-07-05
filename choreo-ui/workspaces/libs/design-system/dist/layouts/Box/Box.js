import { jsx as _jsx } from "react/jsx-runtime";
import React from 'react';
import { StyledBox } from './Box.styled';
/**
 * Box component
 * @component
 */
export const Box = React.forwardRef(({ children, className, onMouseEnter, onMouseLeave, ...rest }) => {
    return (_jsx(StyledBox, { className: className, onMouseEnter: onMouseEnter, onMouseLeave: onMouseLeave, ...rest, children: children }));
});
Box.displayName = 'Box';
//# sourceMappingURL=Box.js.map