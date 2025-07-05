"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Card = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const Card_styled_1 = require("./Card.styled");
const Card = ({ children, borderRadius = 'sm', boxShadow = 'light', disabled = false, variant = 'elevation', testId, fullHeight = false, bgColor = 'default', ...rest }) => ((0, jsx_runtime_1.jsx)(Card_styled_1.StyledCard, { ...rest, "data-cyid": `${testId}-card`, "data-border-radius": borderRadius, "data-box-shadow": boxShadow, "data-disabled": disabled, "data-bg-color": bgColor, variant: variant, style: { ...rest.style }, children: children }));
exports.Card = Card;
//# sourceMappingURL=Card.js.map