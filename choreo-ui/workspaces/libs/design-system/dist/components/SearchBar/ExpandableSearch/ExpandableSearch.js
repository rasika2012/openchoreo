import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React, { useRef } from 'react';
import { StyledAutofocusField, StyledExpandableSearch, } from './ExpandableSearch.styled';
import { InputBase } from '@mui/material';
import { IconButton } from '../../../components/IconButton';
import Close from '../../../Icons/generated/Close';
import Search from '../../../Icons/generated/Search';
/**
 * SearchBar component
 * @component
 */
export const AutofocusField = React.forwardRef(({ ...props }, ref) => {
    return (_jsx(StyledAutofocusField, { ref: ref, size: props.size, onChange: props.onChange, onBlur: props.onBlur, className: "search", children: _jsx(InputBase, { inputRef: props.inputReference, value: props.searchQuery, endAdornment: props.searchQuery && (_jsx(IconButton, { onMouseDown: (e) => {
                    props.onClearClick();
                    e.preventDefault();
                }, color: "secondary", size: "tiny", "data-testid": "search-clear-icon", testId: `${props.testId}-clear`, variant: "link", children: _jsx(Close, { fontSize: "inherit" }) })), onChange: (e) => props.onChange(e.target.value), onBlur: () => props.onBlur(props.searchQuery), placeholder: props.placeholder || 'Search...', className: `inputExpandable input${props.size ? props.size.charAt(0).toUpperCase() + props.size.slice(1) : ''}`, "data-testid": props.testId, "aria-label": "text-field", "data-cyid": `${props.testId}-search-field`, fullWidth: true }) }));
});
AutofocusField.displayName = 'AutofocusField';
export const ExpandableSearch = React.forwardRef(({ ...props }, ref) => {
    const inputReference = useRef(null);
    const [isSearchShow, setSearchShow] = React.useState(false);
    const { searchString, setSearchString, direction = 'left', placeholder, testId, size = 'medium', } = props;
    const handleSearchFieldChange = (e) => {
        setSearchString(e.target.value);
    };
    const handleSearchFieldBlur = (e) => {
        if (e.target.value === '') {
            setSearchShow(false);
        }
    };
    const onClearClick = () => {
        if (searchString === '') {
            setSearchShow(false);
        }
        else {
            setSearchString('');
        }
        inputReference?.current?.focus();
    };
    const onSearchClick = () => {
        setSearchShow(true);
        setTimeout(() => {
            inputReference?.current?.focus();
        }, 100);
    };
    return (_jsx(StyledExpandableSearch, { ref: ref, "data-cyid": `${testId}-expandable-search`, direction: direction, isOpen: isSearchShow, children: _jsxs("div", { className: `expandableSearchCont ${isSearchShow ? 'expandableSearchContOpen' : ''}`, children: [(direction === 'left' || (direction === 'right' && isSearchShow)) && (_jsx(IconButton, { onClick: onSearchClick, size: "small", "data-testid": "search-icon", testId: "search-icon", color: "secondary", variant: "text", disabled: isSearchShow, className: "searchIconButton", children: _jsx(Search, { fontSize: "inherit" }) })), _jsx("div", { className: `expandableSearchWrap ${isSearchShow ? 'expandableSearchWrapShow' : ''}`, children: _jsx(InputBase, { inputRef: inputReference, value: searchString, onChange: handleSearchFieldChange, onBlur: handleSearchFieldBlur, placeholder: placeholder || 'Search...', className: `inputExpandable input${size ? size.charAt(0).toUpperCase() + size.slice(1) : ''}`, "data-testid": `${testId}-search-input`, "aria-label": "text-field", "data-cyid": `${testId}-search-field`, fullWidth: true, endAdornment: (isSearchShow || searchString) && (_jsx(IconButton, { onMouseDown: (e) => {
                                onClearClick();
                                e.preventDefault();
                            }, color: "secondary", size: "small", "data-testid": "search-clear-icon", testId: `${testId}-clear`, variant: "link", className: "clearIconButton", children: _jsx(Close, { fontSize: "inherit" }) })) }) }), direction === 'right' && !isSearchShow && (_jsx(IconButton, { onClick: onSearchClick, size: "small", "data-testid": "search-icon", testId: "search-icon", color: "secondary", variant: "text", disabled: isSearchShow, className: "searchIconButton", children: _jsx(Search, { fontSize: "inherit" }) }))] }) }));
});
ExpandableSearch.displayName = 'ExpandableSearch';
//# sourceMappingURL=ExpandableSearch.js.map