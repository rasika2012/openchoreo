import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React from 'react';
import { StyledTooltip } from './Tooltip.styled';
import { Box, Divider, Link, Typography } from '@mui/material';
/**
 * Tooltip component
 * @component
 */
export const Tooltip = React.forwardRef(({ children, className, onClick, ...props }, ref) => {
    const infoTooltipFragment = (_jsxs(Box, { p: 0.5, children: [props.title && (_jsx(Box, { mb: props.content ? 1 : 0, children: _jsx(Typography, { variant: "h5", children: props.title }) })), props.content && (_jsx(Box, { children: _jsx(Typography, { variant: "body2", children: props.content }) })), (props.example || props.action) && _jsx(Divider, { className: "divider" }), props.example && (_jsxs(Typography, { variant: "body2", children: ["Eg: ", props.example] })), props.action && (_jsx(Link, { href: props.action.link, target: "_blank", rel: "noreferrer", children: props.action.text }))] }));
    if (!children)
        return null;
    return (_jsx(StyledTooltip, { ref: ref, className: className, arrow: props.arrow, placement: props.placement || 'bottom', title: infoTooltipFragment, ...props, children: React.isValidElement(children) ? (React.cloneElement(children, {
            ...props,
        })) : (_jsx("span", { children: children })) }));
});
Tooltip.displayName = 'Tooltip';
//# sourceMappingURL=Tooltip.js.map