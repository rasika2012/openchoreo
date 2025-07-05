import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React, { useMemo, useState } from 'react';
import { StyledMainNavItemContainer, StyledMainNavItemContainerWithLink, StyledNavItemContainer, StyledSpinIcon, StyledSubNavContainer, StyledSubNavItemContainer, } from './NavItemExpandable.styled';
import { ChevronRightIcon } from '../../Icons';
import { Box, Collapse, Typography, useTheme } from '@mui/material';
/**
 * NavItemExpandable component
 * @component
 */
export const NavItemExpandable = React.forwardRef((props, ref) => {
    const { className, onClick, disabled, selectedId, isExpanded, title, icon, selectedIcon, subMenuItems, id, href, } = props;
    const [isSubNavVisible, setIsSubNavVisible] = useState(false);
    const theme = useTheme();
    const isSelected = useMemo(() => id === selectedId ||
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
    const isSubNavExpanded = useMemo(() => !!(isSubNavVisible && subMenuItems), [isSubNavVisible, subMenuItems]);
    if (!subMenuItems || subMenuItems.length === 0) {
        return (_jsx(StyledNavItemContainer, { isSubNavVisible: isSubNavExpanded, className: className, isExpanded: isExpanded, disabled: disabled, ref: ref, children: _jsxs(StyledMainNavItemContainerWithLink, { to: href ?? '', onClick: () => handleOnClick(id), isSelected: id === selectedId, children: [isSubNavExpanded ? selectedIcon : icon, isExpanded && (_jsx(Typography, { variant: "body2", color: "inherit", children: title }))] }, id) }));
    }
    return (_jsxs(StyledNavItemContainer, { isSubNavVisible: isSubNavExpanded, className: className, isExpanded: isExpanded, disabled: disabled, ref: ref, children: [_jsxs(StyledMainNavItemContainer, { onClick: handleMainNavItemClick, isSelected: isSelected, isSubNavVisible: isSubNavExpanded, children: [_jsxs(Box, { flexDirection: "row", display: "flex", flexGrow: 1, alignItems: "center", gap: 1, pl: theme.spacing(0.5), whiteSpace: "nowrap", children: [isSubNavExpanded ? selectedIcon : icon, isExpanded && (_jsx(Typography, { variant: "body2", color: "inherit", children: title }))] }), subMenuItems ? (_jsx(StyledSpinIcon, { isSubNavVisible: isSubNavExpanded, children: _jsx(ChevronRightIcon, { fontSize: "inherit" }) })) : (_jsx(Box, {}))] }), _jsx(Collapse, { in: isSubNavExpanded, mountOnEnter: true, unmountOnExit: true, children: _jsx(StyledSubNavContainer, { isSelected: isSelected, children: subMenuItems?.map((item) => (_jsx(StyledSubNavItemContainer, { to: item.href ?? '', onClick: () => handleOnClick(item.id), isExpanded: isExpanded, isSelected: item.id === selectedId, children: _jsxs(Box, { flexDirection: "row", display: "flex", pl: theme.spacing(0.5), flexGrow: 1, alignItems: "center", gap: 1, children: [item.id === selectedId ? item.selectedIcon : item.icon, isExpanded && (_jsx(Typography, { variant: "body2", color: "inherit", noWrap: true, children: item.title }))] }) }, item.id))) }) })] }));
});
NavItemExpandable.displayName = 'NavItemExpandable';
//# sourceMappingURL=NavItemExpandable.js.map