"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TableDefault = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = __importDefault(require("react"));
const TableDefault_styled_1 = require("./TableDefault.styled");
exports.TableDefault = react_1.default.forwardRef(({ children, className, variant = 'default', testId = undefined }, ref) => {
    return ((0, jsx_runtime_1.jsx)(TableDefault_styled_1.StyledTable, { ref: ref, className: className, variant: variant, "data-testid": testId, children: children }));
});
exports.TableDefault.displayName = 'TableDefault';
//# sourceMappingURL=TableDefault.js.map