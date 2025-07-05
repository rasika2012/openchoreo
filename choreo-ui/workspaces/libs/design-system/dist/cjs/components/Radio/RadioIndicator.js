"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RadioIndicator = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = __importDefault(require("react"));
const Radio_styled_1 = require("./Radio.styled");
exports.RadioIndicator = react_1.default.forwardRef((props) => {
    return ((0, jsx_runtime_1.jsx)(Radio_styled_1.StyledRadioIndicator, { ...props, disableRipple: true, disableFocusRipple: true, disableTouchRipple: true }));
});
exports.RadioIndicator.displayName = 'RadioIndicator';
//# sourceMappingURL=RadioIndicator.js.map