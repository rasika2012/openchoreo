"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Avatar = Avatar;
const jsx_runtime_1 = require("react/jsx-runtime");
const Avatar_styled_1 = require("./Avatar.styled");
function Avatar({ children, ...props }) {
    return ((0, jsx_runtime_1.jsx)(Avatar_styled_1.StyledAvatar, { ...props, children: children }));
}
Avatar.displayName = 'Avatar';
//# sourceMappingURL=Avatar.js.map