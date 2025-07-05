import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useChoreoTheme, useMediaQuery, Box, MenuExpandIcon, MenuCollapseIcon, IconButton, } from '@open-choreo/design-system';
import React from 'react';
export var Header = React.forwardRef(function (_a, ref) {
    var children = _a.children, isSidebarOpen = _a.isSidebarOpen, onSidebarToggle = _a.onSidebarToggle;
    var theme = useChoreoTheme();
    var isMobile = useMediaQuery('md', 'down');
    return (_jsxs(Box, { ref: ref, boxShadow: theme.shadows[1], height: theme.spacing(8), backgroundColor: theme.pallet.background.default, display: "flex", flexDirection: "row", borderBottom: "small", alignItems: "center", borderColor: theme.pallet.grey[200], children: [isMobile && (_jsx(IconButton, { testId: "menuOpen", onClick: onSidebarToggle, children: isSidebarOpen ? (_jsx(MenuCollapseIcon, { fontSize: "inherit" })) : (_jsx(MenuExpandIcon, { fontSize: "inherit" })) })), _jsx(Box, { flexGrow: 1, overflow: 'hidden', display: 'flex', alignItems: 'center', children: children })] }));
});
Header.displayName = 'Header';
//# sourceMappingURL=Header.js.map