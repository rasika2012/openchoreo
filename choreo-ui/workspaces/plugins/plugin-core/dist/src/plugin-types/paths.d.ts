export declare enum BasePathPatterns {
    ORG_LEVEL = "organization/:orgHandle",
    PROJECT_LEVEL = "organization/:orgHandle/project/:projectHandle",
    COMPONENT_LEVEL = "organization/:orgHandle/project/:projectHandle/component/:componentHandle"
}
export declare enum PathsPatterns {
    ORG_LEVEL = "organization/:orgHandle/*",
    PROJECT_LEVEL = "organization/:orgHandle/project/:projectHandle/*",
    COMPONENT_LEVEL = "organization/:orgHandle/project/:projectHandle/component/:componentHandle/*"
}
export declare const genaratePath: (params: {
    orgHandle?: string;
    projectHandle?: string;
    componentHandle?: string;
    subPath?: string;
}, searchParams?: Record<string, string>) => string;
export declare const defaultPath = "organization/default";
