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

package testutil

import (
	"context"
	. "github.com/onsi/ginkgo/v2"
	. "github.com/onsi/gomega"
	apiv1 "github.com/wso2-enterprise/choreo-cp-declarative-api/api/v1"
	org "github.com/wso2-enterprise/choreo-cp-declarative-api/internal/controller/organization"
	corev1 "k8s.io/api/core/v1"
	"k8s.io/apimachinery/pkg/api/errors"
	metav1 "k8s.io/apimachinery/pkg/apis/meta/v1"
	"k8s.io/apimachinery/pkg/types"
	"k8s.io/client-go/tools/record"
	"sigs.k8s.io/controller-runtime/pkg/client"
	"sigs.k8s.io/controller-runtime/pkg/reconcile"
	"time"
)

const TestOrganizationName = "test-organization"
const TestOrganizationNamespace = TestOrganizationName

func CreateTestOrganization(ctx context.Context, k8sClient client.Client) {
	orgNamespacedName := types.NamespacedName{
		Name: TestOrganizationName,
	}
	By("Creating the organization resource", func() {
		organization := &apiv1.Organization{}
		err := k8sClient.Get(ctx, orgNamespacedName, organization)
		if err != nil && errors.IsNotFound(err) {
			organization = &apiv1.Organization{
				ObjectMeta: metav1.ObjectMeta{
					Name: TestOrganizationName,
				},
			}
			Expect(k8sClient.Create(ctx, organization)).To(Succeed())
		}
	})

	By("Reconciling the organization resource", func() {
		orgReconciler := &org.Reconciler{
			Client:   k8sClient,
			Scheme:   k8sClient.Scheme(),
			Recorder: record.NewFakeRecorder(100),
		}
		result, err := orgReconciler.Reconcile(ctx, reconcile.Request{
			NamespacedName: orgNamespacedName,
		})
		Expect(err).NotTo(HaveOccurred())
		Expect(result.Requeue).To(BeFalse())
	})

	By("Checking the namespace of the organization resource", func() {
		namespace := &corev1.Namespace{}
		Eventually(func() error {
			return k8sClient.Get(ctx, client.ObjectKey{Name: TestOrganizationNamespace}, namespace)
		}, time.Second*60, time.Millisecond*500).Should(Succeed())
		Expect(namespace.Name).To(Equal(TestOrganizationName))
	})
}

func DeleteTestOrganization(ctx context.Context, k8sClient client.Client) {
	orgNamespacedName := types.NamespacedName{
		Name: TestOrganizationName,
	}
	By("Deleting the organization resource", func() {
		organization := &apiv1.Organization{}
		err := k8sClient.Get(ctx, types.NamespacedName{Name: TestOrganizationName}, organization)
		Expect(err).NotTo(HaveOccurred())
		Expect(k8sClient.Delete(ctx, organization)).To(Succeed())
	})

	By("Checking the deletion of the organization resource", func() {
		Eventually(func() error {
			return k8sClient.Get(ctx, orgNamespacedName, &apiv1.Organization{})
		}, time.Second*60, time.Millisecond*500).Should(HaveOccurred())
	})
}
