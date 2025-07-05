import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React from 'react';
import { StyledCardDropdown } from './CardDropdown.styled';
import ChevronUp from '../../Icons/generated/ChevronUp';
import ChevronDown from '../../Icons/generated/ChevronDown';
import { Box, MenuList, Popover, useTheme } from '@mui/material';
/**
 * CardDropdown component
 * @component
 */
export const CardDropdown = React.forwardRef(({ children, icon, text, active = false, testId, size = 'medium', fullHeight = false, ...props }, _ref) => {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [buttonWidth, setButtonWidth] = React.useState(0);
    const theme = useTheme();
    const buttonRef = React.useRef(null);
    React.useEffect(() => {
        if (buttonRef.current) {
            const width = buttonRef.current.clientWidth;
            setButtonWidth(width);
        }
    }, []);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    const open = Boolean(anchorEl);
    const id = open ? 'card-popover' : undefined;
    const handleMenuItemClick = (onClick) => (event) => {
        handleClose();
        if (onClick) {
            onClick(event);
        }
    };
    return (_jsxs(Box, { children: [_jsxs(StyledCardDropdown, { ref: buttonRef, "aria-describedby": id, onClick: handleClick, "data-cyid": `${testId}-card-button`, "data-card-dropdown-size": size, "data-button-root-full-height": fullHeight, "data-button-root-active": active, ...props, children: [_jsx(Box, { className: "startIcon", children: icon }), _jsx(Box, { children: text }), _jsx(Box, { className: "endIcon", children: open ? (_jsx(ChevronUp, { fontSize: "inherit" })) : (_jsx(ChevronDown, { fontSize: "inherit" })) })] }), _jsx(Popover, { id: id, open: open, anchorEl: anchorEl, onClose: handleClose, anchorOrigin: {
                    vertical: 'bottom',
                    horizontal: 'center',
                }, transformOrigin: {
                    vertical: 'top',
                    horizontal: 'center',
                }, PaperProps: {
                    style: {
                        width: buttonWidth,
                        maxHeight: theme.spacing(40),
                        boxShadow: theme.shadows[3],
                        border: `1px solid ${theme.palette.grey[100]}`,
                        borderRadius: '8px',
                    },
                    className: 'popoverPaper',
                }, elevation: 0, "data-cyid": `${testId}-popover`, children: _jsx(MenuList, { children: React.Children.map(children, (menuItem) => {
                        if (!menuItem)
                            return null;
                        return (_jsx("div", { children: React.cloneElement(menuItem, {
                                onClick: handleMenuItemClick(menuItem.props.onClick),
                            }) }));
                    }) }) })] }));
});
CardDropdown.displayName = 'CardDropdown';
//# sourceMappingURL=CardDropdown.js.map