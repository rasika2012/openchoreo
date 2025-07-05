import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { StyledSelectMenuItem } from './SelectMenuItem.styled';
import { Box, Typography } from '@mui/material';
export const SelectMenuItem = (props) => {
    const { disabled, testId, description, children, ...rest } = props;
    return (_jsx(StyledSelectMenuItem, { testId: testId, disabled: disabled, "data-cyid": `${testId}-select-item`, description: description, ...rest, children: _jsxs(Box, { children: [children, description && (_jsx(Typography, { variant: "body2", className: "description", children: description }))] }) }));
};
//# sourceMappingURL=SelectMenuItem.js.map