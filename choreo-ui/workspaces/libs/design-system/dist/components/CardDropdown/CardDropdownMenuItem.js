import { MenuItem, styled } from '@mui/material';
export const CardDropdownMenuItem = styled(MenuItem)(({ theme }) => ({
    lineHeight: `${theme.spacing(3)}px`,
    padding: theme.spacing(1, 2),
    '&:focus': {
        backgroundColor: theme.palette.secondary.light,
    },
    '&:hover': {
        backgroundColor: theme.palette.secondary.light,
    },
    '&$selected': {
        backgroundColor: theme.palette.secondary.light,
    },
    selected: {},
}));
export default CardDropdownMenuItem;
//# sourceMappingURL=CardDropdownMenuItem.js.map