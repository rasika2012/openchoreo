import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React, { useEffect, useMemo, useState } from 'react';
import { StyledDataTable } from './DataTable.styled';
import { Box, CircularProgress } from '@mui/material';
import { TableBody, TableCell, TableContainer, TableDefault, TableHead, TableRow, TableSortLabel, } from '../TableDefault';
import { Pagination } from '../Pagination';
function RenderRow(props) {
    const { rowData, columns, onRowClick } = props;
    const [isHover, setIsHover] = useState(false);
    return (_jsx(TableRow, { onClick: onRowClick, children: _jsx("div", { onMouseEnter: () => setIsHover(true), onMouseLeave: () => setIsHover(false), style: { display: 'contents' }, children: columns.map((col) => {
                const content = col.render
                    ? col.render(rowData, isHover)
                    : rowData[col.field];
                return (_jsx(TableCell, { children: _jsx(Box, { children: content }) }, col.field));
            }) }) }));
}
function useSortData(columns, data, searchQuery, enableFrontendSearch) {
    const filteredData = useMemo(() => {
        if (!searchQuery || !enableFrontendSearch)
            return data;
        return data.filter((item) => columns.some((col) => {
            if (col.customFilterAndSearch) {
                return col.customFilterAndSearch(searchQuery, item);
            }
            const val = item[col.field];
            if (typeof val === 'string') {
                return val.toLowerCase().includes(searchQuery.toLowerCase());
            }
            return false;
        }));
    }, [searchQuery, data]);
    const [sortParams, setSortParams] = useState(null);
    const handlerSort = (field) => {
        const isAsc = sortParams?.orderBy === field && sortParams?.order === 'asc';
        setSortParams({
            orderBy: field,
            order: isAsc ? 'desc' : 'asc',
        });
    };
    const sortedData = useMemo(() => {
        if (!sortParams)
            return filteredData;
        return [...filteredData].sort((a, b) => {
            const aVal = a[sortParams.orderBy];
            const bVal = b[sortParams.orderBy];
            const order = sortParams.order === 'asc' ? 1 : -1;
            if (typeof aVal === 'number' && typeof bVal === 'number') {
                return (aVal - bVal) * order;
            }
            if (typeof aVal === 'string' && typeof bVal === 'string') {
                return aVal.localeCompare(bVal) * order;
            }
            return 0;
        });
    }, [filteredData, sortParams]);
    return { sortParams, handlerSort, sortedData };
}
/**
 * DataTable component
 * @component
 */
export const DataTable = (props) => {
    const { enableFrontendSearch = true, searchQuery, isLoading, testId, columns, data, totalRows, onRowClick, getRowId, ...restProps } = props;
    const { sortParams, handlerSort, sortedData } = useSortData(columns, data, searchQuery, enableFrontendSearch);
    const [page, setPage] = React.useState(0);
    const [originPage, setOriginPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);
    useEffect(() => {
        if (searchQuery && page !== 0) {
            setOriginPage(page);
            setPage(0);
        }
        else if (!searchQuery && page !== originPage) {
            setPage(originPage);
        }
    }, [searchQuery]);
    const pageData = useMemo(() => sortedData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage), [sortedData, page, rowsPerPage]);
    if (isLoading)
        return (_jsx(Box, { className: 'loaderWrapper', children: _jsx(CircularProgress, {}) }));
    return (_jsxs(StyledDataTable, { ref: props.ref, ...restProps, children: [_jsx(TableContainer, { children: _jsxs(TableDefault, { variant: "default", testId: testId, children: [_jsx(TableHead, { "data-cyid": `${testId}-table-columns`, children: _jsx(TableRow, { children: columns.map((col) => {
                                    const sortDirection = sortParams?.orderBy === col.field
                                        ? sortParams?.order
                                        : undefined;
                                    return (_jsx(TableCell, { sortDirection: sortDirection, width: col.width, children: _jsxs(TableSortLabel, { active: sortParams?.orderBy === col.field, direction: sortDirection, onClick: () => handlerSort(col.field), "data-alignment": col.align, children: [col.title, sortParams?.orderBy === col.field ? (_jsx("span", { className: "visually-hidden", children: sortParams.order === 'desc'
                                                        ? 'sorted descending'
                                                        : 'sorted ascending' })) : null] }) }, col.field));
                                }) }) }), _jsxs(TableBody, { "data-cyid": `${testId}-table-rows`, children: [pageData.length === 0 && (_jsx(TableRow, { children: _jsx(TableCell, { colSpan: columns.length, className: "noRecordsTextRow", children: "No records to display" }) })), pageData.map((item) => (_jsx(RenderRow, { rowData: item, columns: columns, onRowClick: () => onRowClick?.(item) }, getRowId(item))))] })] }) }), _jsx(Box, { display: "flex", mb: 2, py: 1, alignItems: "center", children: _jsx(Box, { className: "tablePagination", children: _jsx(Pagination, { rowsPerPageOptions: [5, 10, 15, 20, 25, 50], count: totalRows ?? sortedData.length, rowsPerPage: rowsPerPage, page: page, onPageChange: (_, newPage) => setPage(newPage), onRowsPerPageChange: (v) => setRowsPerPage(Number(v)), rowsPerPageLabel: "Items per page", testId: "items-per-page" }) }) })] }));
};
DataTable.displayName = 'DataTable';
//# sourceMappingURL=DataTable.js.map