# Time Logger Scheduled Task
This is a simple program that logs the current time. This program can be deployed in Choreo to be executed periodically by creating a Scheduled Task.

## Deploying in Choreo
The following command will create the component, deployment track and the deployment in Choreo. It'll also trigger a build by creating a build resource. 

```bash
kubectl apply  -f samples/time-logger-scheduled-task/time-logger.yaml
```

## Checking the Argo Workflow Status
Argo workflow will create three tasks.

```
NAMESPACE            NAME 
argo-build           time-logger-build-01-clone-step-2264035552      
argo-build           time-logger-build-01-build-step-3433253592                        
argo-build           time-logger-build-01-push-step-3448493733                  
```

You can check the status of the workflow by running the following commands.

```bash
kubectl get pods -n argo-build 
```

You can check build logs of each step by running the following command.

```bash
kubectl logs -f -n argo-build <pod-name>
```

## Checking the Deployment Status
You should see a namespace created for your org, project and environment combination. In this sample it will have the prefix `dp-default-org-default-project-development-`. 

List all the namespaces in the cluster to find the namespace created for the deployment.

```bash
kubectl get namespaces
``` 

You can check the status of the deployment by running the following commands.

```bash
kubectl get pods -n dp-default-org-default-project-development-39faf2d8
```




