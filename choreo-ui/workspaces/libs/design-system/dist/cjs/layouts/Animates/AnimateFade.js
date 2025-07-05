"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AnimateFade = AnimateFade;
const jsx_runtime_1 = require("react/jsx-runtime");
const material_1 = require("@mui/material");
function AnimateFade(props) {
    const { children, show = true, mountOnEnter = true, unmountOnExit = true } = props;
    return ((0, jsx_runtime_1.jsx)(material_1.Fade, { in: show, mountOnEnter: mountOnEnter, unmountOnExit: unmountOnExit, children: children }));
}
//# sourceMappingURL=AnimateFade.js.map