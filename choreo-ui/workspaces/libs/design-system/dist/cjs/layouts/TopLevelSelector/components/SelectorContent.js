"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SelectorContent = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const material_1 = require("@mui/material");
const Icons_1 = require("@design-system/Icons");
const components_1 = require("@design-system/components");
/**
 * Content component for the TopLevelSelector showing the selected item and dropdown button
 */
const SelectorContent = ({ selectedItem, onOpen, disableMenu = false, }) => ((0, jsx_runtime_1.jsxs)(material_1.Box, { display: "flex", alignItems: "center", gap: 1, marginRight: 5, children: [(0, jsx_runtime_1.jsx)(material_1.Typography, { variant: "body1", fontSize: 14, fontWeight: 450, color: "text.primary", children: selectedItem.label }), !disableMenu && (0, jsx_runtime_1.jsx)(components_1.IconButton, { size: "tiny", disableRipple: true, onClick: onOpen, "aria-label": "Open selector menu", children: (0, jsx_runtime_1.jsx)(Icons_1.ChevronDownIcon, {}) })] }));
exports.SelectorContent = SelectorContent;
//# sourceMappingURL=SelectorContent.js.map