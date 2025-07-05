import { styled, RadioGroup as MuiRadioGroup } from '@mui/material';
export const StyledRadioGroup = styled(MuiRadioGroup, {
    shouldForwardProp: (prop) => !['disabled', 'row'].includes(prop),
})(({ theme, disabled, row }) => ({
    display: 'flex',
    flexDirection: row ? 'row' : 'column',
    gap: theme.spacing(1),
    opacity: disabled ? 0.6 : 1,
    cursor: disabled ? 'not-allowed' : 'default',
    pointerEvents: disabled ? 'none' : 'auto',
    root: {
        flexWrap: 'wrap',
    },
    rootRow: {
        flexDirection: 'row',
    },
    rootDefault: {
        gap: theme.spacing(2),
    },
}));
//# sourceMappingURL=RadioGroup.styled.js.map