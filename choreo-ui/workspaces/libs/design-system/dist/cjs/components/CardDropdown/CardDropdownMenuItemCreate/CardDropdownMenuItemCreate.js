"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CardDropdownMenuItemCreate = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const material_1 = require("@mui/material");
const react_1 = __importDefault(require("react"));
const Add_1 = __importDefault(require("@design-system/Icons/generated/Add"));
const CardDropdownMenuItem_1 = __importDefault(require("../CardDropdownMenuItem"));
exports.CardDropdownMenuItemCreate = react_1.default.forwardRef(({ createText, onClick, disabled = false, testId }) => {
    return ((0, jsx_runtime_1.jsxs)(CardDropdownMenuItem_1.default, { onClick: onClick, "data-cyid": `${testId}-menu-action`, disabled: disabled, sx: (theme) => ({
            color: theme.palette.primary.main,
            alignItems: 'center',
        }), children: [(0, jsx_runtime_1.jsx)(material_1.Box, { sx: (theme) => ({
                    marginRight: theme.spacing(1),
                    fontSize: theme.spacing(1.5),
                    alignItems: 'center',
                    display: 'flex',
                }), className: "createIcon", children: (0, jsx_runtime_1.jsx)(Add_1.default, { fontSize: "inherit" }) }), (0, jsx_runtime_1.jsx)(material_1.Box, { className: "createText", children: createText })] }));
});
exports.CardDropdownMenuItemCreate.displayName = 'CardDropdownMenuItemCreate';
//# sourceMappingURL=CardDropdownMenuItemCreate.js.map