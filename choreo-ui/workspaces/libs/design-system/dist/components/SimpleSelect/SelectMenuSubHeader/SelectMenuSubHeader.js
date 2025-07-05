import { jsx as _jsx } from "react/jsx-runtime";
import { StyledSelectMenuSubHeader } from './SelectMenuSubHeader.styled';
/**
 * SelectMenuSubHeader component
 * @component
 */
export const SelectMenuSubHeader = ({ testId, children, }) => {
    return (_jsx(StyledSelectMenuSubHeader, { className: "selectMenuSubHeader", "data-testid": testId, testId: testId, children: children }));
};
//# sourceMappingURL=SelectMenuSubHeader.js.map