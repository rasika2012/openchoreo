import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Avatar, Box, Button, Card, CardContent, DataTable, DeleteIcon, SearchBar, Tooltip, } from '@open-choreo/design-system';
import { useState } from 'react';
import { useNavigate } from 'react-router';
export function ResourceTable(props) {
    var resources = props.resources;
    var _a = useState(''), searchQuery = _a[0], setSearchQuery = _a[1];
    var navigate = useNavigate();
    var onSearch = function (data) {
        setSearchQuery(data);
    };
    var onDeleteMember = function (idpId, displayName) {
        console.log('Delete member', idpId, displayName);
    };
    var DeleteBtn = function (_a) {
        var onClick = _a.onClick;
        return (_jsxs(Button, { color: "error", onClick: onClick, size: "small", variant: "outlined", testId: "delete-button", children: [_jsx(DeleteIcon, { fontSize: "small" }), "Delete"] }));
    };
    var handleResourceClick = function (resource) {
        navigate(resource.href || '');
    };
    var resourceListColumns = [
        {
            title: 'Resource Name',
            field: 'name',
            width: '25%',
            render: function (rowData) {
                var id = rowData.id, name = rowData.name;
                return (_jsxs(Box, { display: "flex", alignItems: "center", gap: 8, children: [name ? (_jsx(Tooltip, { title: name, placement: "bottom", children: _jsx(Avatar, {}) })) : (_jsx(Tooltip, { title: id, placement: "bottom", children: _jsx(Avatar, {}) })), _jsx(Tooltip, { title: name, placement: "bottom", children: _jsx(Box, { children: name === 'null' || name === null ? (_jsx("span", { children: id })) : (_jsx("span", { children: name })) }) })] }));
            },
        },
        {
            title: 'Description',
            field: 'description',
            width: '25%',
            render: function (rowData) {
                var description = rowData.description;
                return (_jsx(Tooltip, { title: description, placement: "bottom", children: _jsx("span", { children: description || 'No description available' }) }));
            },
        },
        {
            title: 'Type',
            field: 'type',
            width: '25%',
        },
        {
            title: 'Last Updated',
            field: 'lastUpdated',
            align: 'right',
            width: '25%',
            render: function (rowData, isHover) {
                if (isHover && (rowData === null || rowData === void 0 ? void 0 : rowData.id.length) > 0) {
                    return (_jsx(DeleteBtn, { onClick: function (event) {
                            event.stopPropagation();
                            onDeleteMember(rowData === null || rowData === void 0 ? void 0 : rowData.id, rowData === null || rowData === void 0 ? void 0 : rowData.name);
                        } }));
                }
                return rowData.lastUpdated ? (_jsx("span", { children: rowData.lastUpdated })) : (_jsx("span", { children: "Not Available" }));
            },
        },
    ];
    return (_jsx(Box, { children: _jsx(Card, { testId: "resource-table", children: _jsxs(CardContent, { children: [_jsx(Box, { display: "flex", justifyContent: "flex-end", children: _jsx(Box, { width: 300, children: _jsx(SearchBar, { onChange: onSearch, testId: "data-table" }) }) }), _jsx(DataTable, { enableFrontendSearch: true, getRowId: function (rowData) { return rowData.id; }, columns: resourceListColumns, testId: "table", isLoading: false, searchQuery: searchQuery, data: resources, totalRows: resources.length, onRowClick: handleResourceClick })] }) }) }));
}
//# sourceMappingURL=ResourceTable.js.map