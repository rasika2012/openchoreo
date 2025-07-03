import { useGlobalState } from "@open-choreo/api-client";
import { FullPageLoader, PageLayout, PresetErrorPage } from "@open-choreo/common-views";
import { ExtentionMounter } from "@open-choreo/plugin-core";
import React from "react";

const ProjectOverview: React.FC = () => {
  const { projectQueryResult } = useGlobalState();
  if (projectQueryResult?.isLoading) {
    return <FullPageLoader />;
  }

  if (!projectQueryResult?.data) {
    return <PresetErrorPage preset="404" />;
  }

  return (
    <PageLayout
      testId="overview-page"
      title={projectQueryResult?.data?.metadata.name}
    >
      <ExtentionMounter extentionPointId={"project-overview-page-body"} />
    </PageLayout>
  );
};

export default ProjectOverview;
