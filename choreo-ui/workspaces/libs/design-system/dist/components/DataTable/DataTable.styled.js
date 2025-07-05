import { Box, styled } from '@mui/material';
export const StyledDataTable = styled(Box)(({ disabled, theme }) => ({
    opacity: disabled ? 0.5 : 1,
    cursor: disabled ? 'not-allowed' : 'pointer',
    backgroundColor: 'transparent',
    '& .loaderWrapper': {
        display: 'flex',
        justifyContent: 'center',
    },
    '&[data-alignment="left"]': {
        display: 'flex',
        justifyContent: 'flex-start',
    },
    '&[data-alignment="right"]': {
        display: 'flex',
        justifyContent: 'flex-end',
    },
    '&[data-alignment="center"]': {
        display: 'flex',
        justifyContent: 'center',
    },
    '& .visually-hidden': {
        border: 0,
        clip: 'rect(0 0 0 0)',
        height: 1,
        margin: -1,
        overflow: 'hidden',
        padding: 0,
        position: 'absolute',
        top: theme.spacing(2.5),
        width: 1,
    },
    '& .noRecordsTextRow': {
        textAlign: 'center',
        verticalAlign: 'middle',
        height: '10vh',
    },
    '& .tablePagination': {
        width: '100%',
    },
    '& .MuiTableRow-head': {
        '&:hover': {
            backgroundColor: 'transparent',
        },
    },
    '& .MuiTableCell-body': {
        verticalAlign: 'middle',
    },
}));
//# sourceMappingURL=DataTable.styled.js.map