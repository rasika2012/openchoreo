import {
  useComponentBindings,
  useEnvironments,
  useUpdateComponentBinding,
} from "@open-choreo/choreo-context";
import { ReleaseStateValues } from "@open-choreo/definitions";
import { Box } from "@open-choreo/design-system";
import {
  useComponentHandle,
  useOrgHandle,
  useProjectHandle,
} from "@open-choreo/plugin-core";
import { EnvCardBase, EnvDeploymentContent } from "@open-choreo/resource-views";
import { EnrichedEnvironment } from "../types/types";
import { PromoteButton } from "./PromoteButton";

export interface EnvCardProps {
  env: EnrichedEnvironment;
}

export default function EnvCard({ env }: EnvCardProps) {
  const componentHandle = useComponentHandle();
  const orgHandle = useOrgHandle();
  const projectHandle = useProjectHandle();
  const { updateBinding } = useUpdateComponentBinding(
    orgHandle,
    projectHandle,
    componentHandle,
    env?.binding?.name,
  );
  const { refetch: refetchEnvironments } = useEnvironments(orgHandle);
  const { refetch } = useComponentBindings(
    orgHandle,
    projectHandle,
    componentHandle,
  );
  return (
    <EnvCardBase
      key={env.name}
      envName={env.displayName}
      status={env.binding?.status.status}
      onRefresh={() => {
        refetch();
        refetchEnvironments();
      }}
      onRedeploy={() => {
        updateBinding({
          releaseState: ReleaseStateValues.Active,
        });
      }}
      onStop={() => {
        updateBinding({
          releaseState: ReleaseStateValues.Suspend,
        });
      }}
    >
      <Box display="flex" flexDirection="column" gap={2} width="100%">
        <EnvDeploymentContent binding={env.binding} />
        {env?.targetEnvironments?.map((te) => (
          <PromoteButton key={te.name} fromEnv={env} toEnv={te} />
        ))}
      </Box>
    </EnvCardBase>
  );
}
