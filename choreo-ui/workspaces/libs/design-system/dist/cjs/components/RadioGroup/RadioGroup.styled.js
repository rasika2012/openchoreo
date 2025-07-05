"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StyledRadioGroup = void 0;
const material_1 = require("@mui/material");
exports.StyledRadioGroup = (0, material_1.styled)(material_1.RadioGroup, {
    shouldForwardProp: (prop) => !['disabled', 'row'].includes(prop),
})(({ theme, disabled, row }) => ({
    display: 'flex',
    flexDirection: row ? 'row' : 'column',
    gap: theme.spacing(1),
    opacity: disabled ? 0.6 : 1,
    cursor: disabled ? 'not-allowed' : 'default',
    pointerEvents: disabled ? 'none' : 'auto',
    root: {
        flexWrap: 'wrap',
    },
    rootRow: {
        flexDirection: 'row',
    },
    rootDefault: {
        gap: theme.spacing(2),
    },
}));
//# sourceMappingURL=RadioGroup.styled.js.map