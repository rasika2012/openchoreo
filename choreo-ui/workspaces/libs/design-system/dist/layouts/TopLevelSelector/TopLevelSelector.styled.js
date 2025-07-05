import { alpha, Card, Popover, styled, } from '@mui/material';
export const StyledTopLevelSelector = styled(Card)(({ disabled, theme, isHighlighted }) => ({
    opacity: disabled ? 0.5 : 1,
    cursor: disabled ? 'not-allowed' : 'pointer',
    pointerEvents: disabled ? 'none' : 'auto',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'space-between',
    justifyContent: 'center',
    height: theme.spacing(5),
    gap: theme.spacing(1),
    backgroundColor: isHighlighted
        ? alpha(theme.palette.primary.light, 0.05)
        : 'transparent',
    borderColor: isHighlighted
        ? theme.palette.primary.main
        : theme.palette.divider,
    transition: theme.transitions.create(['background-color'], {
        duration: theme.transitions.duration.short,
    }),
    '&:hover': {
        backgroundColor: isHighlighted
            ? alpha(theme.palette.primary.light, 0.15)
            : theme.palette.action.hover,
    },
    padding: theme.spacing(0.615),
}));
export const StyledPopover = styled(Popover)(({ theme }) => ({
    '& .MuiPopover-paper': {
        boxShadow: theme.shadows[1],
        width: theme.spacing(40),
    },
}));
//# sourceMappingURL=TopLevelSelector.styled.js.map