import {
  FullPageLoader,
  PageLayout,
  PresetErrorPage,
  ResourceTable,
} from "@open-choreo/common-views";
import { useGlobalState } from "@open-choreo/api-client";
import { ExtentionMounter } from "@open-choreo/plugin-core";
import React from "react";

const ComponentList: React.FC = () => {
  const { componentListQueryResult } = useGlobalState();

  if (componentListQueryResult?.isLoading) {
    return <FullPageLoader />;
  }

  if (!componentListQueryResult?.data) {
    return <PresetErrorPage preset="404" />;
  }

  return (
    <PageLayout testId="component-list" title={"Components List"}>
      <ExtentionMounter extentionPointId={"component-list-page-body"} />
    </PageLayout>
  );
};

export default ComponentList;
