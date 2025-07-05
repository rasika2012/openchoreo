import { ListSubheader, } from '@mui/material';
import { styled } from '@mui/material/styles';
export const StyledSelectMenuSubHeader = styled(ListSubheader)(({ theme }) => ({
    '.selectMenuSubHeader': {
        pointerEvents: 'none',
        lineHeight: `${theme.spacing(4)}px`,
        color: theme.palette.secondary.main,
        fontSize: theme.spacing(1.25),
        fontWeight: 700,
        textTransform: 'uppercase',
    },
    '.selectMenuSubHeaderInset': {},
}));
//# sourceMappingURL=SelectMenuSubHeader.styled.js.map