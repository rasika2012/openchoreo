"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TableContainer = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const TableContainer_styled_1 = require("./TableContainer.styled");
const TableContainer = (props) => {
    return ((0, jsx_runtime_1.jsx)(TableContainer_styled_1.StyledTableContainer, { ...props, children: props.children }));
};
exports.TableContainer = TableContainer;
exports.TableContainer.displayName = 'TableContainer';
//# sourceMappingURL=TableContainer.js.map