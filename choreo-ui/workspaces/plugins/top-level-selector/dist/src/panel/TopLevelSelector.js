import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { AnimateSlide, Box, Level, TopLevelSelector, useChoreoTheme, } from "@open-choreo/design-system";
import { useGlobalState } from "@open-choreo/choreo-context";
import { getResourceDisplayName, getResourceName, } from "@open-choreo/definitions";
import { genaratePath, useComponentHandle, useOrgHandle, useProjectHandle, } from "@open-choreo/plugin-core";
import { useNavigate } from "react-router";
const Panel = () => {
    const theme = useChoreoTheme();
    const { componentListQueryResult, projectListQueryResult, organizationListQueryResult, selectedOrganization, selectedProject, selectedComponent, } = useGlobalState();
    const projectDisplayName = getResourceDisplayName(selectedProject);
    const componentDisplayName = getResourceDisplayName(selectedComponent);
    const orgDisplayName = getResourceDisplayName(selectedOrganization);
    const projectName = getResourceName(selectedProject);
    const componentName = getResourceName(selectedComponent);
    const orgName = getResourceName(selectedOrganization);
    const projectList = projectListQueryResult?.data;
    const componentList = componentListQueryResult?.data;
    const organizationList = organizationListQueryResult?.data;
    const orgHandle = useOrgHandle();
    const projectHandle = useProjectHandle();
    const componentHandle = useComponentHandle();
    const navigate = useNavigate();
    const orgHome = genaratePath({ orgHandle });
    const projectHome = genaratePath({ orgHandle, projectHandle });
    const componentHome = genaratePath({
        orgHandle,
        projectHandle,
        componentHandle,
    });
    const navigateToOrg = (org) => {
        navigate(genaratePath({ orgHandle: org.id }));
    };
    const navigateToProject = (project) => {
        navigate(genaratePath({ orgHandle, projectHandle: project.id }));
    };
    const navigateToComponent = (component) => {
        navigate(genaratePath({ orgHandle, projectHandle, componentHandle: component.id }));
    };
    return (_jsxs(Box, { display: "flex", flexDirection: "row", gap: theme.spacing(1), padding: theme.spacing(0, 2), alignItems: "center", height: "100%", children: [_jsx(TopLevelSelector, { items: organizationList?.data?.items?.map((org) => ({
                    label: getResourceDisplayName(org),
                    id: org.name,
                })), recentItems: [], selectedItem: {
                    label: orgDisplayName,
                    id: orgName,
                }, level: Level.ORGANIZATION, isHighlighted: !projectDisplayName, onClick: () => {
                    navigate(orgHome);
                }, onSelect: (item) => {
                    navigateToOrg(item);
                } }), projectDisplayName && (_jsx(AnimateSlide, { show: !!projectDisplayName, unmountOnExit: true, children: _jsx(TopLevelSelector, { items: projectList?.data.items?.map((project) => ({
                        label: getResourceDisplayName(project),
                        id: project.name,
                    })) || [], recentItems: [], selectedItem: { label: projectDisplayName, id: projectName }, isHighlighted: !componentDisplayName, level: Level.PROJECT, onClose: () => navigate(orgHome), onClick: () => {
                        navigate(projectHome);
                    }, onSelect: (item) => {
                        navigateToProject(item);
                    } }) })), componentDisplayName && (_jsx(AnimateSlide, { show: !!componentDisplayName, unmountOnExit: true, children: _jsx(TopLevelSelector, { items: componentList?.data?.items?.map((component) => ({
                        label: getResourceDisplayName(component),
                        id: component.name,
                    })) || [], recentItems: [], selectedItem: {
                        label: componentDisplayName,
                        id: componentName,
                    }, isHighlighted: true, level: Level.COMPONENT, onClose: () => navigate(projectHome), onClick: () => {
                        navigate(componentHome);
                    }, onSelect: (item) => {
                        navigateToComponent(item);
                    } }) }))] }));
};
export default Panel;
//# sourceMappingURL=TopLevelSelector.js.map