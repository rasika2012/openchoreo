"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SearchBar = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = __importDefault(require("react"));
const SearchBar_styled_1 = require("./SearchBar.styled");
const SimpleSelect_1 = require("../SimpleSelect");
const SelectMenuItem_1 = require("../SimpleSelect/SelectMenuItem/SelectMenuItem");
const material_1 = require("@mui/material");
const Search_1 = __importDefault(require("@design-system/Icons/generated/Search"));
const clsx_1 = __importDefault(require("clsx"));
/**
 * SearchBar component
 * @component
 */
exports.SearchBar = react_1.default.forwardRef(({ onChange, onFilterChange, filterValue, filterItems, testId, placeholder, iconPlacement = 'left', size, color, keyDown, bordered, inputValue, ...restProps }, ref) => {
    const handleOnChange = (e) => {
        onChange(e.target.value);
    };
    const isFilter = filterItems && filterItems.length > 0;
    const getEndAdornment = () => {
        if (isFilter) {
            return ((0, jsx_runtime_1.jsx)("div", { className: "filterWrap", children: (0, jsx_runtime_1.jsx)(SimpleSelect_1.SimpleSelect, { testId: `${testId}-filter`, value: filterValue, isSearchBarItem: true, onChange: (event) => {
                        onFilterChange?.(event.target.value);
                    }, resetStyles: true, anchorOrigin: {
                        vertical: 'bottom',
                        horizontal: 'right',
                    }, transformOrigin: {
                        vertical: 'top',
                        horizontal: 'right',
                    }, children: filterItems?.map((item) => ((0, jsx_runtime_1.jsx)(SelectMenuItem_1.SelectMenuItem, { testId: `search-bar-filter-${item.value}`, value: item.value, children: item.label }, item.value))) }) }));
        }
        if (iconPlacement === 'right') {
            return ((0, jsx_runtime_1.jsx)(material_1.Box, { className: "searchIcon", children: (0, jsx_runtime_1.jsx)(Search_1.default, { fontSize: "small" }) }));
        }
    };
    return ((0, jsx_runtime_1.jsx)(SearchBar_styled_1.StyledSearchBar, { "data-cyid": `${testId}-search-bar`, className: "search", ref: ref, size: size, color: color, bordered: bordered, ...restProps, children: (0, jsx_runtime_1.jsx)("div", { className: "search", children: (0, jsx_runtime_1.jsx)(material_1.InputBase, { startAdornment: iconPlacement === 'left' && ((0, jsx_runtime_1.jsx)("div", { className: "searchIcon", children: (0, jsx_runtime_1.jsx)(Search_1.default, { fontSize: "small" }) })), endAdornment: getEndAdornment(), placeholder: placeholder, inputProps: { 'aria-label': 'search' }, onChange: handleOnChange, onKeyDown: keyDown, value: inputValue, "data-cyid": `${testId}-search-bar-input`, className: (0, clsx_1.default)('inputRoot', {
                    inputRootSecondary: color === 'secondary',
                    inputRootBordered: bordered,
                    inputRootFilter: isFilter,
                }), classes: {
                    input: 'input',
                } }) }) }));
});
exports.SearchBar.displayName = 'SearchBar';
//# sourceMappingURL=SearchBar.js.map