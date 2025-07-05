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
Object.defineProperty(exports, "__esModule", { value: true });
exports.TopLevelSelector = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = __importStar(require("react"));
const TopLevelSelector_styled_1 = require("./TopLevelSelector.styled");
const material_1 = require("@mui/material");
const components_1 = require("./components");
/**
 * TopLevelSelector component for selecting items at different levels (Organization, Project, Component)
 * @component
 */
exports.TopLevelSelector = react_1.default.forwardRef(({ items = [], selectedItem, onSelect, isHighlighted = false, disabled = false, onClick, level, recentItems = [], onClose, onCreateNew, className, }, ref) => {
    const [search, setSearch] = (0, react_1.useState)('');
    const [anchorEl, setAnchorEl] = (0, react_1.useState)(null);
    const open = Boolean(anchorEl);
    const handleClick = (0, react_1.useCallback)(() => {
        if (!disabled) {
            onClick?.(level);
        }
    }, [disabled, onClick, level]);
    const handleSelect = (0, react_1.useCallback)((item) => {
        if (!disabled) {
            onSelect(item);
            setAnchorEl(null);
        }
    }, [disabled, onSelect]);
    const handleOpen = (0, react_1.useCallback)((event) => {
        event.stopPropagation();
        event.preventDefault();
        setAnchorEl(event.currentTarget);
    }, []);
    const handleClose = (0, react_1.useCallback)(() => {
        setAnchorEl(null);
        setSearch('');
        onClose?.();
    }, [onClose]);
    const handleSearchChange = (0, react_1.useCallback)((value) => {
        setSearch(value);
    }, []);
    const handleCreateNew = (0, react_1.useCallback)(() => {
        onCreateNew?.();
        setAnchorEl(null);
    }, [onCreateNew]);
    return ((0, jsx_runtime_1.jsxs)(TopLevelSelector_styled_1.StyledTopLevelSelector, { ref: ref, onClick: handleClick, disabled: disabled, variant: "outlined", isHighlighted: isHighlighted, className: className, role: "button", tabIndex: disabled ? -1 : 0, "aria-label": `${level} selector`, "aria-expanded": open, "aria-haspopup": "listbox", children: [(0, jsx_runtime_1.jsxs)(material_1.Box, { display: "flex", flexDirection: "column", children: [(0, jsx_runtime_1.jsx)(components_1.SelectorHeader, { level: level, onClose: onClose }), (0, jsx_runtime_1.jsx)(components_1.SelectorContent, { selectedItem: selectedItem, onOpen: handleOpen, disableMenu: items.length === 0 })] }), (0, jsx_runtime_1.jsx)(TopLevelSelector_styled_1.StyledPopover, { id: `${level}-popover`, open: open, anchorEl: anchorEl, onClose: handleClose, anchorOrigin: {
                    vertical: 'bottom',
                    horizontal: 'left',
                }, transformOrigin: {
                    vertical: 'top',
                    horizontal: 'left',
                }, role: "listbox", "aria-label": `${level} options`, children: (0, jsx_runtime_1.jsx)(components_1.PopoverContent, { search: search, onSearchChange: handleSearchChange, recentItems: recentItems, items: items, selectedItem: selectedItem, onSelect: handleSelect, onCreateNew: onCreateNew && handleCreateNew, level: level }) })] }));
});
exports.TopLevelSelector.displayName = 'TopLevelSelector';
//# sourceMappingURL=TopLevelSelector.js.map