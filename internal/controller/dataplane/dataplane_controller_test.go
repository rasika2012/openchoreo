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

package dataplane

import (
	"context"
	"time"

	. "github.com/onsi/ginkgo/v2"
	. "github.com/onsi/gomega"
	corev1 "k8s.io/api/core/v1"
	"k8s.io/apimachinery/pkg/api/errors"
	metav1 "k8s.io/apimachinery/pkg/apis/meta/v1"
	"k8s.io/apimachinery/pkg/types"
	"k8s.io/client-go/tools/record"
	"sigs.k8s.io/controller-runtime/pkg/client"
	"sigs.k8s.io/controller-runtime/pkg/reconcile"

	apiv1 "github.com/wso2-enterprise/choreo-cp-declarative-api/api/v1"
	org "github.com/wso2-enterprise/choreo-cp-declarative-api/internal/controller/organization"
)

var _ = Describe("DataPlane Controller", func() {
	Context("When reconciling a resource", func() {
		const dpName = "test-dataplane"

		// Organization resource to keep the dataplane
		orgName := "test-organization"

		ctx := context.Background()

		dpNamespacedName := types.NamespacedName{
			Name:      dpName,
			Namespace: orgName,
		}
		dataplane := &apiv1.DataPlane{}

		BeforeEach(func() {
			orgNamespacedName := types.NamespacedName{
				Name: orgName,
			}
			By("Creating the organization resource", func() {
				org := &apiv1.Organization{}
				err := k8sClient.Get(ctx, orgNamespacedName, org)
				if err != nil && errors.IsNotFound(err) {
					org := &apiv1.Organization{
						ObjectMeta: metav1.ObjectMeta{
							Name: orgName,
						},
					}
					Expect(k8sClient.Create(ctx, org)).To(Succeed())
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
					return k8sClient.Get(ctx, client.ObjectKey{Name: orgName}, namespace)
				}, time.Second*10, time.Millisecond*500).Should(Succeed())
				Expect(namespace.Name).To(Equal(orgName))
			})
		})

		AfterEach(func() {
			By("Deleting the organization resource", func() {
				org := &apiv1.Organization{}
				err := k8sClient.Get(ctx, types.NamespacedName{Name: orgName}, org)
				Expect(err).NotTo(HaveOccurred())
				Expect(k8sClient.Delete(ctx, org)).To(Succeed())
			})
		})

		It("should successfully Create and reconcile the dataplane resource", func() {
			By("Creating the dataplane resource", func() {
				err := k8sClient.Get(ctx, dpNamespacedName, dataplane)
				if err != nil && errors.IsNotFound(err) {
					dp := &apiv1.DataPlane{
						ObjectMeta: metav1.ObjectMeta{
							Name:      dpName,
							Namespace: orgName,
						},
					}
					Expect(k8sClient.Create(ctx, dp)).To(Succeed())
				}
			})

			By("Reconciling the dataplane resource", func() {
				dpReconciler := &Reconciler{
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

			By("Checking the dataplane resource", func() {
				dataPlane := &apiv1.DataPlane{}
				Eventually(func() error {
					return k8sClient.Get(ctx, dpNamespacedName, dataPlane)
				}, time.Second*10, time.Millisecond*500).Should(Succeed())
				Expect(dataPlane.Name).To(Equal(dpName))
				Expect(dataPlane.Namespace).To(Equal(orgName))
				Expect(dataPlane.Spec).NotTo(BeNil())
			})

			By("Deleting the dataplane resource", func() {
				err := k8sClient.Get(ctx, dpNamespacedName, dataplane)
				Expect(err).NotTo(HaveOccurred())
				Expect(k8sClient.Delete(ctx, dataplane)).To(Succeed())
			})

			By("Checking the dataplane resource deletion", func() {
				Eventually(func() error {
					return k8sClient.Get(ctx, dpNamespacedName, dataplane)
				}, time.Second*10, time.Millisecond*500).ShouldNot(Succeed())
			})

			By("Reconciling the dataplane resource after deletion", func() {
				dpReconciler := &Reconciler{
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
		})
	})
})
