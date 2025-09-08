import React from "react";
import {
  useBuildPlanes,
  useBuilds,
  useComponentBindings,
  useDeploymentPipeline,
  useEnvironments,
  useWorkloads,
} from "@open-choreo/choreo-context";
import { PageLayout } from "@open-choreo/common-views";
import {
  useComponentHandle,
  useOrgHandle,
  useProjectHandle,
} from "@open-choreo/plugin-core";
import { EnvCardBase } from "@open-choreo/resource-views";
import { getEnvCardStateMachine } from "@open-choreo/state-machine";

const stateMachine = getEnvCardStateMachine();
console.log("###", stateMachine.id);

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
  const { environments } = useEnvironments(orgHandle);
  console.log("###", buildPlanes);
  console.log("###", builds);
  console.log("###", bindings);
  console.log("###dp", deploymentPipeline);
  console.log("###", workloads);
  console.log("###", environments);
  return (
    <PageLayout title="Deployments" testId="deployments-page">
      <EnvCardBase envName="Builds" />
      {environments?.map((env) => (
        <EnvCardBase key={env.name} envName={env.displayName} />
      ))}
    </PageLayout>
  );
}
