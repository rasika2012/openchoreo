import { jsx as _jsx } from "react/jsx-runtime";
import { StyledTableContainer } from './TableContainer.styled';
export const TableContainer = (props) => {
    return (_jsx(StyledTableContainer, { ...props, children: props.children }));
};
TableContainer.displayName = 'TableContainer';
//# sourceMappingURL=TableContainer.js.map