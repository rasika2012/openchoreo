"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SelectMenuItem = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const SelectMenuItem_styled_1 = require("./SelectMenuItem.styled");
const material_1 = require("@mui/material");
const SelectMenuItem = (props) => {
    const { disabled, testId, description, children, ...rest } = props;
    return ((0, jsx_runtime_1.jsx)(SelectMenuItem_styled_1.StyledSelectMenuItem, { testId: testId, disabled: disabled, "data-cyid": `${testId}-select-item`, description: description, ...rest, children: (0, jsx_runtime_1.jsxs)(material_1.Box, { children: [children, description && ((0, jsx_runtime_1.jsx)(material_1.Typography, { variant: "body2", className: "description", children: description }))] }) }));
};
exports.SelectMenuItem = SelectMenuItem;
//# sourceMappingURL=SelectMenuItem.js.map