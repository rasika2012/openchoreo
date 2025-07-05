"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TableHead = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const TableHead_styled_1 = require("./TableHead.styled");
const TableHead = (props) => {
    return (0, jsx_runtime_1.jsx)(TableHead_styled_1.StyledTableHead, { ...props, children: props.children });
};
exports.TableHead = TableHead;
exports.TableHead.displayName = 'TableHead';
//# sourceMappingURL=TableHead.js.map