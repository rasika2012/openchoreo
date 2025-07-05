"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TableBody = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const TableBody_styled_1 = require("./TableBody.styled");
const TableBody = (props) => {
    return (0, jsx_runtime_1.jsx)(TableBody_styled_1.StyledTableBody, { ...props, children: props.children });
};
exports.TableBody = TableBody;
exports.TableBody.displayName = 'TableBody';
//# sourceMappingURL=TableBody.js.map