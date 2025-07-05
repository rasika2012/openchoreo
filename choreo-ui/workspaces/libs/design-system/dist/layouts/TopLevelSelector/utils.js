export var Level;
(function (Level) {
    Level["ORGANIZATION"] = "organization";
    Level["PROJECT"] = "project";
    Level["COMPONENT"] = "component";
})(Level || (Level = {}));
export function getLevelLabel(level) {
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