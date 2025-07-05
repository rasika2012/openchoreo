"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Tag = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = __importDefault(require("react"));
const Tag_styled_1 = require("./Tag.styled");
const icons_material_1 = require("@mui/icons-material");
exports.Tag = react_1.default.forwardRef(({ children, readOnly, ...props }, ref) => {
    return ((0, jsx_runtime_1.jsx)(Tag_styled_1.StyledTag, { ref: ref, ...props, "data-cyid": props.testId, disabled: props.disabled, className: props.className, label: children ? String(children) : undefined, deleteIcon: !readOnly ? (0, jsx_runtime_1.jsx)(icons_material_1.Close, {}) : undefined, onDelete: !readOnly ? props.onClick : undefined, children: children }));
});
exports.Tag.displayName = 'Tag';
//# sourceMappingURL=Tag.js.map