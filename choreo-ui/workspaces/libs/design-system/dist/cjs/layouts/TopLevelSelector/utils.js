"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Level = void 0;
exports.getLevelLabel = getLevelLabel;
var Level;
(function (Level) {
    Level["ORGANIZATION"] = "organization";
    Level["PROJECT"] = "project";
    Level["COMPONENT"] = "component";
})(Level || (exports.Level = Level = {}));
function getLevelLabel(level) {
    switch (level) {
        case Level.ORGANIZATION:
            return "Organization";
        case Level.PROJECT:
            return "Project";
        case Level.COMPONENT:
            return "Component";
        default:
            return "Unknown";
    }
}
//# sourceMappingURL=utils.js.map