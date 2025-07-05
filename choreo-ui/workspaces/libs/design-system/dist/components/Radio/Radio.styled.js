import { Box, styled, Radio as MuiRadio, } from '@mui/material';
export const StyledRadio = styled(Box, {
    shouldForwardProp: (prop) => !['disabled'].includes(prop),
})(({ theme, disabled }) => ({
    display: 'inline-flex',
    alignItems: 'center',
    cursor: disabled ? 'default' : 'pointer',
    opacity: disabled ? 0.6 : 1,
    pointerEvents: disabled ? 'none' : 'auto',
    radioButton: {
        margin: theme.spacing(-1, 0),
    },
    radioLabelRoot: {
        marginLeft: theme.spacing(-1),
    },
    radioLabelDisabled: {
        color: theme.palette.grey[200],
    },
}));
export const StyledRadioIndicator = styled(MuiRadio)(({ theme, color = 'default' }) => ({
    color: theme.palette.text.primary,
    '&.Mui-checked': {
        color: color === 'primary'
            ? theme.palette.primary.main
            : color === 'secondary'
                ? theme.palette.secondary.main
                : color === 'error'
                    ? theme.palette.error.main
                    : color === 'warning'
                        ? theme.palette.warning.main
                        : color === 'info'
                            ? theme.palette.info.main
                            : color === 'success'
                                ? theme.palette.success.main
                                : color === 'default'
                                    ? theme.palette.text.primary
                                    : theme.palette.primary.main,
    },
    '&.Mui-disabled': {
        color: theme.palette.action.disabled,
    },
}));
//# sourceMappingURL=Radio.styled.js.map