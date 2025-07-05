import { jsx as _jsx } from "react/jsx-runtime";
import { CardActionArea as MuiCardActionArea, styled, } from '@mui/material';
const StyledCardActionArea = styled(MuiCardActionArea, {
    shouldForwardProp: (prop) => prop !== 'variant' && prop !== 'fullHeight',
})(({ theme, variant = 'elevation', fullHeight = false }) => ({
    padding: 0,
    border: `1px solid transparent`,
    borderRadius: 'inherit',
    transition: 'all 0.25s',
    '&:hover': {
        borderColor: theme.palette.primary.main,
        backgroundColor: 'transparent',
        '& .MuiCardActionArea-focusHighlight': {
            opacity: 0,
            backgroundColor: `transparent`,
        },
    },
    '&.Mui-disabled': {
        borderColor: theme.palette.grey[100],
    },
    ...(variant === 'outlined' && {
        border: `1px solid ${theme.palette.grey[200]}`,
        '&:hover': {
            borderColor: theme.palette.primary.main,
            backgroundColor: 'transparent',
        },
    }),
    ...(variant === 'elevation' && {
        boxShadow: theme.shadows[1],
        '&:hover': {
            boxShadow: `none`,
            borderColor: theme.palette.primary.main,
            backgroundColor: 'transparent',
        },
    }),
    ...(fullHeight && {
        height: '100%',
    }),
}));
export const CardActionArea = ({ children, variant = 'elevation', testId, fullHeight = false, sx, ...rest }) => (_jsx(StyledCardActionArea, { variant: variant, fullHeight: fullHeight, "data-cyid": `${testId}-card-action-area`, disableRipple: true, sx: sx || { backgroundColor: 'transparent' }, ...rest, children: children }));
//# sourceMappingURL=CardActionArea.js.map