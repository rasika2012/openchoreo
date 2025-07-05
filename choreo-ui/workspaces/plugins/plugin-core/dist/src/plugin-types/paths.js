export var BasePathPatterns;
(function (BasePathPatterns) {
    BasePathPatterns["ORG_LEVEL"] = "organization/:orgHandle";
    BasePathPatterns["PROJECT_LEVEL"] = "organization/:orgHandle/project/:projectHandle";
    BasePathPatterns["COMPONENT_LEVEL"] = "organization/:orgHandle/project/:projectHandle/component/:componentHandle";
})(BasePathPatterns || (BasePathPatterns = {}));
export var PathsPatterns;
(function (PathsPatterns) {
    PathsPatterns["ORG_LEVEL"] = "organization/:orgHandle/*";
    PathsPatterns["PROJECT_LEVEL"] = "organization/:orgHandle/project/:projectHandle/*";
    PathsPatterns["COMPONENT_LEVEL"] = "organization/:orgHandle/project/:projectHandle/component/:componentHandle/*";
})(PathsPatterns || (PathsPatterns = {}));
export const genaratePath = (params, searchParams = {}) => {
    const { orgHandle, projectHandle, componentHandle, subPath } = params;
    const searchParamsString = Object.entries(searchParams)
        .map(([key, value]) => `${key}=${value}`)
        .join("&");
    if (componentHandle) {
        return `/organization/${orgHandle}/project/${projectHandle}/component/${componentHandle}${subPath ? `/${subPath}` : ""}?${searchParamsString}`;
    }
    else if (projectHandle) {
        return `/organization/${orgHandle}/project/${projectHandle}${subPath ? `/${subPath}` : ""}?${searchParamsString}`;
    }
    else if (orgHandle) {
        return `/organization/${orgHandle}${subPath ? `/${subPath}` : ""}?${searchParamsString}`;
    }
};
export const defaultPath = "organization/default";
//# sourceMappingURL=paths.js.map