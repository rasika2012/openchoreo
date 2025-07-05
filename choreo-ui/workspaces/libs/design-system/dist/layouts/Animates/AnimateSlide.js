import { jsx as _jsx } from "react/jsx-runtime";
import { Slide } from "@mui/material";
export function AnimateSlide(props) {
    const { children, direction = "up", show = true, mountOnEnter = true, unmountOnExit = true } = props;
    return (_jsx(Slide, { direction: direction, in: show, mountOnEnter: mountOnEnter, unmountOnExit: unmountOnExit, children: children }));
}
//# sourceMappingURL=AnimateSlide.js.map