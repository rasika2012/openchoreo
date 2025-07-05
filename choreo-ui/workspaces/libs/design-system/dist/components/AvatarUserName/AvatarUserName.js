import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import React from 'react';
import { StyledAvatarUserName } from './AvatarUserName.styled';
import { Avatar } from '../Avatar/Avatar';
import { Typography } from '@mui/material';
/**
 * AvatarUserName component
 * @component
 */
export const AvatarUserName = React.forwardRef(({ children, className, onClick, disabled = false, ...props }, ref) => {
    return (_jsx(StyledAvatarUserName, { ref: ref, className: className, disabled: disabled, ...props, children: disabled ? (_jsxs(_Fragment, { children: [_jsx(Avatar, { disabled: true, children: children }), !props.hideUsername && props.username && (_jsx(Typography, { component: "span", children: props.username }))] })) : (_jsxs(_Fragment, { children: [_jsx(Avatar, { children: children }), !props.hideUsername && props.username && (_jsx(Typography, { component: "span", children: props.username }))] })) }));
});
AvatarUserName.displayName = 'AvatarUserName';
//# sourceMappingURL=AvatarUserName.js.map