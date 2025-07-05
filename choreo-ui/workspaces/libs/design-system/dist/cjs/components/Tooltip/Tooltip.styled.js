"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StyledTooltip = void 0;
const material_1 = require("@mui/material");
exports.StyledTooltip = (0, material_1.styled)(material_1.Tooltip, {
    shouldForwardProp: (prop) => !['disabled'].includes(prop),
})(({ theme }) => ({
    '& .MuiTooltip-tooltip': {
        backgroundColor: theme.palette.background.paper,
        color: theme.palette.text.primary,
        fontSize: theme.typography.body2.fontSize,
        fontFamily: theme.typography.fontFamily,
    },
    '.divider': {
        marginTop: theme.spacing(1),
        marginBottom: theme.spacing(1),
        backgroundColor: theme.palette.grey[100],
    },
    '.buttonLink': {
        color: theme.palette.primary.main,
        cursor: 'pointer',
        marginTop: theme.spacing(1.5),
        textDecoration: 'none',
    },
    '.dividerDark': {
        backgroundColor: theme.palette.grey[500],
    },
    '.exampleContent': {
        fontWeight: 100,
        marginTop: theme.spacing(1),
        marginBottom: theme.spacing(1),
    },
    '.exampleContentDark': {
        color: theme.palette.grey[100],
    },
    '.exampleContentLight': {
        color: theme.palette.secondary.dark,
    },
}));
//# sourceMappingURL=Tooltip.styled.js.map