import { jsx as _jsx } from "react/jsx-runtime";
import React from 'react';
import { StyledIconButton } from './IconButton.styled';
import { useTheme } from '@mui/material/styles';
export const IconButton = React.forwardRef(({ children, ...props }, ref) => (_jsx(StyledIconButton, { ref: ref, theme: useTheme(), onClick: props.disabled ? undefined : props.onClick, disabled: props.disabled, ...props, children: children })));
IconButton.displayName = 'IconButton';
//# sourceMappingURL=IconButton.js.map