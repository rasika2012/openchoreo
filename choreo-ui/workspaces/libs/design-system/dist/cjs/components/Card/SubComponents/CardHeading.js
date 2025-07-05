"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CardHeading = CardHeading;
const jsx_runtime_1 = require("react/jsx-runtime");
const material_1 = require("@mui/material");
const Button_1 = require("../../Button");
const Icons_1 = require("@design-system/Icons");
const StyledCardHeading = (0, material_1.styled)(material_1.Box)(({ theme, isForm }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    // padding: theme.spacing(2),
    padding: theme.spacing(5, 5, 0, 5),
    borderBottom: isForm ? `1px solid ${theme.palette.divider}` : 'none',
    '& .btn-close': {
        '&:hover': {
            backgroundColor: theme.palette.grey[100],
        },
    },
}));
function CardHeading(props) {
    const { title, onClose, testId, size = 'medium' } = props;
    return ((0, jsx_runtime_1.jsxs)(StyledCardHeading, { "data-cyid": `${testId}-card-heading`, children: [(0, jsx_runtime_1.jsx)(material_1.Box, { flexGrow: 1, children: (0, jsx_runtime_1.jsx)(material_1.Typography, { variant: size === 'small' ? 'h3' : size === 'medium' ? 'h2' : 'h1', children: title }) }), onClose && ((0, jsx_runtime_1.jsx)(Button_1.Button, { color: "secondary", variant: "text", className: "btn-close", onClick: onClose, testId: "btn-close", endIcon: (0, jsx_runtime_1.jsx)(Icons_1.CloseIcon, {}), children: "Close" }))] }));
}
//# sourceMappingURL=CardHeading.js.map