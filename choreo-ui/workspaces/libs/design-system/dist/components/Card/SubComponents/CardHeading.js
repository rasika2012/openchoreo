import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Box, Typography, styled } from '@mui/material';
import { Button } from '../../Button';
import { CloseIcon } from '../../../Icons';
const StyledCardHeading = styled(Box)(({ theme, isForm }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    // padding: theme.spacing(2),
    padding: theme.spacing(5, 5, 0, 5),
    borderBottom: isForm ? `1px solid ${theme.palette.divider}` : 'none',
    '& .btn-close': {
        '&:hover': {
            backgroundColor: theme.palette.grey[100],
        },
    },
}));
export function CardHeading(props) {
    const { title, onClose, testId, size = 'medium' } = props;
    return (_jsxs(StyledCardHeading, { "data-cyid": `${testId}-card-heading`, children: [_jsx(Box, { flexGrow: 1, children: _jsx(Typography, { variant: size === 'small' ? 'h3' : size === 'medium' ? 'h2' : 'h1', children: title }) }), onClose && (_jsx(Button, { color: "secondary", variant: "text", className: "btn-close", onClick: onClose, testId: "btn-close", endIcon: _jsx(CloseIcon, {}), children: "Close" }))] }));
}
//# sourceMappingURL=CardHeading.js.map