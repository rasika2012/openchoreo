import { jsx as _jsx } from "react/jsx-runtime";
import { CardActions as MuiCardActions, styled, } from '@mui/material';
const StyledCardActions = styled(MuiCardActions)(({ theme }) => ({
    padding: theme.spacing(1),
    '&:last-child': {
        paddingBottom: theme.spacing(1),
    },
    display: 'flex',
    gap: theme.spacing(1),
    paddingTop: theme.spacing(3),
    borderTop: `1px solid ${theme.palette.grey[100]}`,
}));
export const CardActions = ({ children, testId, sx, ...rest }) => (_jsx(StyledCardActions, { "data-cyid": `${testId}-card-actions`, sx: sx, ...rest, children: children }));
//# sourceMappingURL=CardActions.js.map