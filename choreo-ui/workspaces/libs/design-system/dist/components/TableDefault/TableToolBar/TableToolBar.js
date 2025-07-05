import { jsxs as _jsxs, jsx as _jsx, Fragment as _Fragment } from "react/jsx-runtime";
import { Box, Tooltip, Typography } from '@mui/material';
import { StyledTableToolbar } from './TableToolBar.styled';
import { IconButton } from '../../../components/IconButton';
import Delete from '../../../Icons/generated/Delete';
import Filters from '../../../Icons/generated/Filters';
export const TableToolbar = ({ numSelected }) => {
    return (_jsxs(StyledTableToolbar, { children: [_jsx(Box, { display: "flex", alignItems: "center", gap: 2, children: numSelected > 0 ? (_jsxs(_Fragment, { children: [_jsxs(Typography, { color: "inherit", variant: "h5", component: "h5", children: [numSelected, " selected"] }), _jsx(Tooltip, { title: "Delete", children: _jsx(IconButton, { color: "secondary", variant: "link", "aria-label": "delete", testId: "delete", children: _jsx(Delete, {}) }) })] })) : (_jsx(Typography, { variant: "h5", component: "h5", children: "Nutrition" })) }), numSelected === 0 && (_jsx(Box, { children: _jsx(Tooltip, { title: "Filter list", children: _jsx(IconButton, { color: "secondary", variant: "link", "aria-label": "filter list", testId: "filters", children: _jsx(Filters, {}) }) }) }))] }));
};
TableToolbar.displayName = 'TableToolbar';
//# sourceMappingURL=TableToolBar.js.map