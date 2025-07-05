import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useChoreoTheme, Box, ImageChoreo, } from '@open-choreo/design-system';
import React, { useState } from 'react';
import { Header, Sidebar, ContentArea, Footer } from './components';
export var MainLayout = React.forwardRef(function (_a, ref) {
    var children = _a.children, className = _a.className, header = _a.header, rightSidebar = _a.rightSidebar, footer = _a.footer, menuItems = _a.menuItems, selectedMenuItem = _a.selectedMenuItem, onMenuItemClick = _a.onMenuItemClick;
    var theme = useChoreoTheme();
    var _b = useState(false), isSidebarOpen = _b[0], setIsSidebarOpen = _b[1];
    return (_jsxs(Box, { ref: ref, className: className, display: "flex", flexDirection: "column", height: "100vh", width: "100%", backgroundColor: theme.pallet.background.default, children: [_jsxs(Header, { isSidebarOpen: isSidebarOpen, onSidebarToggle: function () { return setIsSidebarOpen(!isSidebarOpen); }, children: [_jsx(ImageChoreo, { height: 30, width: 140 }), header] }), _jsxs(Box, { flexGrow: 1, flexDirection: "row", display: "flex", overflow: "hidden", children: [menuItems && (_jsx(Sidebar, { menuItems: menuItems, selectedMenuItem: selectedMenuItem, onMenuItemClick: onMenuItemClick, isSidebarOpen: isSidebarOpen })), _jsxs(Box, { flexGrow: 1, flexDirection: "column", display: "flex", children: [_jsx(ContentArea, { rightSidebar: rightSidebar, children: children }), _jsx(Footer, { children: footer })] })] })] }));
});
MainLayout.displayName = 'MainLayout';
//# sourceMappingURL=MainLayout.js.map