"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.NavItemExpandable = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = __importStar(require("react"));
const NavItemExpandable_styled_1 = require("./NavItemExpandable.styled");
const Icons_1 = require("@design-system/Icons");
const material_1 = require("@mui/material");
/**
 * NavItemExpandable component
 * @component
 */
exports.NavItemExpandable = react_1.default.forwardRef((props, ref) => {
    const { className, onClick, disabled, selectedId, isExpanded, title, icon, selectedIcon, subMenuItems, id, href, } = props;
    const [isSubNavVisible, setIsSubNavVisible] = (0, react_1.useState)(false);
    const theme = (0, material_1.useTheme)();
    const isSelected = (0, react_1.useMemo)(() => id === selectedId ||
        !!subMenuItems?.find((item) => item.id === selectedId), [id, selectedId, subMenuItems]);
    const handleOnClick = (id) => {
        if (!disabled && onClick) {
            onClick(id);
        }
    };
    const handleMainNavItemClick = () => {
        if (!disabled && onClick && !subMenuItems) {
            onClick(id);
        }
        setIsSubNavVisible(!isSubNavVisible);
    };
    const isSubNavExpanded = (0, react_1.useMemo)(() => !!(isSubNavVisible && subMenuItems), [isSubNavVisible, subMenuItems]);
    if (!subMenuItems || subMenuItems.length === 0) {
        return ((0, jsx_runtime_1.jsx)(NavItemExpandable_styled_1.StyledNavItemContainer, { isSubNavVisible: isSubNavExpanded, className: className, isExpanded: isExpanded, disabled: disabled, ref: ref, children: (0, jsx_runtime_1.jsxs)(NavItemExpandable_styled_1.StyledMainNavItemContainerWithLink, { to: href ?? '', onClick: () => handleOnClick(id), isSelected: id === selectedId, children: [isSubNavExpanded ? selectedIcon : icon, isExpanded && ((0, jsx_runtime_1.jsx)(material_1.Typography, { variant: "body2", color: "inherit", children: title }))] }, id) }));
    }
    return ((0, jsx_runtime_1.jsxs)(NavItemExpandable_styled_1.StyledNavItemContainer, { isSubNavVisible: isSubNavExpanded, className: className, isExpanded: isExpanded, disabled: disabled, ref: ref, children: [(0, jsx_runtime_1.jsxs)(NavItemExpandable_styled_1.StyledMainNavItemContainer, { onClick: handleMainNavItemClick, isSelected: isSelected, isSubNavVisible: isSubNavExpanded, children: [(0, jsx_runtime_1.jsxs)(material_1.Box, { flexDirection: "row", display: "flex", flexGrow: 1, alignItems: "center", gap: 1, pl: theme.spacing(0.5), whiteSpace: "nowrap", children: [isSubNavExpanded ? selectedIcon : icon, isExpanded && ((0, jsx_runtime_1.jsx)(material_1.Typography, { variant: "body2", color: "inherit", children: title }))] }), subMenuItems ? ((0, jsx_runtime_1.jsx)(NavItemExpandable_styled_1.StyledSpinIcon, { isSubNavVisible: isSubNavExpanded, children: (0, jsx_runtime_1.jsx)(Icons_1.ChevronRightIcon, { fontSize: "inherit" }) })) : ((0, jsx_runtime_1.jsx)(material_1.Box, {}))] }), (0, jsx_runtime_1.jsx)(material_1.Collapse, { in: isSubNavExpanded, mountOnEnter: true, unmountOnExit: true, children: (0, jsx_runtime_1.jsx)(NavItemExpandable_styled_1.StyledSubNavContainer, { isSelected: isSelected, children: subMenuItems?.map((item) => ((0, jsx_runtime_1.jsx)(NavItemExpandable_styled_1.StyledSubNavItemContainer, { to: item.href ?? '', onClick: () => handleOnClick(item.id), isExpanded: isExpanded, isSelected: item.id === selectedId, children: (0, jsx_runtime_1.jsxs)(material_1.Box, { flexDirection: "row", display: "flex", pl: theme.spacing(0.5), flexGrow: 1, alignItems: "center", gap: 1, children: [item.id === selectedId ? item.selectedIcon : item.icon, isExpanded && ((0, jsx_runtime_1.jsx)(material_1.Typography, { variant: "body2", color: "inherit", noWrap: true, children: item.title }))] }) }, item.id))) }) })] }));
});
exports.NavItemExpandable.displayName = 'NavItemExpandable';
//# sourceMappingURL=NavItemExpandable.js.map