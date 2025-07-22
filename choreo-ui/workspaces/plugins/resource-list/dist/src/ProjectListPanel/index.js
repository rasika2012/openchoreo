import { organizationOverviewMainExtensionPoint } from "@open-choreo/plugin-overview";
import { ProjectListPanel } from "./ProjectListPanel";
export { organizationOverviewActionsExtensionPoint } from "./ProjectListPanel";
export const projectListPanel = {
    extentionPoint: organizationOverviewMainExtensionPoint,
    component: ProjectListPanel,
    key: "project-list-panel",
};
//# sourceMappingURL=index.js.map