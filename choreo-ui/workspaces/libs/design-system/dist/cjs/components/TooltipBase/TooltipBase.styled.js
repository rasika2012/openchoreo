"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StyledTooltipBase = void 0;
const material_1 = require("@mui/material");
exports.StyledTooltipBase = (0, material_1.styled)(material_1.Tooltip, { shouldForwardProp: (prop) => !['disabled'].includes(prop) })(({ theme }) => ({
    '& .MuiTooltip-tooltip': {
        '&.infoTooltipDark': {
            color: theme.palette.grey[300],
            backgroundColor: theme.palette.secondary.dark,
            borderRadius: 5,
        },
        '&.infoTooltipLight': {
            color: theme.palette.secondary.dark,
            backgroundColor: theme.palette.common.white,
            borderRadius: 5,
            maxWidth: theme.spacing(53),
        },
    },
    '& .MuiTooltip-arrow': {
        '&.infoArrowDark': {
            color: theme.palette.secondary.dark,
        },
        '&.infoArrowLight': {
            color: theme.palette.common.white,
        },
    },
}));
//# sourceMappingURL=TooltipBase.styled.js.map