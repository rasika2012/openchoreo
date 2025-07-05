"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TableCell = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const TableCell_styled_1 = require("./TableCell.styled");
const TableCell = (props) => {
    return (0, jsx_runtime_1.jsx)(TableCell_styled_1.StyledTableCell, { ...props, children: props.children });
};
exports.TableCell = TableCell;
exports.TableCell.displayName = 'TableCell';
//# sourceMappingURL=TableCell.js.map