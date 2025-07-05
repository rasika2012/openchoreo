import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React from 'react';
import { StyledNoDataMessage } from './NoDataMessage.styled';
import { FormattedMessage } from 'react-intl';
import { Box, Typography } from '@mui/material';
import NoData from '../../Images/generated/NoData';
/**
 * NoDataMessage component
 * @component
 */
export const NoDataMessage = React.forwardRef(({ message, size = 'md', testId, className, ...props }, ref) => {
    return (_jsxs(StyledNoDataMessage, { ref: ref, "data-noData-container": "true", "data-noData-size": size, "data-cyid": `${testId}-no-data-message`, className: className, ...props, children: [_jsx(Box, { "data-noData-icon-wrap": "true", "data-noData-icon-size": size, children: _jsx(NoData, {}) }), _jsx(Box, { "data-noData-message-wrap": "true", "data-noData-message-size": size, children: _jsx(Typography, { className: "noDataMessage", variant: size === 'lg' ? 'body1' : size === 'md' ? 'body2' : 'caption', children: message || (_jsx(FormattedMessage, { id: "modules.cioDashboard.NoDataMessage.label", defaultMessage: "No data available" })) }) })] }));
});
NoDataMessage.displayName = 'NoDataMessage';
//# sourceMappingURL=NoDataMessage.js.map