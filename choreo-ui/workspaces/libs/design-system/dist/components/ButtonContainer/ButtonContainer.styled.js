import styled from '@emotion/styled';
import { Box } from '@mui/material';
export const StyledButtonContainer = styled(Box, {
    shouldForwardProp: (prop) => !['disabled', 'align', 'marginTop'].includes(prop),
})(({ theme, disabled, align = 'left', marginTop, }) => {
    let justifyContent = 'flex-start';
    if (align === 'center')
        justifyContent = 'center';
    else if (align === 'right')
        justifyContent = 'flex-end';
    else if (align === 'space-between')
        justifyContent = 'space-between';
    let marginTopValue = ''; // Initialize as empty string
    if (marginTop === 'sm')
        marginTopValue = theme?.spacing(1);
    else if (marginTop === 'md')
        marginTopValue = theme?.spacing(2);
    else if (marginTop === 'lg')
        marginTopValue = theme?.spacing(3);
    return {
        display: 'flex',
        justifyContent,
        opacity: disabled ? 0.5 : 1,
        cursor: disabled ? 'not-allowed' : 'default',
        marginTop: marginTopValue || 0, // Fallback to 0 if empty string
        gap: theme?.spacing(1),
        '&:hover': {
            backgroundColor: 'inherit',
            color: 'inherit',
        },
        pointerEvents: disabled ? 'none' : 'auto',
    };
});
//# sourceMappingURL=ButtonContainer.styled.js.map