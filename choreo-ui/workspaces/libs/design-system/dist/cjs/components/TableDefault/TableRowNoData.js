"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TableRowNoData = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const TableCell_1 = require("./TableCell/TableCell");
const TableRow_1 = require("./TableRow/TableRow");
const TableRowNoData = ({ 
// testId,
colSpan = 1,
// message = 'No data available',
 }) => {
    return ((0, jsx_runtime_1.jsx)(TableRow_1.TableRow, { noBorderBottom: true, children: (0, jsx_runtime_1.jsx)(TableCell_1.TableCell, { colSpan: colSpan }) }));
};
exports.TableRowNoData = TableRowNoData;
exports.TableRowNoData.displayName = 'TableRowNoData';
//# sourceMappingURL=TableRowNoData.js.map