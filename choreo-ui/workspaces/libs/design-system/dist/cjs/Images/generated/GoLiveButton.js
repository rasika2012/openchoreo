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
    return ((0, jsx_runtime_1.jsx)("svg", { ...props, children: (0, jsx_runtime_1.jsx)("g", { children: (0, jsx_runtime_1.jsx)(React.Fragment, { children: (0, jsx_runtime_1.jsxs)("svg", { viewBox: "0 0 107 44", children: [(0, jsx_runtime_1.jsxs)("defs", { children: [(0, jsx_runtime_1.jsx)("rect", { width: "103", height: "40", x: "0", y: "0", rx: "20" }), (0, jsx_runtime_1.jsxs)("filter", { width: "106.8%", height: "117.5%", x: "-3.4%", y: "-6.3%", filterUnits: "objectBoundingBox", children: [(0, jsx_runtime_1.jsx)("feOffset", { dy: "1", in: "SourceAlpha", result: "shadowOffsetOuter1" }), (0, jsx_runtime_1.jsx)("feGaussianBlur", { in: "shadowOffsetOuter1", result: "shadowBlurOuter1", stdDeviation: "1" }), (0, jsx_runtime_1.jsx)("feComposite", { in: "shadowBlurOuter1", in2: "SourceAlpha", operator: "out", result: "shadowBlurOuter1" }), (0, jsx_runtime_1.jsx)("feColorMatrix", { in: "shadowBlurOuter1", values: "0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.15 0" })] }), (0, jsx_runtime_1.jsx)("rect", { width: "103", height: "40", x: "0", y: "0", rx: "20" }), (0, jsx_runtime_1.jsx)("rect", { width: "103", height: "40", x: "0", y: "0", rx: "20" }), (0, jsx_runtime_1.jsxs)("filter", { width: "101%", height: "102.5%", x: "-.5%", y: "-1.3%", filterUnits: "objectBoundingBox", children: [(0, jsx_runtime_1.jsx)("feMorphology", { in: "SourceAlpha", radius: "1", result: "shadowSpreadInner1" }), (0, jsx_runtime_1.jsx)("feOffset", { in: "shadowSpreadInner1", result: "shadowOffsetInner1" }), (0, jsx_runtime_1.jsx)("feComposite", { in: "shadowOffsetInner1", in2: "SourceAlpha", k2: "-1", k3: "1", operator: "arithmetic", result: "shadowInnerInner1" }), (0, jsx_runtime_1.jsx)("feColorMatrix", { in: "shadowInnerInner1", values: "0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.1 0" })] })] }), (0, jsx_runtime_1.jsxs)("g", { fill: "none", fillRule: "evenodd", stroke: "none", "stroke-width": "1", transform: "translate(-667 -399) translate(669 400)", children: [(0, jsx_runtime_1.jsx)("use", { xlinkHref: "#b", fill: "black", filter: "url(#a)" }), (0, jsx_runtime_1.jsx)("use", { xlinkHref: "#b", fill: "#FFFFFF", fillOpacity: "0" }), (0, jsx_runtime_1.jsx)("mask", { fill: "white", children: (0, jsx_runtime_1.jsx)("use", { xlinkHref: "#c" }) }), (0, jsx_runtime_1.jsx)("use", { xlinkHref: "#c", fill: "#D8D8D8" }), (0, jsx_runtime_1.jsx)("g", { fill: "#5567D5", fillRule: "nonzero", mask: "url(#d)", children: (0, jsx_runtime_1.jsx)("rect", { width: "103", height: "40" }) }), (0, jsx_runtime_1.jsx)("use", { xlinkHref: "#e", fill: "#FFFFFF", fillOpacity: "0" }), (0, jsx_runtime_1.jsx)("use", { xlinkHref: "#e", fill: "black", filter: "url(#f)" }), (0, jsx_runtime_1.jsx)("path", { fill: "#FFFFFF", d: "M6.9747 1.0022c.1563.5298-.1464 1.0859-.676 1.2422C3.7696 2.9905 2 5.3224 2 8c0 3.3137 2.6863 6 6 6 2.6623 0 4.984-1.7497 5.7436-4.2584.16-.5286.7183-.8274 1.2469-.6674s.8273.7183.6673 1.2469C14.6446 13.6677 11.5497 16 8 16c-4.4183 0-8-3.5817-8-8C0 4.43 2.359 1.3216 5.7326.3261c.5297-.1563 1.0858.1464 1.2421.6761M16 0v5c0 .5523-.4477 1-1 1-.5128 0-.9355-.386-.9933-.8834L14 5V3.414L8.7071 8.7071c-.3905.3905-1.0237.3905-1.4142 0-.3605-.3605-.3882-.9277-.0832-1.32l.0832-.0942L12.584 2H11c-.5128 0-.9355-.386-.9933-.8834L10 1c0-.5128.386-.9355.8834-.9933L11 0z", transform: "translate(12 12)" })] })] }) }) }) }));
}
//# sourceMappingURL=GoLiveButton.js.map