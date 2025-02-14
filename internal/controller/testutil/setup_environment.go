package testutil

import (
	"context"
	. "github.com/onsi/ginkgo/v2"
	. "github.com/onsi/gomega"
	apiv1 "github.com/wso2-enterprise/choreo-cp-declarative-api/api/v1"
	"github.com/wso2-enterprise/choreo-cp-declarative-api/internal/controller"
	env "github.com/wso2-enterprise/choreo-cp-declarative-api/internal/controller/environment"
	"github.com/wso2-enterprise/choreo-cp-declarative-api/internal/labels"
	"k8s.io/apimachinery/pkg/api/errors"
	metav1 "k8s.io/apimachinery/pkg/apis/meta/v1"
	"k8s.io/apimachinery/pkg/types"
	"k8s.io/client-go/tools/record"
	"sigs.k8s.io/controller-runtime/pkg/client"
	"sigs.k8s.io/controller-runtime/pkg/reconcile"
	"time"
)

const TestEnvironmentName = "test-env"

// CreateTestEnvironment creates a test environment resource
func CreateTestEnvironment(ctx context.Context, k8sClient client.Client, envName string) {
	envNamespacedName := types.NamespacedName{
		Name:      TestEnvironmentName,
		Namespace: TestOrganizationNamespace,
	}
	By("Creating the environment resource", func() {
		environment := &apiv1.Environment{}
		err := k8sClient.Get(ctx, envNamespacedName, environment)
		if err != nil && errors.IsNotFound(err) {
			dp := &apiv1.Environment{
				ObjectMeta: metav1.ObjectMeta{
					Name:      envName,
					Namespace: TestOrganizationNamespace,
					Labels: map[string]string{
						labels.LabelKeyOrganizationName: TestOrganizationName,
						labels.LabelKeyName:             envName,
					},
					Annotations: map[string]string{
						controller.AnnotationKeyDisplayName: "Test Environment",
						controller.AnnotationKeyDescription: "Test Environment Description",
					},
				},
			}
			Expect(k8sClient.Create(ctx, dp)).To(Succeed())
		}
	})

	By("Reconciling the environment resource", func() {
		envReconciler := &env.Reconciler{
			Client:   k8sClient,
			Scheme:   k8sClient.Scheme(),
			Recorder: record.NewFakeRecorder(100),
		}
		result, err := envReconciler.Reconcile(ctx, reconcile.Request{
			NamespacedName: envNamespacedName,
		})
		Expect(err).NotTo(HaveOccurred())
		Expect(result.Requeue).To(BeFalse())
	})

	By("Checking the environment resource", func() {
		environment := &apiv1.Environment{}
		Eventually(func() error {
			return k8sClient.Get(ctx, envNamespacedName, environment)
		}, time.Second*10, time.Millisecond*500).Should(Succeed())
		Expect(environment.Name).To(Equal(envName))
		Expect(environment.Namespace).To(Equal(TestOrganizationNamespace))
		Expect(environment.Spec).NotTo(BeNil())
	})
}

func DeleteTestEnvironment(ctx context.Context, k8sClient client.Client) {
	envNamespacedName := types.NamespacedName{
		Name:      TestEnvironmentName,
		Namespace: TestOrganizationNamespace,
	}
	By("Deleting the environment resource", func() {
		environment := &apiv1.Environment{}
		err := k8sClient.Get(ctx, envNamespacedName, environment)
		Expect(err).NotTo(HaveOccurred())
		Expect(k8sClient.Delete(ctx, environment)).To(Succeed())
	})

	By("Checking the deletion of the environment resource", func() {
		Eventually(func() error {
			return k8sClient.Get(ctx, envNamespacedName, &apiv1.Environment{})
		}, time.Second*10, time.Millisecond*500).ShouldNot(Succeed())
	})
}
