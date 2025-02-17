package testutil

import (
	"context"
	. "github.com/onsi/ginkgo/v2"
	. "github.com/onsi/gomega"
	apiv1 "github.com/wso2-enterprise/choreo-cp-declarative-api/api/v1"
	"github.com/wso2-enterprise/choreo-cp-declarative-api/internal/controller"
	dep "github.com/wso2-enterprise/choreo-cp-declarative-api/internal/controller/deploymentpipeline"
	"github.com/wso2-enterprise/choreo-cp-declarative-api/internal/labels"
	"k8s.io/apimachinery/pkg/api/errors"
	metav1 "k8s.io/apimachinery/pkg/apis/meta/v1"
	"k8s.io/apimachinery/pkg/types"
	"k8s.io/client-go/tools/record"
	"sigs.k8s.io/controller-runtime/pkg/client"
	"sigs.k8s.io/controller-runtime/pkg/reconcile"
	"time"
)

const TestDeploymentPipelineName = "test-deployment-pipeline"

// CreateTestDeploymentPipeline creates a test environment resource
func CreateTestDeploymentPipeline(ctx context.Context, k8sClient client.Client) {
	pipelineNamespacedName := types.NamespacedName{
		Namespace: TestOrganizationNamespace,
		Name:      TestDeploymentPipelineName,
	}

	By("Creating the deploymentPipeline resource", func() {
		pipeline := &apiv1.DeploymentPipeline{}
		err := k8sClient.Get(ctx, pipelineNamespacedName, pipeline)
		if err != nil && errors.IsNotFound(err) {
			dp := &apiv1.DeploymentPipeline{
				ObjectMeta: metav1.ObjectMeta{
					Name:      TestDeploymentPipelineName,
					Namespace: TestOrganizationNamespace,
					Labels: map[string]string{
						labels.LabelKeyOrganizationName: TestOrganizationName,
						labels.LabelKeyName:             TestDeploymentPipelineName,
					},
					Annotations: map[string]string{
						controller.AnnotationKeyDisplayName: "Test Deployment pipeline",
						controller.AnnotationKeyDescription: "Test Deployment pipeline Description",
					},
				},
				Spec: apiv1.DeploymentPipelineSpec{
					PromotionPaths: []apiv1.PromotionPath{
						{
							SourceEnvironmentRef:  "test-env",
							TargetEnvironmentRefs: make([]apiv1.TargetEnvironmentRef, 0),
						},
					},
				},
			}
			Expect(k8sClient.Create(ctx, dp)).To(Succeed())
		}
	})

	By("Reconciling the deploymentPipeline resource", func() {
		pipelineReconciler := &dep.Reconciler{
			Client:   k8sClient,
			Scheme:   k8sClient.Scheme(),
			Recorder: record.NewFakeRecorder(100),
		}
		result, err := pipelineReconciler.Reconcile(ctx, reconcile.Request{
			NamespacedName: pipelineNamespacedName,
		})
		Expect(err).NotTo(HaveOccurred())
		Expect(result.Requeue).To(BeFalse())
	})

	By("Checking the deploymentPipeline resource", func() {
		pipeline := &apiv1.DeploymentPipeline{}
		Eventually(func() error {
			return k8sClient.Get(ctx, pipelineNamespacedName, pipeline)
		}, time.Second*10, time.Millisecond*500).Should(Succeed())
		Expect(pipeline.Name).To(Equal(TestEnvironmentName))
		Expect(pipeline.Namespace).To(Equal(TestOrganizationNamespace))
		Expect(pipeline.Spec).NotTo(BeNil())
	})
}

func DeleteDeploymentPipeline(ctx context.Context, k8sClient client.Client) {
	pipelineNamespacedName := types.NamespacedName{
		Namespace: TestOrganizationNamespace,
		Name:      TestDeploymentPipelineName,
	}
	By("Deleting the deploymentPipeline resource", func() {
		pipeline := &apiv1.DeploymentPipeline{}
		err := k8sClient.Get(ctx, pipelineNamespacedName, pipeline)
		Expect(err).NotTo(HaveOccurred())
		Expect(k8sClient.Delete(ctx, pipeline)).To(Succeed())
	})

	By("Checking the deletion of the pipelineNamespacedName resource", func() {
		Eventually(func() error {
			return k8sClient.Get(ctx, pipelineNamespacedName, &apiv1.DeploymentPipeline{})
		}, time.Second*10, time.Millisecond*500).ShouldNot(Succeed())
	})
}
