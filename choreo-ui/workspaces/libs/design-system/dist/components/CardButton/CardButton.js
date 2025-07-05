import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React from 'react';
import { StyledCardButton } from './CardButton.styled';
import { Box } from '@mui/material';
/**
 * CardButton component
 * @component
 */
export const CardButton = React.forwardRef(({ icon, fullHeight = false, active, text, error, testId = false, onClick, size = 'large', disabled, endIcon, ...rest }, _ref) => {
    return (_jsxs(StyledCardButton, { onClick: onClick, disabled: disabled, variant: "text", fullWidth: true, size: size, "data-button-root-active": active, "data-button-root-error": error, "data-button-root-full-height": fullHeight, startIcon: icon, "data-button-label-size": size, "data-cyid": `${testId}-card-button`, disableRipple: true, disableFocusRipple: true, disableElevation: true, disableTouchRipple: true, ...rest, children: [_jsx(Box, { className: "buttonLabelText", children: text }), _jsx(Box, { onClick: onClick, className: "endIcon", children: endIcon })] }));
});
CardButton.displayName = 'CardButton';
//# sourceMappingURL=CardButton.js.map