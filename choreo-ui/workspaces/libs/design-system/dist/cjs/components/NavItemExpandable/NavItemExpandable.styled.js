"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StyledSpinIcon = exports.StyledSubNavItemContainer = exports.StyledMainNavItemContainerWithLink = exports.StyledMainNavItemContainer = exports.StyledSubNavContainer = exports.StyledNavItemContainer = void 0;
const material_1 = require("@mui/material");
const react_router_1 = require("react-router");
exports.StyledNavItemContainer = (0, material_1.styled)(material_1.Box)(({ theme, isSubNavVisible, isExpanded, disabled }) => ({
    color: theme.palette.background.default,
    background: (0, material_1.alpha)(theme.palette.primary.main, isSubNavVisible ? 1 : 0.8),
    display: 'flex',
    flexDirection: 'column',
    width: isExpanded ? '100%' : 'fit-content',
    fontSize: '1rem',
    cursor: 'pointer',
    borderRadius: theme.shape.borderRadius,
    overflow: 'hidden',
    opacity: disabled ? 0.5 : 1,
    pointerEvents: disabled ? 'none' : 'auto',
}));
exports.StyledSubNavContainer = (0, material_1.styled)(material_1.Box)(({ theme, isSelected }) => ({
    display: 'flex',
    background: isSelected ? theme.palette.primary.dark : 'transparent',
    cursor: 'pointer',
    width: '100%',
    flexDirection: 'column',
}));
exports.StyledMainNavItemContainer = (0, material_1.styled)(material_1.Box)(({ theme, isExpanded, isSelected, isSubNavVisible }) => ({
    display: 'flex',
    gap: theme.spacing(1),
    background: isSubNavVisible && isSelected
        ? theme.palette.primary.dark
        : !isSubNavVisible && isSelected
            ? (0, material_1.alpha)(theme.palette.primary.light, 0.4)
            : 'transparent',
    alignItems: 'center',
    color: theme.palette.background.default,
    padding: theme.spacing(1.625, 1.5),
    paddingLeft: isExpanded ? theme.spacing(3) : theme.spacing(1.5),
    textDecoration: 'none',
    transition: theme.transitions.create(['background', 'padding'], {
        duration: theme.transitions.duration.short,
    }),
    '&:hover': {
        background: (0, material_1.alpha)(theme.palette.primary.light, 0.4),
    },
}));
exports.StyledMainNavItemContainerWithLink = (0, material_1.styled)(react_router_1.Link)(({ theme, isSelected, isSubNavVisible }) => ({
    display: 'flex',
    gap: theme.spacing(1),
    background: isSubNavVisible && isSelected
        ? theme.palette.primary.dark
        : !isSubNavVisible && isSelected
            ? (0, material_1.alpha)(theme.palette.primary.light, 0.4)
            : 'transparent',
    alignItems: 'center',
    color: theme.palette.background.default,
    padding: theme.spacing(1.625, 2.25),
    textDecoration: 'none',
    transition: theme.transitions.create(['background', 'padding'], {
        duration: theme.transitions.duration.short,
    }),
    '&:hover': {
        background: (0, material_1.alpha)(theme.palette.primary.light, 0.4),
    },
}));
exports.StyledSubNavItemContainer = (0, material_1.styled)(react_router_1.Link)(({ theme, isExpanded, isSelected }) => ({
    display: 'flex',
    gap: theme.spacing(1),
    background: isSelected
        ? (0, material_1.alpha)(theme.palette.primary.light, 0.4)
        : 'transparent',
    alignItems: 'center',
    color: theme.palette.background.default,
    padding: theme.spacing(1.625, 1.5),
    paddingLeft: isExpanded ? theme.spacing(3) : theme.spacing(1.5),
    textDecoration: 'none',
    transition: theme.transitions.create(['background', 'padding'], {
        duration: theme.transitions.duration.short,
    }),
    '&:hover': {
        background: (0, material_1.alpha)(theme.palette.primary.light, 0.4),
    },
}));
exports.StyledSpinIcon = (0, material_1.styled)(material_1.Box)(({ theme, isSubNavVisible, isExpanded }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: 0,
    overflow: 'visible',
    fontSize: '0.5rem',
    padding: isExpanded ? theme.spacing(0.5) : 0,
    transform: isSubNavVisible ? 'rotate(90deg)' : 'rotate(0deg)',
    transition: theme.transitions.create(['transform'], {
        duration: theme.transitions.duration.short,
    }),
}));
//# sourceMappingURL=NavItemExpandable.styled.js.map