import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React from 'react';
import { StyledPagination, StyledDiv } from './Pagination.styled';
import { IconButton } from '../IconButton';
import { FirstPage, KeyboardArrowLeft, KeyboardArrowRight, LastPage, } from '@mui/icons-material';
import { Typography, Box } from '@mui/material';
import { Select } from '../Select';
/**
 * Pagination component
 * @component
 */
export const Pagination = React.forwardRef(({ className, onClick, disabled = false, onPageChange, ...props }, ref) => {
    const totalPages = Math.ceil((props.count ?? 0) / props.rowsPerPage);
    const from = props.page * props.rowsPerPage + 1;
    const to = Math.min((props.page + 1) * props.rowsPerPage, props.count ?? 0);
    const displayedRowsLabel = `${from}–${to} of ${props.count ?? 0}`;
    const handleFirstPageButtonClick = (event) => {
        if (props.page > 0) {
            onPageChange(event, 0);
        }
    };
    const handleBackButtonClick = (event) => {
        if (props.page > 0) {
            onPageChange(event, props.page - 1);
        }
    };
    const handleNextButtonClick = (event) => {
        if (props.page < totalPages - 1) {
            onPageChange(event, props.page + 1);
        }
    };
    const handleLastPageButtonClick = (event) => {
        const lastPage = Math.max(0, totalPages - 1);
        if (props.page < lastPage) {
            onPageChange(event, lastPage);
        }
    };
    const isFirstPage = props.page === 0;
    const isLastPage = props.page >= totalPages - 1;
    return (_jsxs(StyledPagination, { ref: ref, className: className, onClick: onClick, "data-cyid": `${props.testId}-pagination`, children: [_jsxs(StyledDiv, { children: [_jsx(IconButton, { onClick: handleFirstPageButtonClick, disabled: disabled || isFirstPage, disableRipple: true, "aria-label": "first page", color: "secondary", variant: "text", testId: "first-page", children: _jsx(FirstPage, {}) }), _jsx(IconButton, { onClick: handleBackButtonClick, disabled: disabled || isFirstPage, disableRipple: true, "aria-label": "previous page", color: "secondary", variant: "text", testId: "previous-page", children: _jsx(KeyboardArrowLeft, {}) }), _jsx(Typography, { children: displayedRowsLabel }), _jsx(IconButton, { onClick: handleNextButtonClick, disabled: disabled || isLastPage, disableRipple: true, "aria-label": "next page", color: "secondary", variant: "text", testId: "next-page", children: _jsx(KeyboardArrowRight, {}) }), _jsx(IconButton, { onClick: handleLastPageButtonClick, disabled: disabled || isLastPage, disableRipple: true, "aria-label": "last page", color: "secondary", variant: "text", testId: "last-page", children: _jsx(LastPage, {}) })] }), _jsx(Typography, { children: props.rowsPerPageLabel || 'Rows per page' }), _jsx(Box, { children: _jsx(Select, { defaultValue: props.rowsPerPage.toString(), getOptionLabel: (option) => option, onChange: (val) => val && props.onRowsPerPageChange(val), labelId: "pagination-dropdown", name: "pagination-dropdown", options: props.rowsPerPageOptions.map((num) => num.toString()), value: props.rowsPerPage.toString(), size: "small", testId: "pagination-dropdown" }) })] }));
});
Pagination.displayName = 'Pagination';
//# sourceMappingURL=Pagination.js.map