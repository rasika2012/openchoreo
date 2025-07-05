import { jsx as _jsx } from "react/jsx-runtime";
import { Fade } from "@mui/material";
export function AnimateFade(props) {
    const { children, show = true, mountOnEnter = true, unmountOnExit = true } = props;
    return (_jsx(Fade, { in: show, mountOnEnter: mountOnEnter, unmountOnExit: unmountOnExit, children: children }));
}
//# sourceMappingURL=AnimateFade.js.map