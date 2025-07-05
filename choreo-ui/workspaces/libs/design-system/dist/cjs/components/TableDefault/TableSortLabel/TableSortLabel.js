"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TableSortLabel = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const TableSortLabel_styled_1 = require("./TableSortLabel.styled");
const TableSortLabel = (props) => {
    return ((0, jsx_runtime_1.jsx)(TableSortLabel_styled_1.StyledTableSortLabel, { ...props, onClick: props.onClick, children: props.children }));
};
exports.TableSortLabel = TableSortLabel;
exports.TableSortLabel.displayName = 'TableSortLabel';
//# sourceMappingURL=TableSortLabel.js.map