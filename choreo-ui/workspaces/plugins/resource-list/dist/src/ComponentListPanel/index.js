import React from "react";
const ComponentListPanel = React.lazy(() => import("./ComponentListPanel"));
import { projectOverviewMainExtensionPoint } from "@open-choreo/plugin-overview";
import { componentListMainExtensionPoint } from "../ComponentListPage/ComponentList";
export const componentListPanel = {
    extentionPoint: projectOverviewMainExtensionPoint,
    component: ComponentListPanel,
    key: "component-list-panel",
};
export const projectOverviewComponentListPanel = {
    extentionPoint: componentListMainExtensionPoint,
    component: ComponentListPanel,
    key: "component-list-project-overview-panel",
};
//# sourceMappingURL=index.js.map