import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React, { useState, useCallback } from 'react';
import { StyledPopover, StyledTopLevelSelector, } from './TopLevelSelector.styled';
import { Box } from '@mui/material';
import { SelectorHeader, SelectorContent, PopoverContent } from './components';
/**
 * TopLevelSelector component for selecting items at different levels (Organization, Project, Component)
 * @component
 */
export const TopLevelSelector = React.forwardRef(({ items = [], selectedItem, onSelect, isHighlighted = false, disabled = false, onClick, level, recentItems = [], onClose, onCreateNew, className, }, ref) => {
    const [search, setSearch] = useState('');
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const handleClick = useCallback(() => {
        if (!disabled) {
            onClick?.(level);
        }
    }, [disabled, onClick, level]);
    const handleSelect = useCallback((item) => {
        if (!disabled) {
            onSelect(item);
            setAnchorEl(null);
        }
    }, [disabled, onSelect]);
    const handleOpen = useCallback((event) => {
        event.stopPropagation();
        event.preventDefault();
        setAnchorEl(event.currentTarget);
    }, []);
    const handleClose = useCallback(() => {
        setAnchorEl(null);
        setSearch('');
        onClose?.();
    }, [onClose]);
    const handleSearchChange = useCallback((value) => {
        setSearch(value);
    }, []);
    const handleCreateNew = useCallback(() => {
        onCreateNew?.();
        setAnchorEl(null);
    }, [onCreateNew]);
    return (_jsxs(StyledTopLevelSelector, { ref: ref, onClick: handleClick, disabled: disabled, variant: "outlined", isHighlighted: isHighlighted, className: className, role: "button", tabIndex: disabled ? -1 : 0, "aria-label": `${level} selector`, "aria-expanded": open, "aria-haspopup": "listbox", children: [_jsxs(Box, { display: "flex", flexDirection: "column", children: [_jsx(SelectorHeader, { level: level, onClose: onClose }), _jsx(SelectorContent, { selectedItem: selectedItem, onOpen: handleOpen, disableMenu: items.length === 0 })] }), _jsx(StyledPopover, { id: `${level}-popover`, open: open, anchorEl: anchorEl, onClose: handleClose, anchorOrigin: {
                    vertical: 'bottom',
                    horizontal: 'left',
                }, transformOrigin: {
                    vertical: 'top',
                    horizontal: 'left',
                }, role: "listbox", "aria-label": `${level} options`, children: _jsx(PopoverContent, { search: search, onSearchChange: handleSearchChange, recentItems: recentItems, items: items, selectedItem: selectedItem, onSelect: handleSelect, onCreateNew: onCreateNew && handleCreateNew, level: level }) })] }));
});
TopLevelSelector.displayName = 'TopLevelSelector';
//# sourceMappingURL=TopLevelSelector.js.map