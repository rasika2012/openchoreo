import { Box, styled } from "@mui/material";
export const StyledRotate = styled(Box)(({ disabled }) => ({
    animation: disabled ? 'none' : 'spin 1s linear infinite',
    width: 'fit-content',
    height: 'fit-content',
    display: 'flex',
    placeItems: 'center',
    '@keyframes spin': {
        '0%': {
            transform: 'rotate(0deg)',
        },
        '100%': {
            transform: 'rotate(360deg)',
        },
    },
}));
//# sourceMappingURL=Rotate.styled.js.map