import { jsx as _jsx } from "react/jsx-runtime";
import { Card, CardContent } from '@open-choreo/design-system';
export var Level;
(function (Level) {
    Level["TOP"] = "top";
    Level["MIDDLE"] = "middle";
    Level["BOTTOM"] = "bottom";
})(Level || (Level = {}));
export var LevelSelector = function (props) {
    var level = props.level;
    return (_jsx(Card, { testId: "card-level-selector-".concat(level), variant: "outlined", children: _jsx(CardContent, { children: "Projects or Components" }) }));
};
//# sourceMappingURL=LevelSelector.js.map