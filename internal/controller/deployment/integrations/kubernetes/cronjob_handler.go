/*
 * Copyright (c) 2024, WSO2 LLC. (http://www.wso2.com). All Rights Reserved.
 *
 * This software is the property of WSO2 LLC. and its suppliers, if any.
 * Dissemination of any information or reproduction of any material contained
 * herein in any form is strictly forbidden, unless permitted by WSO2 expressly.
 * You may not alter or remove any copyright or other notice from copies of this content.
 */

package kubernetes

import (
	"context"
	"errors"

	"github.com/google/go-cmp/cmp"
	"github.com/google/go-cmp/cmp/cmpopts"
	batchv1 "k8s.io/api/batch/v1"
	corev1 "k8s.io/api/core/v1"
	apierrors "k8s.io/apimachinery/pkg/api/errors"
	metav1 "k8s.io/apimachinery/pkg/apis/meta/v1"
	"sigs.k8s.io/controller-runtime/pkg/client"

	choreov1 "github.com/wso2-enterprise/choreo-cp-declarative-api/api/v1"
	"github.com/wso2-enterprise/choreo-cp-declarative-api/internal/controller/deployment/integrations"
)

type cronJobHandler struct {
	kubernetesClient client.Client
}

var _ integrations.ResourceHandler = (*cronJobHandler)(nil)

func NewCronJobHandler(kubernetesClient client.Client) integrations.ResourceHandler {
	return &cronJobHandler{
		kubernetesClient: kubernetesClient,
	}
}

func (h *cronJobHandler) Name() string {
	return "KubernetesCronJobHandler"
}

func (h *cronJobHandler) IsRequired(deployCtx integrations.DeploymentContext) bool {
	return deployCtx.Component.Spec.Type == choreov1.ComponentTypeScheduledTask
}

func (h *cronJobHandler) GetCurrentState(ctx context.Context, deployCtx integrations.DeploymentContext) (interface{}, error) {
	namespace := makeNamespaceName(deployCtx)
	name := makeCronJobName(deployCtx)
	out := &batchv1.CronJob{}
	err := h.kubernetesClient.Get(ctx, client.ObjectKey{Name: name, Namespace: namespace}, out)
	if apierrors.IsNotFound(err) {
		return nil, nil
	} else if err != nil {
		return nil, err
	}
	return out, nil
}

func (h *cronJobHandler) Create(ctx context.Context, deployCtx integrations.DeploymentContext) error {
	cronJob := makeCronJob(deployCtx)
	return h.kubernetesClient.Create(ctx, cronJob)
}

func (h *cronJobHandler) Update(ctx context.Context, deployCtx integrations.DeploymentContext, currentState interface{}) error {
	currentCronJob, ok := currentState.(*batchv1.CronJob)
	if !ok {
		return errors.New("failed to cast current state to CronJob")
	}

	newCronJob := makeCronJob(deployCtx)

	if h.shouldUpdate(currentCronJob, newCronJob) {
		newCronJob.ResourceVersion = currentCronJob.ResourceVersion
		return h.kubernetesClient.Update(ctx, newCronJob)
	}

	return nil
}

func (h *cronJobHandler) Delete(ctx context.Context, deployCtx integrations.DeploymentContext) error {
	cronJob := makeCronJob(deployCtx)
	err := h.kubernetesClient.Delete(ctx, cronJob)
	if apierrors.IsNotFound(err) {
		return nil
	}
	return err
}

func (h *cronJobHandler) shouldUpdate(current, new *batchv1.CronJob) bool {
	// Compare the labels
	if !cmp.Equal(extractManagedLabels(current.Labels), extractManagedLabels(new.Labels)) {
		return true
	}

	if !cmp.Equal(current.Spec, new.Spec, cmpopts.EquateEmpty()) {
		return true
	}
	return false
}

func makeCronJobName(deployCtx integrations.DeploymentContext) string {
	componentName := deployCtx.Component.Name
	deploymentTrackName := deployCtx.DeploymentTrack.Name
	// Limit the name to 52 characters to comply with the K8s name length limit for CronJobs
	return GenerateK8sNameWithLengthLimit(52, componentName, deploymentTrackName)
}

// TODO: Unit test me
func makeCronJob(deployCtx integrations.DeploymentContext) *batchv1.CronJob {
	return &batchv1.CronJob{
		ObjectMeta: metav1.ObjectMeta{
			Name:      makeCronJobName(deployCtx),
			Namespace: makeNamespaceName(deployCtx),
			Labels:    makeWorkloadLabels(deployCtx),
		},
		Spec: makeCronJobSpec(deployCtx),
	}
}

func makeCronJobSpec(deployCtx integrations.DeploymentContext) batchv1.CronJobSpec {
	cronJobSpec := batchv1.CronJobSpec{
		ConcurrencyPolicy: batchv1.ForbidConcurrent,
		JobTemplate: batchv1.JobTemplateSpec{
			ObjectMeta: metav1.ObjectMeta{
				Labels: makeWorkloadLabels(deployCtx),
			},
			Spec: batchv1.JobSpec{
				// TODO: These are free tire values from Choreo v2. Make these configurable that are coming from the deployment context
				ActiveDeadlineSeconds: PtrInt64(300),
				BackoffLimit:          PtrInt32(4),
				Template: corev1.PodTemplateSpec{
					ObjectMeta: metav1.ObjectMeta{
						Labels: makeWorkloadLabels(deployCtx),
					},
					Spec: corev1.PodSpec{
						Containers: []corev1.Container{
							{
								Name:  "main",
								Image: deployCtx.ContainerImage,
							},
						},
						RestartPolicy: corev1.RestartPolicyNever,
					},
				},
				TTLSecondsAfterFinished: PtrInt32(360),
			},
		},
		Suspend:  PtrBool(false),
		TimeZone: PtrString("Etc/UTC"),
	}
	var taskSpec *choreov1.TaskConfig
	if deployCtx.DeployableArtifact.Spec.Configuration != nil &&
		deployCtx.DeployableArtifact.Spec.Configuration.Application != nil {
		taskSpec = deployCtx.DeployableArtifact.Spec.Configuration.Application.Task
	}
	if taskSpec == nil {
		return cronJobSpec
	}

	if taskSpec.Disabled {
		cronJobSpec.Suspend = PtrBool(true)
	}

	if taskSpec.Schedule != nil {
		cronJobSpec.Schedule = taskSpec.Schedule.Cron
		if taskSpec.Schedule.Timezone != "" {
			cronJobSpec.TimeZone = PtrString(taskSpec.Schedule.Timezone)
		}
	}
	return cronJobSpec
}
