import { styled, Link as MuiLink } from '@mui/material';
export const StyledLink = styled(MuiLink)(({ disabled }) => ({
    opacity: disabled ? 0.4 : 1,
    cursor: disabled ? 'default' : 'pointer',
    backgroundColor: 'transparent',
    pointerEvents: disabled ? 'none' : 'auto',
}));
//# sourceMappingURL=Link.styled.js.map