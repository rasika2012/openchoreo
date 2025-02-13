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

package environment

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
	"github.com/wso2-enterprise/choreo-cp-declarative-api/internal/controller/testutil"
)

var _ = Describe("Environment Controller", func() {
	BeforeEach(func() {
		testutil.CreateTestOrganization(ctx, k8sClient)
		testutil.CreateTestDataPlane(ctx, k8sClient)
	})

	AfterEach(func() {
		testutil.DeleteTestOrganization(ctx, k8sClient)
	})
	It("should successfully create and reconcile environment resource", func() {
		const envName = "test-env"

		envNamespacedName := types.NamespacedName{
			Namespace: testutil.TestOrganizationNamespace,
			Name:      envName,
		}
		environment := &apiv1.Environment{}
		By("Creating the environment resource", func() {
			err := k8sClient.Get(ctx, envNamespacedName, environment)
			if err != nil && errors.IsNotFound(err) {
				dp := &apiv1.Environment{
					ObjectMeta: metav1.ObjectMeta{
						Name:      envName,
						Namespace: testutil.TestOrganizationNamespace,
						Labels: map[string]string{
							controller.LabelKeyOrganizationName: testutil.TestOrganizationName,
							controller.LabelKeyName:             envName,
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
			envReconciler := &Reconciler{
				Client:   k8sClient,
				Scheme:   k8sClient.Scheme(),
				recorder: record.NewFakeRecorder(100),
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
			Expect(environment.Namespace).To(Equal(testutil.TestOrganizationNamespace))
			Expect(environment.Spec).NotTo(BeNil())
		})

		By("Deleting the environment resource", func() {
			err := k8sClient.Get(ctx, envNamespacedName, environment)
			Expect(err).NotTo(HaveOccurred())
			Expect(k8sClient.Delete(ctx, environment)).To(Succeed())
		})

		By("Checking the environment resource deletion", func() {
			Eventually(func() error {
				return k8sClient.Get(ctx, envNamespacedName, environment)
			}, time.Second*10, time.Millisecond*500).ShouldNot(Succeed())
		})

		By("Reconciling the environment resource after deletion", func() {
			dpReconciler := &Reconciler{
				Client:   k8sClient,
				Scheme:   k8sClient.Scheme(),
				recorder: record.NewFakeRecorder(100),
			}
			result, err := dpReconciler.Reconcile(ctx, reconcile.Request{
				NamespacedName: envNamespacedName,
			})
			Expect(err).NotTo(HaveOccurred())
			Expect(result.Requeue).To(BeFalse())
		})
	})
})
