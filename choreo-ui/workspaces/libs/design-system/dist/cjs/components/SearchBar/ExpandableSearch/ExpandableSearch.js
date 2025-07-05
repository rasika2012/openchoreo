"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExpandableSearch = exports.AutofocusField = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = __importStar(require("react"));
const ExpandableSearch_styled_1 = require("./ExpandableSearch.styled");
const material_1 = require("@mui/material");
const IconButton_1 = require("@design-system/components/IconButton");
const Close_1 = __importDefault(require("@design-system/Icons/generated/Close"));
const Search_1 = __importDefault(require("@design-system/Icons/generated/Search"));
/**
 * SearchBar component
 * @component
 */
exports.AutofocusField = react_1.default.forwardRef(({ ...props }, ref) => {
    return ((0, jsx_runtime_1.jsx)(ExpandableSearch_styled_1.StyledAutofocusField, { ref: ref, size: props.size, onChange: props.onChange, onBlur: props.onBlur, className: "search", children: (0, jsx_runtime_1.jsx)(material_1.InputBase, { inputRef: props.inputReference, value: props.searchQuery, endAdornment: props.searchQuery && ((0, jsx_runtime_1.jsx)(IconButton_1.IconButton, { onMouseDown: (e) => {
                    props.onClearClick();
                    e.preventDefault();
                }, color: "secondary", size: "tiny", "data-testid": "search-clear-icon", testId: `${props.testId}-clear`, variant: "link", children: (0, jsx_runtime_1.jsx)(Close_1.default, { fontSize: "inherit" }) })), onChange: (e) => props.onChange(e.target.value), onBlur: () => props.onBlur(props.searchQuery), placeholder: props.placeholder || 'Search...', className: `inputExpandable input${props.size ? props.size.charAt(0).toUpperCase() + props.size.slice(1) : ''}`, "data-testid": props.testId, "aria-label": "text-field", "data-cyid": `${props.testId}-search-field`, fullWidth: true }) }));
});
exports.AutofocusField.displayName = 'AutofocusField';
exports.ExpandableSearch = react_1.default.forwardRef(({ ...props }, ref) => {
    const inputReference = (0, react_1.useRef)(null);
    const [isSearchShow, setSearchShow] = react_1.default.useState(false);
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
    return ((0, jsx_runtime_1.jsx)(ExpandableSearch_styled_1.StyledExpandableSearch, { ref: ref, "data-cyid": `${testId}-expandable-search`, direction: direction, isOpen: isSearchShow, children: (0, jsx_runtime_1.jsxs)("div", { className: `expandableSearchCont ${isSearchShow ? 'expandableSearchContOpen' : ''}`, children: [(direction === 'left' || (direction === 'right' && isSearchShow)) && ((0, jsx_runtime_1.jsx)(IconButton_1.IconButton, { onClick: onSearchClick, size: "small", "data-testid": "search-icon", testId: "search-icon", color: "secondary", variant: "text", disabled: isSearchShow, className: "searchIconButton", children: (0, jsx_runtime_1.jsx)(Search_1.default, { fontSize: "inherit" }) })), (0, jsx_runtime_1.jsx)("div", { className: `expandableSearchWrap ${isSearchShow ? 'expandableSearchWrapShow' : ''}`, children: (0, jsx_runtime_1.jsx)(material_1.InputBase, { inputRef: inputReference, value: searchString, onChange: handleSearchFieldChange, onBlur: handleSearchFieldBlur, placeholder: placeholder || 'Search...', className: `inputExpandable input${size ? size.charAt(0).toUpperCase() + size.slice(1) : ''}`, "data-testid": `${testId}-search-input`, "aria-label": "text-field", "data-cyid": `${testId}-search-field`, fullWidth: true, endAdornment: (isSearchShow || searchString) && ((0, jsx_runtime_1.jsx)(IconButton_1.IconButton, { onMouseDown: (e) => {
                                onClearClick();
                                e.preventDefault();
                            }, color: "secondary", size: "small", "data-testid": "search-clear-icon", testId: `${testId}-clear`, variant: "link", className: "clearIconButton", children: (0, jsx_runtime_1.jsx)(Close_1.default, { fontSize: "inherit" }) })) }) }), direction === 'right' && !isSearchShow && ((0, jsx_runtime_1.jsx)(IconButton_1.IconButton, { onClick: onSearchClick, size: "small", "data-testid": "search-icon", testId: "search-icon", color: "secondary", variant: "text", disabled: isSearchShow, className: "searchIconButton", children: (0, jsx_runtime_1.jsx)(Search_1.default, { fontSize: "inherit" }) }))] }) }));
});
exports.ExpandableSearch.displayName = 'ExpandableSearch';
//# sourceMappingURL=ExpandableSearch.js.map