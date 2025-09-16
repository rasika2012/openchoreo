import {
  ComponentBinding,
  Environment,
  TargetEnvironmentRef,
} from "@open-choreo/definitions";

export interface EnrichedEnvironment extends Environment {
  binding?: ComponentBinding;
  targetEnvironments?: TargetEnvironmentRef[];
}
