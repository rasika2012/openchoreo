"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NoDataMessage = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = __importDefault(require("react"));
const NoDataMessage_styled_1 = require("./NoDataMessage.styled");
const react_intl_1 = require("react-intl");
const material_1 = require("@mui/material");
const NoData_1 = __importDefault(require("@design-system/Images/generated/NoData"));
/**
 * NoDataMessage component
 * @component
 */
exports.NoDataMessage = react_1.default.forwardRef(({ message, size = 'md', testId, className, ...props }, ref) => {
    return ((0, jsx_runtime_1.jsxs)(NoDataMessage_styled_1.StyledNoDataMessage, { ref: ref, "data-noData-container": "true", "data-noData-size": size, "data-cyid": `${testId}-no-data-message`, className: className, ...props, children: [(0, jsx_runtime_1.jsx)(material_1.Box, { "data-noData-icon-wrap": "true", "data-noData-icon-size": size, children: (0, jsx_runtime_1.jsx)(NoData_1.default, {}) }), (0, jsx_runtime_1.jsx)(material_1.Box, { "data-noData-message-wrap": "true", "data-noData-message-size": size, children: (0, jsx_runtime_1.jsx)(material_1.Typography, { className: "noDataMessage", variant: size === 'lg' ? 'body1' : size === 'md' ? 'body2' : 'caption', children: message || ((0, jsx_runtime_1.jsx)(react_intl_1.FormattedMessage, { id: "modules.cioDashboard.NoDataMessage.label", defaultMessage: "No data available" })) }) })] }));
});
exports.NoDataMessage.displayName = 'NoDataMessage';
//# sourceMappingURL=NoDataMessage.js.map