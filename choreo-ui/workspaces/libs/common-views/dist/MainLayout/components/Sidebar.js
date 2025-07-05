import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import { useChoreoTheme, useMediaQuery, Box, MenuExpandIcon, MenuCollapseIcon, } from '@open-choreo/design-system';
import React, { useState } from 'react';
import { MenuItem } from './MenuItem';
import { debounce } from 'lodash';
export var Sidebar = React.forwardRef(function (_a, ref) {
    var menuItems = _a.menuItems, selectedMenuItem = _a.selectedMenuItem, onMenuItemClick = _a.onMenuItemClick, isSidebarOpen = _a.isSidebarOpen;
    var theme = useChoreoTheme();
    var isMobile = useMediaQuery('md', 'down');
    var _b = useState(false), isExpanded = _b[0], setIsExpanded = _b[1];
    var _c = useState(false), isExpandSaved = _c[0], setIsExpandSaved = _c[1];
    var isFullWidth = isExpanded || isExpandSaved;
    var handleExpandWithDebouce = debounce(function (state) {
        setIsExpanded(state);
    }, 300);
    return (_jsxs(Box, { height: "100%", display: "flex", position: "relative", ref: ref, children: [(!isMobile && !isExpandSaved) && _jsx(Box, { width: theme.spacing(8) }), _jsxs(Box, { zIndex: 1, backgroundColor: theme.pallet.primary.main, position: isMobile || !isExpandSaved ? 'absolute' : 'relative', transition: theme.transitions.create(['display', 'width'], {
                    duration: 300,
                }), width: isMobile && !isSidebarOpen
                    ? 0
                    : !isFullWidth && !isMobile
                        ? theme.spacing(8)
                        : theme.spacing(30), overflow: "hidden", height: "100%", maxWidth: theme.spacing(40), justifyContent: "space-between", display: "flex", flexDirection: "column", children: [_jsx(Box, { padding: theme.spacing(0.8), display: "flex", flexDirection: "column", alignItems: "flex-start", justifyContent: "flex-start", gap: theme.spacing(0.5), onMouseEnter: function () { return handleExpandWithDebouce(true); }, onMouseLeave: function () { return handleExpandWithDebouce(false); }, children: menuItems === null || menuItems === void 0 ? void 0 : menuItems.map(function (item) { return (_jsx(_Fragment, { children: _jsx(MenuItem, { pathPattern: item.pathPattern, href: item.href, id: item.id, title: item.title, selectedIcon: item.selectedIcon, icon: item.icon, onClick: function (id) { return onMenuItemClick(id); }, isExpanded: isFullWidth || isMobile, selectedKey: selectedMenuItem, subMenuItems: item.subMenuItems }) })); }) }), _jsx(Box, { borderTop: "small", borderColor: theme.pallet.primary.light, children: _jsx(MenuItem, { id: "menu-item-collapse", title: "Collapse", pathPattern: '/', selectedIcon: _jsx(MenuCollapseIcon, { fontSize: "inherit" }), icon: isExpandSaved ? (_jsx(MenuCollapseIcon, { fontSize: "inherit" })) : (_jsx(MenuExpandIcon, { fontSize: "inherit" })), onClick: function () { return setIsExpandSaved(!isExpandSaved); }, isExpanded: isFullWidth }) })] })] }));
});
Sidebar.displayName = 'Sidebar';
//# sourceMappingURL=Sidebar.js.map