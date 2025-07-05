"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StyledCard = void 0;
const styles_1 = require("@mui/material/styles");
const Card_1 = __importDefault(require("@mui/material/Card"));
const material_1 = require("@mui/material");
exports.StyledCard = (0, styles_1.styled)(Card_1.default)(({ theme }) => ({
    backgroundColor: theme.palette.background.paper,
    border: 'none',
    '&$disabled': {
        boxShadow: 'none',
    },
    '&.MuiPaper-outlined': {
        border: `none`,
    },
    transition: theme.transitions.create(['box-shadow', 'border-color']),
    '&[data-border-radius="xs"]': {
        borderRadius: theme.spacing(0.5),
    },
    '&[data-border-radius="sm"]': {
        borderRadius: theme.spacing(1),
    },
    '&[data-border-radius="md"]': {
        borderRadius: theme.spacing(1.5),
    },
    '&[data-border-radius="lg"]': {
        borderRadius: theme.spacing(2),
        '&[data-box-shadow]': {
            boxShadow: `0 ${theme.spacing(0.5)} ${theme.spacing(6)} ${(0, material_1.alpha)(theme.palette.grey[200], 0.5)}`,
        },
        '&$boxShadowLight': {
            boxShadow: `0 5px 50px ${(0, material_1.alpha)(theme.palette.grey[200], 0.5)}`,
        },
        '&$boxShadowDark': {
            boxShadow: `0 5px 50px ${(0, material_1.alpha)(theme.palette.grey[200], 0.5)}`,
        },
    },
    '&[data-border-radius="square"]': {
        borderRadius: 0,
    },
    '&[data-box-shadow="none"]': {
        boxShadow: 'none',
    },
    '&[data-box-shadow="light"]': {
        boxShadow: `0 0 1px ${theme.palette.secondary.main}, 0 1px ${theme.spacing(0.25)} ${theme.palette.grey[200]}`,
    },
    '&[data-box-shadow="dark"]': {
        boxShadow: `0 1px 1px ${theme.palette.grey[200]}`,
    },
    '&[data-disabled="true"]': {
        pointerEvents: 'none',
        boxShadow: 'none',
        backgroundColor: theme.palette.background.paper,
    },
    '&[data-bg-color="secondary"]': {
        backgroundColor: theme.palette.secondary.light,
    },
}));
//# sourceMappingURL=Card.styled.js.map