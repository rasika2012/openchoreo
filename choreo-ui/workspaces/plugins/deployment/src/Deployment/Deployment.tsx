import React from "react";
import {
  useBuildPlanes,
  useBuilds,
  useComponentBindings,
  useDeploymentPipeline,
  useWorkloads,
} from "@open-choreo/choreo-context";
import { PageLayout } from "@open-choreo/common-views";
import {
  useComponentHandle,
  useOrgHandle,
  useProjectHandle,
} from "@open-choreo/plugin-core";
import { EnvCardBase } from "@open-choreo/resource-views";

export default function Deployment() {
  const orgHandle = useOrgHandle();
  const projectHandle = useProjectHandle();
  const componentHandle = useComponentHandle();
  const { builds } = useBuilds(orgHandle, projectHandle, componentHandle);
  const { buildPlanes } = useBuildPlanes(orgHandle);
  const { bindings } = useComponentBindings(
    orgHandle,
    projectHandle,
    componentHandle,
  );
  const { deploymentPipeline } = useDeploymentPipeline(
    orgHandle,
    projectHandle,
  );
  const { workloads } = useWorkloads(orgHandle, projectHandle, componentHandle);
  console.log("###", buildPlanes);
  console.log("###", builds);
  console.log("###", bindings);
  console.log("###", deploymentPipeline);
  console.log("###", workloads);
  return (
    <PageLayout title="Deployments" testId="deployments-page">
      <EnvCardBase envName="Builds" />
    </PageLayout>
  );
}
