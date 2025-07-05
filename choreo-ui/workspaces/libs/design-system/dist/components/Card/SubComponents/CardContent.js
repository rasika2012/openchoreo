import { jsx as _jsx } from "react/jsx-runtime";
import { CardContent as MuiCardContent, styled, } from '@mui/material';
const StyledCardContent = styled(MuiCardContent, {
    shouldForwardProp: (prop) => prop !== 'paddingSize' && prop !== 'fullHeight',
})(({ theme, paddingSize = 'lg', fullHeight = false }) => ({
    padding: paddingSize === 'lg' ? theme.spacing(3) : theme.spacing(2),
    '&:last-child': {
        paddingBottom: paddingSize === 'lg' ? theme.spacing(3) : theme.spacing(2),
    },
    ...(fullHeight && {
        height: '100%',
    }),
}));
export const CardContent = ({ children, paddingSize = 'lg', fullHeight = false, testId, sx, }) => (_jsx(StyledCardContent, { paddingSize: paddingSize, fullHeight: fullHeight, "data-cyid": testId ? `${testId}-card-content` : undefined, sx: sx, children: children }));
//# sourceMappingURL=CardContent.js.map