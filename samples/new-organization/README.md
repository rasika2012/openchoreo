# Create a new Organization
This sample demonstrates how to create a new organization in Choreo. It all creates other necessary resources such as environments, dataplanes, and deployment tracks.

## Deploying in Choreo
Use the following command to create the new organization called `acme`.

```bash
kubectl apply -f samples/new-organization/new-org.yaml
``` 

```bash
organization.core.choreo.dev/acme created
dataplane.core.choreo.dev/dp-local created
deploymentpipeline.core.choreo.dev/default-pipeline created
environment.core.choreo.dev/development created
```