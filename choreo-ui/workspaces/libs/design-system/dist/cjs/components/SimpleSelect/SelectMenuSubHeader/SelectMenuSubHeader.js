"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SelectMenuSubHeader = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const SelectMenuSubHeader_styled_1 = require("./SelectMenuSubHeader.styled");
/**
 * SelectMenuSubHeader component
 * @component
 */
const SelectMenuSubHeader = ({ testId, children, }) => {
    return ((0, jsx_runtime_1.jsx)(SelectMenuSubHeader_styled_1.StyledSelectMenuSubHeader, { className: "selectMenuSubHeader", "data-testid": testId, testId: testId, children: children }));
};
exports.SelectMenuSubHeader = SelectMenuSubHeader;
//# sourceMappingURL=SelectMenuSubHeader.js.map