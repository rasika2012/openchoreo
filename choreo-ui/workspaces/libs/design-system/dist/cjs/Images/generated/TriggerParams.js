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
    return ((0, jsx_runtime_1.jsx)("svg", { ...props, children: (0, jsx_runtime_1.jsx)("g", { children: (0, jsx_runtime_1.jsx)(React.Fragment, { children: (0, jsx_runtime_1.jsxs)("svg", { viewBox: "0 0 104 31", children: [(0, jsx_runtime_1.jsx)("defs", { children: (0, jsx_runtime_1.jsxs)("filter", { width: "104", height: "31", x: "0", y: "0", filterUnits: "userSpaceOnUse", children: [(0, jsx_runtime_1.jsx)("feOffset", { dy: "1" }), (0, jsx_runtime_1.jsx)("feGaussianBlur", { result: "blur", stdDeviation: "1" }), (0, jsx_runtime_1.jsx)("feFlood", { "flood-color": "#a9acb6", "flood-opacity": ".302" }), (0, jsx_runtime_1.jsx)("feComposite", { in2: "blur", operator: "in" }), (0, jsx_runtime_1.jsx)("feComposite", { in: "SourceGraphic" })] }) }), (0, jsx_runtime_1.jsx)("g", { filter: "url(#a)", transform: "translate(3.5 2.5) translate(-3.5 -2.5)", children: (0, jsx_runtime_1.jsx)("rect", { width: "97", height: "24", fill: "#f0f1fb", stroke: "#fff", "stroke-miterlimit": "10", "stroke-width": "1", rx: "12", transform: "translate(3.5 2.5)" }) }), (0, jsx_runtime_1.jsx)("text", { fill: "#40404b", "font-family": "GilmerMedium, Gilmer Medium", "font-size": "10", transform: "translate(3.5 2.5) translate(48.5 12)", children: (0, jsx_runtime_1.jsx)("tspan", { x: "-35.83", y: "0", children: "calller, req, self" }) })] }) }) }) }));
}
//# sourceMappingURL=TriggerParams.js.map