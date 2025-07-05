import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useMemo } from 'react';
import { Box, Divider } from '@mui/material';
import { AddIcon } from '../../../Icons';
import { Button, SearchBar } from '../../../components';
import { ItemList } from './ItemList';
import { getLevelLabel } from '../utils';
/**
 * Content component for the TopLevelSelector popover containing search, create button, and item lists
 */
export const PopoverContent = ({ search, onSearchChange, recentItems, items, selectedItem, onSelect, onCreateNew, level, }) => {
    const filteredItems = useMemo(() => {
        if (!search.trim())
            return items;
        return items.filter((item) => item.label.toLowerCase().includes(search.toLowerCase()));
    }, [items, search]);
    const filteredRecentItems = useMemo(() => {
        if (!search.trim())
            return recentItems;
        return recentItems.filter((item) => item.label.toLowerCase().includes(search.toLowerCase()));
    }, [recentItems, search]);
    return (_jsxs(Box, { display: "flex", flexDirection: "column", gap: 1, p: 1, children: [_jsx(SearchBar, { inputValue: search, onChange: onSearchChange, testId: "top-level-selector-search", placeholder: "Search" }), onCreateNew && (_jsx(Box, { display: "flex", gap: 1, children: _jsxs(Button, { variant: "text", startIcon: _jsx(AddIcon, { fontSize: "inherit" }), onClick: onCreateNew, disableRipple: true, children: ["Create ", getLevelLabel(level)] }) })), filteredRecentItems.length > 0 && (_jsxs(_Fragment, { children: [_jsx(Divider, {}), _jsx(ItemList, { title: "Recent", items: filteredRecentItems, onSelect: onSelect })] })), filteredItems.length > 0 && (_jsxs(_Fragment, { children: [_jsx(Divider, {}), _jsx(ItemList, { title: `All ${getLevelLabel(level)}s`, items: filteredItems, selectedItemId: selectedItem.id, onSelect: onSelect })] }))] }));
};
//# sourceMappingURL=PopoverContent.js.map