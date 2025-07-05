import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useChoreoTheme, useMediaQuery, Box } from '@open-choreo/design-system';
import React from 'react';
export var ContentArea = React.forwardRef(function (_a, ref) {
    var children = _a.children, rightSidebar = _a.rightSidebar;
    var theme = useChoreoTheme();
    var isMobile = useMediaQuery('md', 'down');
    return (_jsxs(Box, { ref: ref, flexGrow: 1, flexDirection: "row", display: "flex", overflow: "auto", backgroundColor: theme.pallet.background.default, children: [_jsx(Box, { flexGrow: 1, height: "100%", overflow: "auto", children: children }), !isMobile && rightSidebar && (_jsx(Box, { height: "100%", minWidth: theme.spacing(10), maxWidth: theme.spacing(11), borderLeft: "small", borderColor: theme.pallet.grey[200], children: rightSidebar }))] }));
});
ContentArea.displayName = 'ContentArea';
//# sourceMappingURL=ContentArea.js.map