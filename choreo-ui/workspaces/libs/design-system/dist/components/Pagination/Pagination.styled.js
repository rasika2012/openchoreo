import { Box, styled } from '@mui/material';
export const StyledPagination = styled(Box)(({ theme }) => ({
    dropdown: {
        width: theme.spacing(8),
        marginLeft: theme.spacing(1),
    },
    color: theme.palette.text.primary,
    display: 'flex',
    alignItems: 'center',
    gap: theme.spacing(1.0),
}));
export const StyledDiv = styled('div')(({ theme }) => ({
    flexShrink: 0,
    marginLeft: theme.spacing(2.5),
    marginRight: theme.spacing(6),
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    flexGrow: 1,
    gridGap: theme.spacing(0.5),
    color: theme.palette.text.primary,
}));
//# sourceMappingURL=Pagination.styled.js.map