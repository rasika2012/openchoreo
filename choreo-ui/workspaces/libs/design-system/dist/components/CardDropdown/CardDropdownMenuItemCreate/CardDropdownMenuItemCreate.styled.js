import { CardDropdown } from '../CardDropdown';
import { styled } from '@mui/material';
export const StyledCardDropdownMenuItemCreate = styled(CardDropdown)(({ theme }) => ({
    '& .createMenuItem': {
        color: theme.palette.primary.main,
        alignItems: 'center',
    },
    '& .createIcon': {
        marginRight: theme.spacing(1),
        fontSize: theme.spacing(1.5),
        alignItems: 'center',
        display: 'flex',
    },
    '& .createText': {},
}));
//# sourceMappingURL=CardDropdownMenuItemCreate.styled.js.map