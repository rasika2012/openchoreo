"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TableRow = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const TableRow_styled_1 = require("./TableRow.styled");
const TableRow = (props) => {
    return (0, jsx_runtime_1.jsx)(TableRow_styled_1.StyledTableRow, { ...props, children: props.children });
};
exports.TableRow = TableRow;
exports.TableRow.displayName = 'TableRow';
//# sourceMappingURL=TableRow.js.map