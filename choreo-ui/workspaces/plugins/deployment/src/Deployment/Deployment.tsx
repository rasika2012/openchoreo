import React, { useMemo } from "react";
import {
  useBuildPlanes,
  useBuilds,
  useComponentBindings,
  useCreateWorkload,
  useDeploymentPipeline,
  useEnvironments,
  useWorkloads,
} from "@open-choreo/choreo-context";
import { PageLayout } from "@open-choreo/common-views";
import { Button } from "@open-choreo/design-system";
import {
  useComponentHandle,
  useOrgHandle,
  useProjectHandle,
} from "@open-choreo/plugin-core";
import { EnvCardBase, EnvDeploymentContent } from "@open-choreo/resource-views";
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
  const { createWorkload } = useCreateWorkload(
    orgHandle,
    projectHandle,
    componentHandle,
  );
  const { environments } = useEnvironments(orgHandle);

  const enrichedEnvironments = useMemo(
    () =>
      environments?.map((env) => ({
        ...env,
        binding: bindings?.data?.items?.find(
          (binding) => binding.environment === env.name,
        ),
      })),
    [environments, bindings],
  );

  console.log("###", {
    enrichedEnvironments,
    deploymentPipeline,
    environments,
    workloads,
    builds,
    buildPlanes,
    bindings,
  });

  return (
    <PageLayout title="Deployments" testId="deployments-page">
      <EnvCardBase envName="Builds">
        <Button
          onClick={() =>
            createWorkload({
              containers: {
                main: {
                  image: "nginx:latest",
                },
              },
              endpoints: {},
              owner: {
                componentName: componentHandle,
                projectName: projectHandle,
              },
            })
          }
        >
          Create Workload
        </Button>
      </EnvCardBase>
      {enrichedEnvironments?.map((env) => (
        <EnvCardBase
          key={env.name}
          envName={env.displayName}
          status={env.binding?.status.status}
        >
          <EnvDeploymentContent binding={env.binding} />
        </EnvCardBase>
      ))}
    </PageLayout>
  );
}
