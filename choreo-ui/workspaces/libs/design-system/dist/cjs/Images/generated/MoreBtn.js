"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = default_1;
const jsx_runtime_1 = require("react/jsx-runtime");
/* eslint-disable prettier/prettier */
/* eslint-disable max-len */
const React = __importStar(require("react"));
function default_1(props) {
    return ((0, jsx_runtime_1.jsx)("svg", { ...props, children: (0, jsx_runtime_1.jsx)("g", { children: (0, jsx_runtime_1.jsx)(React.Fragment, { children: (0, jsx_runtime_1.jsxs)("svg", { viewBox: "0 0 35 35", children: [(0, jsx_runtime_1.jsxs)("defs", { children: [(0, jsx_runtime_1.jsxs)("linearGradient", { x1: ".5", x2: ".5", y2: "1", gradientUnits: "objectBoundingBox", children: [(0, jsx_runtime_1.jsx)("stop", { offset: "0", "stop-color": "#fff" }), (0, jsx_runtime_1.jsx)("stop", { offset: "1", "stop-color": "#f7f8fb" })] }), (0, jsx_runtime_1.jsxs)("filter", { width: "35", height: "35", x: "0", y: "0", filterUnits: "userSpaceOnUse", children: [(0, jsx_runtime_1.jsx)("feOffset", { dy: "1" }), (0, jsx_runtime_1.jsx)("feGaussianBlur", { result: "blur", stdDeviation: ".5" }), (0, jsx_runtime_1.jsx)("feFlood", { "flood-color": "#cbcfda" }), (0, jsx_runtime_1.jsx)("feComposite", { in2: "blur", operator: "in" }), (0, jsx_runtime_1.jsx)("feComposite", { in: "SourceGraphic" })] })] }), (0, jsx_runtime_1.jsxs)("g", { children: [(0, jsx_runtime_1.jsx)("g", { filter: "url(#a)", transform: "translate(1.5 .5) translate(-1.5 -.5)", children: (0, jsx_runtime_1.jsx)("circle", { cx: "16", cy: "16", r: "16", fill: "url(#b)", transform: "translate(1.5 .5)" }) }), (0, jsx_runtime_1.jsx)("path", { fill: "#8d91a3", d: "M7.465 7.365a1 1 0 0 1 0-1.415l1.12-1.121H1a1 1 0 0 1 0-2h7.586L7.465 1.707A1 1 0 1 1 8.878.293l2.657 2.657a1 1 0 0 1 .278.879 1 1 0 0 1-.278.878L8.878 7.365a1 1 0 0 1-1.414 0Z", transform: "translate(1.5 .5) translate(9 12.172)" })] })] }) }) }) }));
}
//# sourceMappingURL=MoreBtn.js.map