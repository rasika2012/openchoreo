"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TableToolbar = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const material_1 = require("@mui/material");
const TableToolBar_styled_1 = require("./TableToolBar.styled");
const IconButton_1 = require("@design-system/components/IconButton");
const Delete_1 = __importDefault(require("@design-system/Icons/generated/Delete"));
const Filters_1 = __importDefault(require("@design-system/Icons/generated/Filters"));
const TableToolbar = ({ numSelected }) => {
    return ((0, jsx_runtime_1.jsxs)(TableToolBar_styled_1.StyledTableToolbar, { children: [(0, jsx_runtime_1.jsx)(material_1.Box, { display: "flex", alignItems: "center", gap: 2, children: numSelected > 0 ? ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsxs)(material_1.Typography, { color: "inherit", variant: "h5", component: "h5", children: [numSelected, " selected"] }), (0, jsx_runtime_1.jsx)(material_1.Tooltip, { title: "Delete", children: (0, jsx_runtime_1.jsx)(IconButton_1.IconButton, { color: "secondary", variant: "link", "aria-label": "delete", testId: "delete", children: (0, jsx_runtime_1.jsx)(Delete_1.default, {}) }) })] })) : ((0, jsx_runtime_1.jsx)(material_1.Typography, { variant: "h5", component: "h5", children: "Nutrition" })) }), numSelected === 0 && ((0, jsx_runtime_1.jsx)(material_1.Box, { children: (0, jsx_runtime_1.jsx)(material_1.Tooltip, { title: "Filter list", children: (0, jsx_runtime_1.jsx)(IconButton_1.IconButton, { color: "secondary", variant: "link", "aria-label": "filter list", testId: "filters", children: (0, jsx_runtime_1.jsx)(Filters_1.default, {}) }) }) }))] }));
};
exports.TableToolbar = TableToolbar;
exports.TableToolbar.displayName = 'TableToolbar';
//# sourceMappingURL=TableToolBar.js.map