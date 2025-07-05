"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RadioGroup = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = __importDefault(require("react"));
const RadioGroup_styled_1 = require("./RadioGroup.styled");
/**
 * RadioGroup component
 * @component
 */
exports.RadioGroup = react_1.default.forwardRef(({ children, className, onClick, disabled = false, ...props }) => {
    return ((0, jsx_runtime_1.jsx)(RadioGroup_styled_1.StyledRadioGroup, { className: className, onClick: disabled ? undefined : onClick, disabled: disabled, row: props.row, ...props, children: disabled
            ? react_1.default.Children.map(children, (child) => {
                if (react_1.default.isValidElement(child)) {
                    return react_1.default.cloneElement(child, {
                        disabled: true,
                    });
                }
                return child;
            })
            : children }));
});
exports.RadioGroup.displayName = 'RadioGroup';
//# sourceMappingURL=RadioGroup.js.map