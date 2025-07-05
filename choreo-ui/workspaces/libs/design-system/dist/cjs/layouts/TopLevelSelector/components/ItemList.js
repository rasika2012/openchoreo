"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ItemList = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const material_1 = require("@mui/material");
/**
 * List component for displaying items in the TopLevelSelector popover
 */
const ItemList = ({ title, items, selectedItemId, onSelect, }) => ((0, jsx_runtime_1.jsxs)(material_1.Box, { display: "flex", flexDirection: "column", children: [(0, jsx_runtime_1.jsx)(material_1.Typography, { variant: "body2", color: "text.secondary", children: title }), (0, jsx_runtime_1.jsx)(material_1.List, { children: items.map((item) => ((0, jsx_runtime_1.jsx)(material_1.ListItem, { disablePadding: true, children: (0, jsx_runtime_1.jsx)(material_1.ListItemButton, { onClick: (e) => {
                        e.stopPropagation();
                        e.preventDefault();
                        onSelect(item);
                    }, selected: item.id === selectedItemId, disableRipple: true, children: (0, jsx_runtime_1.jsx)(material_1.ListItemText, { primary: item.label }) }) }, item.id))) })] }));
exports.ItemList = ItemList;
//# sourceMappingURL=ItemList.js.map