"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CardActions = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const material_1 = require("@mui/material");
const StyledCardActions = (0, material_1.styled)(material_1.CardActions)(({ theme }) => ({
    padding: theme.spacing(1),
    '&:last-child': {
        paddingBottom: theme.spacing(1),
    },
    display: 'flex',
    gap: theme.spacing(1),
    paddingTop: theme.spacing(3),
    borderTop: `1px solid ${theme.palette.grey[100]}`,
}));
const CardActions = ({ children, testId, sx, ...rest }) => ((0, jsx_runtime_1.jsx)(StyledCardActions, { "data-cyid": `${testId}-card-actions`, sx: sx, ...rest, children: children }));
exports.CardActions = CardActions;
//# sourceMappingURL=CardActions.js.map