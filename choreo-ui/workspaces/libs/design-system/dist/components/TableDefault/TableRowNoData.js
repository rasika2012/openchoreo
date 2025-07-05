import { jsx as _jsx } from "react/jsx-runtime";
import { TableCell } from './TableCell/TableCell';
import { TableRow } from './TableRow/TableRow';
export const TableRowNoData = ({ 
// testId,
colSpan = 1,
// message = 'No data available',
 }) => {
    return (_jsx(TableRow, { noBorderBottom: true, children: _jsx(TableCell, { colSpan: colSpan }) }));
};
TableRowNoData.displayName = 'TableRowNoData';
//# sourceMappingURL=TableRowNoData.js.map