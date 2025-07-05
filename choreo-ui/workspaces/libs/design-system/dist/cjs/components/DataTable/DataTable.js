"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.DataTable = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = __importStar(require("react"));
const DataTable_styled_1 = require("./DataTable.styled");
const material_1 = require("@mui/material");
const TableDefault_1 = require("../TableDefault");
const Pagination_1 = require("../Pagination");
function RenderRow(props) {
    const { rowData, columns, onRowClick } = props;
    const [isHover, setIsHover] = (0, react_1.useState)(false);
    return ((0, jsx_runtime_1.jsx)(TableDefault_1.TableRow, { onClick: onRowClick, children: (0, jsx_runtime_1.jsx)("div", { onMouseEnter: () => setIsHover(true), onMouseLeave: () => setIsHover(false), style: { display: 'contents' }, children: columns.map((col) => {
                const content = col.render
                    ? col.render(rowData, isHover)
                    : rowData[col.field];
                return ((0, jsx_runtime_1.jsx)(TableDefault_1.TableCell, { children: (0, jsx_runtime_1.jsx)(material_1.Box, { children: content }) }, col.field));
            }) }) }));
}
function useSortData(columns, data, searchQuery, enableFrontendSearch) {
    const filteredData = (0, react_1.useMemo)(() => {
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
    const [sortParams, setSortParams] = (0, react_1.useState)(null);
    const handlerSort = (field) => {
        const isAsc = sortParams?.orderBy === field && sortParams?.order === 'asc';
        setSortParams({
            orderBy: field,
            order: isAsc ? 'desc' : 'asc',
        });
    };
    const sortedData = (0, react_1.useMemo)(() => {
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
const DataTable = (props) => {
    const { enableFrontendSearch = true, searchQuery, isLoading, testId, columns, data, totalRows, onRowClick, getRowId, ...restProps } = props;
    const { sortParams, handlerSort, sortedData } = useSortData(columns, data, searchQuery, enableFrontendSearch);
    const [page, setPage] = react_1.default.useState(0);
    const [originPage, setOriginPage] = react_1.default.useState(0);
    const [rowsPerPage, setRowsPerPage] = react_1.default.useState(5);
    (0, react_1.useEffect)(() => {
        if (searchQuery && page !== 0) {
            setOriginPage(page);
            setPage(0);
        }
        else if (!searchQuery && page !== originPage) {
            setPage(originPage);
        }
    }, [searchQuery]);
    const pageData = (0, react_1.useMemo)(() => sortedData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage), [sortedData, page, rowsPerPage]);
    if (isLoading)
        return ((0, jsx_runtime_1.jsx)(material_1.Box, { className: 'loaderWrapper', children: (0, jsx_runtime_1.jsx)(material_1.CircularProgress, {}) }));
    return ((0, jsx_runtime_1.jsxs)(DataTable_styled_1.StyledDataTable, { ref: props.ref, ...restProps, children: [(0, jsx_runtime_1.jsx)(TableDefault_1.TableContainer, { children: (0, jsx_runtime_1.jsxs)(TableDefault_1.TableDefault, { variant: "default", testId: testId, children: [(0, jsx_runtime_1.jsx)(TableDefault_1.TableHead, { "data-cyid": `${testId}-table-columns`, children: (0, jsx_runtime_1.jsx)(TableDefault_1.TableRow, { children: columns.map((col) => {
                                    const sortDirection = sortParams?.orderBy === col.field
                                        ? sortParams?.order
                                        : undefined;
                                    return ((0, jsx_runtime_1.jsx)(TableDefault_1.TableCell, { sortDirection: sortDirection, width: col.width, children: (0, jsx_runtime_1.jsxs)(TableDefault_1.TableSortLabel, { active: sortParams?.orderBy === col.field, direction: sortDirection, onClick: () => handlerSort(col.field), "data-alignment": col.align, children: [col.title, sortParams?.orderBy === col.field ? ((0, jsx_runtime_1.jsx)("span", { className: "visually-hidden", children: sortParams.order === 'desc'
                                                        ? 'sorted descending'
                                                        : 'sorted ascending' })) : null] }) }, col.field));
                                }) }) }), (0, jsx_runtime_1.jsxs)(TableDefault_1.TableBody, { "data-cyid": `${testId}-table-rows`, children: [pageData.length === 0 && ((0, jsx_runtime_1.jsx)(TableDefault_1.TableRow, { children: (0, jsx_runtime_1.jsx)(TableDefault_1.TableCell, { colSpan: columns.length, className: "noRecordsTextRow", children: "No records to display" }) })), pageData.map((item) => ((0, jsx_runtime_1.jsx)(RenderRow, { rowData: item, columns: columns, onRowClick: () => onRowClick?.(item) }, getRowId(item))))] })] }) }), (0, jsx_runtime_1.jsx)(material_1.Box, { display: "flex", mb: 2, py: 1, alignItems: "center", children: (0, jsx_runtime_1.jsx)(material_1.Box, { className: "tablePagination", children: (0, jsx_runtime_1.jsx)(Pagination_1.Pagination, { rowsPerPageOptions: [5, 10, 15, 20, 25, 50], count: totalRows ?? sortedData.length, rowsPerPage: rowsPerPage, page: page, onPageChange: (_, newPage) => setPage(newPage), onRowsPerPageChange: (v) => setRowsPerPage(Number(v)), rowsPerPageLabel: "Items per page", testId: "items-per-page" }) }) })] }));
};
exports.DataTable = DataTable;
exports.DataTable.displayName = 'DataTable';
//# sourceMappingURL=DataTable.js.map