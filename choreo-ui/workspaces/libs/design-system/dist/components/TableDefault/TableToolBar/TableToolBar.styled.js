import { styled, Toolbar as MUITableToolBar, lighten, } from '@mui/material';
export const StyledTableToolbar = styled(MUITableToolBar, {
    shouldForwardProp: (prop) => prop !== 'numSelected' && prop !== 'theme',
})(({ theme }) => ({
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    root: {
        paddingLeft: theme.spacing(2),
        paddingRight: theme.spacing(1),
        highlight: theme.palette.mode === 'light'
            ? {
                color: theme.palette.secondary.main,
                backgroundColor: lighten(theme.palette.secondary.light, 0.85),
            }
            : {
                color: theme.palette.text.primary,
                backgroundColor: theme.palette.secondary.dark,
            },
    },
    title: {
        flex: '1 1 100%',
    },
    virtualHidden: {
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
}));
//# sourceMappingURL=TableToolBar.styled.js.map