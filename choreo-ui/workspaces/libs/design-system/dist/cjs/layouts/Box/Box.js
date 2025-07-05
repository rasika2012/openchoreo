"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Box = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = __importDefault(require("react"));
const Box_styled_1 = require("./Box.styled");
/**
 * Box component
 * @component
 */
exports.Box = react_1.default.forwardRef(({ children, className, onMouseEnter, onMouseLeave, ...rest }) => {
    return ((0, jsx_runtime_1.jsx)(Box_styled_1.StyledBox, { className: className, onMouseEnter: onMouseEnter, onMouseLeave: onMouseLeave, ...rest, children: children }));
});
exports.Box.displayName = 'Box';
//# sourceMappingURL=Box.js.map