import { jsx as _jsx } from "react/jsx-runtime";
import { StyledTableSortLabel } from './TableSortLabel.styled';
export const TableSortLabel = (props) => {
    return (_jsx(StyledTableSortLabel, { ...props, onClick: props.onClick, children: props.children }));
};
TableSortLabel.displayName = 'TableSortLabel';
//# sourceMappingURL=TableSortLabel.js.map