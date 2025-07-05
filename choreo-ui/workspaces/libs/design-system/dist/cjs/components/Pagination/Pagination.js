"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Pagination = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = __importDefault(require("react"));
const Pagination_styled_1 = require("./Pagination.styled");
const IconButton_1 = require("../IconButton");
const icons_material_1 = require("@mui/icons-material");
const material_1 = require("@mui/material");
const Select_1 = require("../Select");
/**
 * Pagination component
 * @component
 */
exports.Pagination = react_1.default.forwardRef(({ className, onClick, disabled = false, onPageChange, ...props }, ref) => {
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
    return ((0, jsx_runtime_1.jsxs)(Pagination_styled_1.StyledPagination, { ref: ref, className: className, onClick: onClick, "data-cyid": `${props.testId}-pagination`, children: [(0, jsx_runtime_1.jsxs)(Pagination_styled_1.StyledDiv, { children: [(0, jsx_runtime_1.jsx)(IconButton_1.IconButton, { onClick: handleFirstPageButtonClick, disabled: disabled || isFirstPage, disableRipple: true, "aria-label": "first page", color: "secondary", variant: "text", testId: "first-page", children: (0, jsx_runtime_1.jsx)(icons_material_1.FirstPage, {}) }), (0, jsx_runtime_1.jsx)(IconButton_1.IconButton, { onClick: handleBackButtonClick, disabled: disabled || isFirstPage, disableRipple: true, "aria-label": "previous page", color: "secondary", variant: "text", testId: "previous-page", children: (0, jsx_runtime_1.jsx)(icons_material_1.KeyboardArrowLeft, {}) }), (0, jsx_runtime_1.jsx)(material_1.Typography, { children: displayedRowsLabel }), (0, jsx_runtime_1.jsx)(IconButton_1.IconButton, { onClick: handleNextButtonClick, disabled: disabled || isLastPage, disableRipple: true, "aria-label": "next page", color: "secondary", variant: "text", testId: "next-page", children: (0, jsx_runtime_1.jsx)(icons_material_1.KeyboardArrowRight, {}) }), (0, jsx_runtime_1.jsx)(IconButton_1.IconButton, { onClick: handleLastPageButtonClick, disabled: disabled || isLastPage, disableRipple: true, "aria-label": "last page", color: "secondary", variant: "text", testId: "last-page", children: (0, jsx_runtime_1.jsx)(icons_material_1.LastPage, {}) })] }), (0, jsx_runtime_1.jsx)(material_1.Typography, { children: props.rowsPerPageLabel || 'Rows per page' }), (0, jsx_runtime_1.jsx)(material_1.Box, { children: (0, jsx_runtime_1.jsx)(Select_1.Select, { defaultValue: props.rowsPerPage.toString(), getOptionLabel: (option) => option, onChange: (val) => val && props.onRowsPerPageChange(val), labelId: "pagination-dropdown", name: "pagination-dropdown", options: props.rowsPerPageOptions.map((num) => num.toString()), value: props.rowsPerPage.toString(), size: "small", testId: "pagination-dropdown" }) })] }));
});
exports.Pagination.displayName = 'Pagination';
//# sourceMappingURL=Pagination.js.map