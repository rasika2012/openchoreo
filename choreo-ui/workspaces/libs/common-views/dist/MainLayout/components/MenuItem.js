import { jsx as _jsx } from "react/jsx-runtime";
import { NavItemExpandable } from '@open-choreo/design-system';
export function MenuItem(_a) {
    var id = _a.id, icon = _a.icon, onClick = _a.onClick, selectedKey = _a.selectedKey, subMenuItems = _a.subMenuItems, isExpanded = _a.isExpanded, disabled = _a.disabled, title = _a.title, selectedIcon = _a.selectedIcon, href = _a.href, pathPattern = _a.pathPattern;
    return (_jsx(NavItemExpandable, { id: id, onClick: function (selectedId) { return onClick(selectedId); }, title: title, icon: icon, selectedIcon: selectedIcon, href: href, selectedId: selectedKey, isExpanded: isExpanded, subMenuItems: subMenuItems, disabled: disabled, pathPattern: pathPattern }));
}
//# sourceMappingURL=MenuItem.js.map