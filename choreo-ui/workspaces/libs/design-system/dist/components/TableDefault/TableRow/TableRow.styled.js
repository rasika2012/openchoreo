import { styled, TableRow as MUITableRow, } from '@mui/material';
export const StyledTableRow = styled(MUITableRow)(({ theme, disabled, noBorderBottom }) => ({
    opacity: disabled ? 0.7 : 1,
    color: disabled ? theme.palette.text.disabled : theme.palette.text.primary,
    cursor: disabled ? 'not-allowed' : 'pointer',
    pointerEvents: disabled ? 'none' : 'auto',
    ...(noBorderBottom && {
        '& .MuiTableCell-root': {
            borderBottom: 'none',
        },
    }),
    '&:hover': {
        backgroundColor: disabled ? 'transparent' : theme.palette.action.hover,
    },
}));
//# sourceMappingURL=TableRow.styled.js.map