"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Link = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = __importDefault(require("react"));
const Link_styled_1 = require("./Link.styled");
exports.Link = react_1.default.forwardRef(({ children, ...props }, ref) => {
    return ((0, jsx_runtime_1.jsx)(Link_styled_1.StyledLink, { ref: ref, ...props, testId: `${props.testId}-link`, "data-cyid": `${props.testId}-link`, children: children }));
});
exports.Link.displayName = 'Link';
//# sourceMappingURL=Link.js.map