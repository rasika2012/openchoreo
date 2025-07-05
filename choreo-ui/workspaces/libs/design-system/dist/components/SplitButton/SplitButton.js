import { jsxs as _jsxs, jsx as _jsx } from "react/jsx-runtime";
import React from 'react';
import { StyledSplitButton } from './SplitButton.styled';
import { Button, ButtonGroup, ClickAwayListener, Grow, Paper, Popper, Box, } from '@mui/material';
import { ChevronDownIcon as ChevronDown } from '../../Icons';
/**
 * SplitButton component
 * @component
 */
export const SplitButton = React.forwardRef(({ children, className, onClick, disabled = false, label, selectedValue, open, setOpen, startIcon, variant = 'contained', color = 'primary', size, testId, fullWidth = false, ...props }, ref) => {
    const handleClick = React.useCallback((event) => {
        if (!disabled && onClick) {
            onClick(event);
        }
    }, [disabled, onClick]);
    const anchorRef = React.useRef(null);
    const handleToggle = () => {
        setOpen((prevOpen) => !prevOpen);
    };
    const handleClose = (event) => {
        if (anchorRef.current &&
            anchorRef.current.contains(event.target)) {
            return;
        }
        setOpen(false);
    };
    return (_jsxs(StyledSplitButton, { ref: ref, className: className, onClick: handleClick, disabled: disabled, ...props, children: [_jsxs(ButtonGroup, { ref: anchorRef, "aria-label": "split button", variant: variant, color: color, size: size, disabled: disabled, "data-testid": `${testId}-split`, disableFocusRipple: true, disableRipple: true, disableElevation: true, fullWidth: fullWidth, children: [_jsxs(Button, { onClick: onClick, startIcon: startIcon, children: [label && _jsxs(Box, { children: [label, ":\u00A0"] }), selectedValue] }), _jsx(Button, { "aria-controls": open ? 'split-button-menu' : undefined, "aria-expanded": open ? 'true' : undefined, "aria-label": "select merge strategy", "aria-haspopup": "menu", onClick: handleToggle, "data-testid": `${testId}-split-toggle-button`, children: _jsx(ChevronDown, { fontSize: "inherit" }) })] }), _jsx(Popper, { open: open, anchorEl: anchorRef.current, role: undefined, transition: true, placement: "bottom-end", style: {
                    width: anchorRef.current
                        ? anchorRef.current.offsetWidth
                        : 'initial',
                }, children: ({ TransitionProps, placement }) => (_jsx(Grow, { ...TransitionProps, style: {
                        transformOrigin: placement === 'bottom' ? 'right top' : 'right bottom',
                    }, children: _jsx(Paper, { children: _jsx(ClickAwayListener, { onClickAway: handleClose, children: _jsx(Box, { children: children }) }) }) })) })] }));
});
SplitButton.displayName = 'SplitButton';
//# sourceMappingURL=SplitButton.js.map