"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AnimateSlide = AnimateSlide;
const jsx_runtime_1 = require("react/jsx-runtime");
const material_1 = require("@mui/material");
function AnimateSlide(props) {
    const { children, direction = "up", show = true, mountOnEnter = true, unmountOnExit = true } = props;
    return ((0, jsx_runtime_1.jsx)(material_1.Slide, { direction: direction, in: show, mountOnEnter: mountOnEnter, unmountOnExit: unmountOnExit, children: children }));
}
//# sourceMappingURL=AnimateSlide.js.map