import { jsx as _jsx } from "react/jsx-runtime";
import React from 'react';
import { StyledSearchBar } from './SearchBar.styled';
import { SimpleSelect } from '../SimpleSelect';
import { SelectMenuItem } from '../SimpleSelect/SelectMenuItem/SelectMenuItem';
import { Box, InputBase } from '@mui/material';
import Search from '../../Icons/generated/Search';
import clsx from 'clsx';
/**
 * SearchBar component
 * @component
 */
export const SearchBar = React.forwardRef(({ onChange, onFilterChange, filterValue, filterItems, testId, placeholder, iconPlacement = 'left', size, color, keyDown, bordered, inputValue, ...restProps }, ref) => {
    const handleOnChange = (e) => {
        onChange(e.target.value);
    };
    const isFilter = filterItems && filterItems.length > 0;
    const getEndAdornment = () => {
        if (isFilter) {
            return (_jsx("div", { className: "filterWrap", children: _jsx(SimpleSelect, { testId: `${testId}-filter`, value: filterValue, isSearchBarItem: true, onChange: (event) => {
                        onFilterChange?.(event.target.value);
                    }, resetStyles: true, anchorOrigin: {
                        vertical: 'bottom',
                        horizontal: 'right',
                    }, transformOrigin: {
                        vertical: 'top',
                        horizontal: 'right',
                    }, children: filterItems?.map((item) => (_jsx(SelectMenuItem, { testId: `search-bar-filter-${item.value}`, value: item.value, children: item.label }, item.value))) }) }));
        }
        if (iconPlacement === 'right') {
            return (_jsx(Box, { className: "searchIcon", children: _jsx(Search, { fontSize: "small" }) }));
        }
    };
    return (_jsx(StyledSearchBar, { "data-cyid": `${testId}-search-bar`, className: "search", ref: ref, size: size, color: color, bordered: bordered, ...restProps, children: _jsx("div", { className: "search", children: _jsx(InputBase, { startAdornment: iconPlacement === 'left' && (_jsx("div", { className: "searchIcon", children: _jsx(Search, { fontSize: "small" }) })), endAdornment: getEndAdornment(), placeholder: placeholder, inputProps: { 'aria-label': 'search' }, onChange: handleOnChange, onKeyDown: keyDown, value: inputValue, "data-cyid": `${testId}-search-bar-input`, className: clsx('inputRoot', {
                    inputRootSecondary: color === 'secondary',
                    inputRootBordered: bordered,
                    inputRootFilter: isFilter,
                }), classes: {
                    input: 'input',
                } }) }) }));
});
SearchBar.displayName = 'SearchBar';
//# sourceMappingURL=SearchBar.js.map