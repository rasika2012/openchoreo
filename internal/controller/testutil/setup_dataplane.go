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
	"github.com/wso2-enterprise/choreo-cp-declarative-api/internal/controller/dataplane"
	"k8s.io/apimachinery/pkg/api/errors"
	metav1 "k8s.io/apimachinery/pkg/apis/meta/v1"
	"k8s.io/apimachinery/pkg/types"
	"k8s.io/client-go/tools/record"
	"sigs.k8s.io/controller-runtime/pkg/client"
	"sigs.k8s.io/controller-runtime/pkg/reconcile"
)

const TestDataPlaneName = "test-dataplane"

func CreateTestDataPlane(ctx context.Context, k8sClient client.Client) {
	dpNamespacedName := types.NamespacedName{
		Name:      TestDataPlaneName,
		Namespace: TestOrganizationNamespace,
	}
	dp := &apiv1.DataPlane{}
	By("Creating the dataplane resource", func() {
		err := k8sClient.Get(ctx, dpNamespacedName, dp)
		if err != nil && errors.IsNotFound(err) {
			dp := &apiv1.DataPlane{
				ObjectMeta: metav1.ObjectMeta{
					Name:      TestDataPlaneName,
					Namespace: TestOrganizationName,
				},
			}
			Expect(k8sClient.Create(ctx, dp)).To(Succeed())
		}
	})

	By("Reconciling the dataplane resource", func() {
		dpReconciler := &dataplane.Reconciler{
			Client:   k8sClient,
			Scheme:   k8sClient.Scheme(),
			Recorder: record.NewFakeRecorder(100),
		}
		result, err := dpReconciler.Reconcile(ctx, reconcile.Request{
			NamespacedName: dpNamespacedName,
		})
		Expect(err).NotTo(HaveOccurred())
		Expect(result.Requeue).To(BeFalse())
	})
}
