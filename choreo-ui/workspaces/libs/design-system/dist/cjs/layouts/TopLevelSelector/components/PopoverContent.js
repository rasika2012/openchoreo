"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PopoverContent = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const material_1 = require("@mui/material");
const Icons_1 = require("@design-system/Icons");
const components_1 = require("@design-system/components");
const ItemList_1 = require("./ItemList");
const utils_1 = require("../utils");
/**
 * Content component for the TopLevelSelector popover containing search, create button, and item lists
 */
const PopoverContent = ({ search, onSearchChange, recentItems, items, selectedItem, onSelect, onCreateNew, level, }) => {
    const filteredItems = (0, react_1.useMemo)(() => {
        if (!search.trim())
            return items;
        return items.filter((item) => item.label.toLowerCase().includes(search.toLowerCase()));
    }, [items, search]);
    const filteredRecentItems = (0, react_1.useMemo)(() => {
        if (!search.trim())
            return recentItems;
        return recentItems.filter((item) => item.label.toLowerCase().includes(search.toLowerCase()));
    }, [recentItems, search]);
    return ((0, jsx_runtime_1.jsxs)(material_1.Box, { display: "flex", flexDirection: "column", gap: 1, p: 1, children: [(0, jsx_runtime_1.jsx)(components_1.SearchBar, { inputValue: search, onChange: onSearchChange, testId: "top-level-selector-search", placeholder: "Search" }), onCreateNew && ((0, jsx_runtime_1.jsx)(material_1.Box, { display: "flex", gap: 1, children: (0, jsx_runtime_1.jsxs)(components_1.Button, { variant: "text", startIcon: (0, jsx_runtime_1.jsx)(Icons_1.AddIcon, { fontSize: "inherit" }), onClick: onCreateNew, disableRipple: true, children: ["Create ", (0, utils_1.getLevelLabel)(level)] }) })), filteredRecentItems.length > 0 && ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)(material_1.Divider, {}), (0, jsx_runtime_1.jsx)(ItemList_1.ItemList, { title: "Recent", items: filteredRecentItems, onSelect: onSelect })] })), filteredItems.length > 0 && ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)(material_1.Divider, {}), (0, jsx_runtime_1.jsx)(ItemList_1.ItemList, { title: `All ${(0, utils_1.getLevelLabel)(level)}s`, items: filteredItems, selectedItemId: selectedItem.id, onSelect: onSelect })] }))] }));
};
exports.PopoverContent = PopoverContent;
//# sourceMappingURL=PopoverContent.js.map