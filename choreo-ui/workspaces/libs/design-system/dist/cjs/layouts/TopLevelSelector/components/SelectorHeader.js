"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SelectorHeader = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const material_1 = require("@mui/material");
const Icons_1 = require("@design-system/Icons");
const components_1 = require("@design-system/components");
const utils_1 = require("../utils");
/**
 * Header component for the TopLevelSelector showing the level label and close button
 */
const SelectorHeader = ({ level, onClose }) => ((0, jsx_runtime_1.jsxs)(material_1.Box, { display: "flex", alignItems: "center", justifyContent: "space-between", flexGrow: 1, children: [(0, jsx_runtime_1.jsx)(material_1.Typography, { variant: "body2", fontSize: 11, color: "text.secondary", children: (0, utils_1.getLevelLabel)(level) }), onClose && ((0, jsx_runtime_1.jsx)(components_1.IconButton, { size: "tiny", color: "secondary", disableRipple: true, onClick: (e) => {
                e.stopPropagation();
                onClose?.();
            }, "aria-label": "Close selector", children: (0, jsx_runtime_1.jsx)(Icons_1.CloseIcon, { fontSize: "inherit" }) }))] }));
exports.SelectorHeader = SelectorHeader;
//# sourceMappingURL=SelectorHeader.js.map