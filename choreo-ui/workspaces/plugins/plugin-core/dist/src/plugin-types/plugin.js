export var PluginExtensionType;
(function (PluginExtensionType) {
    PluginExtensionType["NAVIGATION"] = "nav-item";
    PluginExtensionType["ROUTE"] = "route";
    PluginExtensionType["PANEL"] = "panel";
    PluginExtensionType["PROVIDER"] = "provider";
})(PluginExtensionType || (PluginExtensionType = {}));
export const coreExtensionPoints = {
    globalProvider: {
        id: "global",
        type: PluginExtensionType.PROVIDER,
    },
    componentLevelPage: {
        id: "component-level-page",
        type: PluginExtensionType.ROUTE,
    },
    projectLevelPage: {
        id: "project-level-page",
        type: PluginExtensionType.ROUTE,
    },
    orgLevelPage: {
        id: "org-level-page",
        type: PluginExtensionType.ROUTE,
    },
    globalPage: {
        id: "global-page",
        type: PluginExtensionType.ROUTE,
    },
    headerLeft: {
        id: "header-left",
        type: PluginExtensionType.PANEL,
    },
    headerRight: {
        id: "header-right",
        type: PluginExtensionType.PANEL,
    },
    sidebarRight: {
        id: "sidebar-right",
        type: PluginExtensionType.PANEL,
    },
    componentNavigation: {
        id: "component-navigation",
        type: PluginExtensionType.NAVIGATION,
    },
    projectNavigation: {
        id: "project-navigation",
        type: PluginExtensionType.NAVIGATION,
    },
    orgNavigation: {
        id: "org-navigation",
        type: PluginExtensionType.NAVIGATION,
    },
    footer: {
        id: "footer",
        type: PluginExtensionType.PANEL,
    },
};
//# sourceMappingURL=plugin.js.map