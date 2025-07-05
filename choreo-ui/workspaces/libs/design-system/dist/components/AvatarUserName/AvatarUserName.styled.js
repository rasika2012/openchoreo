import { Box, styled } from '@mui/material';
export const StyledAvatarUserName = styled(Box, {
    shouldForwardProp: (prop) => !['disabled'].includes(prop),
})(({ disabled, theme }) => ({
    opacity: disabled ? 0.5 : 1,
    cursor: disabled ? 'not-allowed' : 'pointer',
    backgroundColor: 'transparent',
    '.avatarUserName': {
        display: 'flex',
        alignItems: 'center',
        gridGap: theme.spacing(1),
    },
    display: 'flex',
    alignItems: 'center',
    textAlign: 'left',
    gap: theme.spacing(1),
    '& span': {
        color: theme.palette.text.primary,
        fontSize: theme.typography.body1.fontSize,
        fontWeight: theme.typography.fontWeightRegular,
    },
    '&:disabled': {
        cursor: 'not-allowed',
        opacity: 0.5,
        pointerEvents: 'none',
    },
    '& .MuiAvatar-root': {
        width: theme.spacing(5),
        height: theme.spacing(5),
        fontSize: theme.typography.body1.fontSize,
        backgroundColor: theme.palette.grey[100],
        color: theme.palette.primary.main,
        fontWeight: theme.typography.fontWeightBold,
    },
}));
//# sourceMappingURL=AvatarUserName.styled.js.map