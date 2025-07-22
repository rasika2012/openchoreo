import { projectOverviewSecondaryExtensionPoint } from "@open-choreo/plugin-overview";
import React from "react";
const ComponentSummary = React.lazy(() => import("./ComponentSummary"));
export const componentSummary = {
    extentionPoint: projectOverviewSecondaryExtensionPoint,
    component: ComponentSummary,
    key: "component-summary",
};
//# sourceMappingURL=index.js.map