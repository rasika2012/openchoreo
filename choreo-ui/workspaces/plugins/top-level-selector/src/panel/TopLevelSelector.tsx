import {
  AnimateSlide,
  Box,
  Level,
  LevelItem,
  TopLevelSelector,
  useChoreoTheme,
} from "@open-choreo/design-system";
import { useGlobalState } from "@open-choreo/api-client";
import {
  genaratePath,
  useComponentHandle,
  useOrgHandle,
  useProjectHandle,
} from "@open-choreo/plugin-core";
import { useNavigate } from "react-router";

const Panel: React.FC = () => {
  const theme = useChoreoTheme();
  const {
    projectQueryResult,
    componentQueryResult,
    componentListQueryResult,
    projectListQueryResult,
  } = useGlobalState();

  const projectName = projectQueryResult?.data?.metadata?.name;
  const componentName = componentQueryResult?.data?.metadata?.name;
  const projectList = projectListQueryResult?.data;
  const componentList = componentListQueryResult?.data;

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

  const navigateToOrg = (org: LevelItem) => {
    navigate(genaratePath({ orgHandle: org.id }));
  };

  const navigateToProject = (project: LevelItem) => {
    navigate(genaratePath({ orgHandle, projectHandle: project.id }));
  };

  const navigateToComponent = (component: LevelItem) => {
    navigate(
      genaratePath({ orgHandle, projectHandle, componentHandle: component.id }),
    );
  };

  return (
    <Box
      display="flex"
      flexDirection="row"
      gap={theme.spacing(1)}
      padding={theme.spacing(0, 2)}
      alignItems="center"
      height="100%"
    >
      <TopLevelSelector
        items={[]}
        recentItems={[]}
        selectedItem={{ label: "Default", id: "default" }}
        level={Level.ORGANIZATION}
        isHighlighted={!projectName}
        onClick={() => {
          navigate(orgHome);
        }}
        onSelect={(item) => {
          navigateToOrg(item);
        }}
      />
      {projectName && (
        <AnimateSlide show={!!projectName} unmountOnExit>
          <TopLevelSelector
            items={
              projectList?.items?.map((project) => ({
                label: project.metadata.name,
                id: project.metadata.name,
              })) || []
            }
            recentItems={[]}
            selectedItem={{ label: projectName, id: projectName }}
            isHighlighted={!componentName}
            level={Level.PROJECT}
            onClose={() => navigate(orgHome)}
            onClick={() => {
              navigate(projectHome);
            }}
            onSelect={(item) => {
              navigateToProject(item);
            }}
          />
        </AnimateSlide>
      )}
      {componentName && (
        <AnimateSlide show={!!componentName} unmountOnExit>
          <TopLevelSelector
            items={
              componentList?.items?.map((component) => ({
                label: component.metadata.name,
                id: component.metadata.name,
              })) || []
            }
            recentItems={[]}
            selectedItem={{ label: componentName, id: componentName }}
            isHighlighted={true}
            level={Level.COMPONENT}
            onClose={() => navigate(projectHome)}
            onClick={() => {
              navigate(componentHome);
            }}
            onSelect={(item) => {
              navigateToComponent(item);
            }}
          />
        </AnimateSlide>
      )}
    </Box>
  );
};

export default Panel;
