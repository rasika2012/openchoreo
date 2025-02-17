/*
 * Copyright (c) 2025, WSO2 Inc. (http://www.wso2.org) All Rights Reserved.
 *
 * WSO2 Inc. licenses this file to you under the Apache License,
 * Version 2.0 (the "License"); you may not use this file except
 * in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied. See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

package deploymentpipeline_test

import (
	"time"

	. "github.com/onsi/ginkgo/v2"
	. "github.com/onsi/gomega"
	"k8s.io/apimachinery/pkg/api/errors"
	metav1 "k8s.io/apimachinery/pkg/apis/meta/v1"
	"k8s.io/apimachinery/pkg/types"
	"k8s.io/client-go/tools/record"
	"sigs.k8s.io/controller-runtime/pkg/reconcile"

	apiv1 "github.com/wso2-enterprise/choreo-cp-declarative-api/api/v1"
	"github.com/wso2-enterprise/choreo-cp-declarative-api/internal/controller"
	dep "github.com/wso2-enterprise/choreo-cp-declarative-api/internal/controller/deploymentpipeline"
	"github.com/wso2-enterprise/choreo-cp-declarative-api/internal/controller/testutil"
	"github.com/wso2-enterprise/choreo-cp-declarative-api/internal/labels"
)

var _ = Describe("DeploymentPipeline Controller", func() {
	BeforeEach(func() {
		testutil.CreateTestOrganization(ctx, k8sClient)
		testutil.CreateTestDataPlane(ctx, k8sClient)
		testutil.CreateTestEnvironment(ctx, k8sClient)
	})

	const pipelineName = "test-deployment-pipeline"

	pipelineNamespacedName := types.NamespacedName{
		Namespace: testutil.TestOrganizationNamespace,
		Name:      pipelineName,
	}

	pipeline := &apiv1.DeploymentPipeline{}

	It("should successfully create and reconcile deployment pipeline resource", func() {
		By("creating a custom resource for the Kind DeploymentPipeline", func() {
			err := k8sClient.Get(ctx, pipelineNamespacedName, pipeline)
			if err != nil && errors.IsNotFound(err) {
				dp := &apiv1.DeploymentPipeline{
					ObjectMeta: metav1.ObjectMeta{
						Name:      pipelineName,
						Namespace: testutil.TestOrganizationNamespace,
						Labels: map[string]string{
							labels.LabelKeyOrganizationName: testutil.TestOrganizationName,
							labels.LabelKeyName:             pipelineName,
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
			depReconciler := &dep.Reconciler{
				Client:   k8sClient,
				Scheme:   k8sClient.Scheme(),
				Recorder: record.NewFakeRecorder(100),
			}
			result, err := depReconciler.Reconcile(ctx, reconcile.Request{
				NamespacedName: pipelineNamespacedName,
			})
			Expect(err).NotTo(HaveOccurred())
			Expect(result.Requeue).To(BeFalse())
		})

		By("Checking the deploymentPipeline resource", func() {
			deploymentPipeline := &apiv1.DeploymentPipeline{}
			Eventually(func() error {
				return k8sClient.Get(ctx, pipelineNamespacedName, deploymentPipeline)
			}, time.Second*10, time.Millisecond*500).Should(Succeed())
			Expect(deploymentPipeline.Name).To(Equal(pipelineName))
			Expect(deploymentPipeline.Namespace).To(Equal(testutil.TestOrganizationNamespace))
			Expect(deploymentPipeline.Spec).NotTo(BeNil())
		})

		By("Deleting the deploymentPipeline resource", func() {
			err := k8sClient.Get(ctx, pipelineNamespacedName, pipeline)
			Expect(err).NotTo(HaveOccurred())
			Expect(k8sClient.Delete(ctx, pipeline)).To(Succeed())
		})

		By("Checking the deploymentPipeline resource deletion", func() {
			Eventually(func() error {
				return k8sClient.Get(ctx, pipelineNamespacedName, pipeline)
			}, time.Second*10, time.Millisecond*500).ShouldNot(Succeed())
		})

		By("Reconciling the deploymentPipeline resource after deletion", func() {
			dpReconciler := &dep.Reconciler{
				Client:   k8sClient,
				Scheme:   k8sClient.Scheme(),
				Recorder: record.NewFakeRecorder(100),
			}
			result, err := dpReconciler.Reconcile(ctx, reconcile.Request{
				NamespacedName: pipelineNamespacedName,
			})
			Expect(err).NotTo(HaveOccurred())
			Expect(result.Requeue).To(BeFalse())
		})
	})

	AfterEach(func() {
		testutil.DeleteTestOrganization(ctx, k8sClient)
	})
})
