import { jsx as _jsx } from "react/jsx-runtime";
import { StyledCard } from './Card.styled';
export const Card = ({ children, borderRadius = 'sm', boxShadow = 'light', disabled = false, variant = 'elevation', testId, fullHeight = false, bgColor = 'default', ...rest }) => (_jsx(StyledCard, { ...rest, "data-cyid": `${testId}-card`, "data-border-radius": borderRadius, "data-box-shadow": boxShadow, "data-disabled": disabled, "data-bg-color": bgColor, variant: variant, style: { ...rest.style }, children: children }));
//# sourceMappingURL=Card.js.map