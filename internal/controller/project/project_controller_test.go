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

package project

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
	dp "github.com/wso2-enterprise/choreo-cp-declarative-api/internal/controller/dataplane"
	deppip "github.com/wso2-enterprise/choreo-cp-declarative-api/internal/controller/deploymentpipeline"
	env "github.com/wso2-enterprise/choreo-cp-declarative-api/internal/controller/environment"
	org "github.com/wso2-enterprise/choreo-cp-declarative-api/internal/controller/organization"
	"github.com/wso2-enterprise/choreo-cp-declarative-api/internal/labels"
)

var _ = Describe("Project Controller", func() {
	orgName := "test-org"
	BeforeEach(func() {
		By("Creating and reconciling organization resource", func() {
			orgNamespacedName := types.NamespacedName{
				Name: orgName,
			}
			organization := &apiv1.Organization{}
			err := k8sClient.Get(ctx, orgNamespacedName, organization)
			if err != nil && errors.IsNotFound(err) {
				org := &apiv1.Organization{
					ObjectMeta: metav1.ObjectMeta{
						Name: orgName,
					},
				}
				Expect(k8sClient.Create(ctx, org)).To(Succeed())
			}
			orgReconciler := &org.Reconciler{
				Client:   k8sClient,
				Scheme:   k8sClient.Scheme(),
				Recorder: record.NewFakeRecorder(100),
			}
			_, err = orgReconciler.Reconcile(ctx, reconcile.Request{
				NamespacedName: orgNamespacedName,
			})
			Expect(err).NotTo(HaveOccurred())
		})

		const dpName = "test-dataplane"

		dpNamespacedName := types.NamespacedName{
			Name:      dpName,
			Namespace: orgName,
		}

		dataplane := &apiv1.DataPlane{}

		By("Creating and reconciling the dataplane resource", func() {
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
			dpReconciler := &dp.Reconciler{
				Client:   k8sClient,
				Scheme:   k8sClient.Scheme(),
				Recorder: record.NewFakeRecorder(100),
			}
			_, err = dpReconciler.Reconcile(ctx, reconcile.Request{
				NamespacedName: dpNamespacedName,
			})
			Expect(err).NotTo(HaveOccurred())
		})

		const envName = "test-env"

		envNamespacedName := types.NamespacedName{
			Namespace: orgName,
			Name:      envName,
		}

		By("Creating and reconciling the environment resource", func() {
			environment := &apiv1.Environment{}

			err := k8sClient.Get(ctx, envNamespacedName, environment)
			if err != nil && errors.IsNotFound(err) {
				dp := &apiv1.Environment{
					ObjectMeta: metav1.ObjectMeta{
						Name:      envName,
						Namespace: orgName,
						Labels: map[string]string{
							labels.LabelKeyOrganizationName: orgName,
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

			envReconciler := &env.Reconciler{
				Client:   k8sClient,
				Scheme:   k8sClient.Scheme(),
				Recorder: record.NewFakeRecorder(100),
			}
			_, err = envReconciler.Reconcile(ctx, reconcile.Request{
				NamespacedName: envNamespacedName,
			})
			Expect(err).NotTo(HaveOccurred())
		})

		By("Creating and reconciling the deployment pipeline resource", func() {
			pipelineName := "test-pipeline"

			pipelineNamespacedName := types.NamespacedName{
				Namespace: orgName,
				Name:      pipelineName,
			}

			pipeline := &apiv1.DeploymentPipeline{}

			err := k8sClient.Get(ctx, pipelineNamespacedName, pipeline)
			if err != nil && errors.IsNotFound(err) {
				dp := &apiv1.DeploymentPipeline{
					ObjectMeta: metav1.ObjectMeta{
						Name:      pipelineName,
						Namespace: orgName,
						Labels: map[string]string{
							labels.LabelKeyOrganizationName: orgName,
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

			pipelineReconciler := &deppip.Reconciler{
				Client:   k8sClient,
				Scheme:   k8sClient.Scheme(),
				Recorder: record.NewFakeRecorder(100),
			}
			_, err = pipelineReconciler.Reconcile(ctx, reconcile.Request{
				NamespacedName: pipelineNamespacedName,
			})
			Expect(err).NotTo(HaveOccurred())
		})
	})

	It("should successfully create and reconcile project resource", func() {
		const projectName = "test-project"

		projectNamespacedName := types.NamespacedName{
			Namespace: orgName,
			Name:      projectName,
		}

		project := &apiv1.Project{}

		By("Creating the project resource", func() {
			err := k8sClient.Get(ctx, projectNamespacedName, project)
			if err != nil && errors.IsNotFound(err) {
				dp := &apiv1.Project{
					ObjectMeta: metav1.ObjectMeta{
						Name:      projectName,
						Namespace: orgName,
						Labels: map[string]string{
							labels.LabelKeyOrganizationName: orgName,
							labels.LabelKeyName:             projectName,
						},
						Annotations: map[string]string{
							controller.AnnotationKeyDisplayName: "Test Project",
							controller.AnnotationKeyDescription: "Test Project Description",
						},
					},
					Spec: apiv1.ProjectSpec{
						DeploymentPipelineRef: "test-pipeline",
					},
				}
				Expect(k8sClient.Create(ctx, dp)).To(Succeed())
			}
		})

		By("Reconciling the project resource", func() {
			projectReconciler := &Reconciler{
				Client:   k8sClient,
				Scheme:   k8sClient.Scheme(),
				Recorder: record.NewFakeRecorder(100),
			}
			_, err := projectReconciler.Reconcile(ctx, reconcile.Request{
				NamespacedName: projectNamespacedName,
			})
			Expect(err).NotTo(HaveOccurred())
		})

		By("Checking the project resource", func() {
			project := &apiv1.Project{}
			Eventually(func() error {
				return k8sClient.Get(ctx, projectNamespacedName, project)
			}, time.Second*10, time.Millisecond*500).Should(Succeed())
			Expect(project.Name).To(Equal(projectName))
			Expect(project.Namespace).To(Equal(orgName))
			Expect(project.Spec).To(Equal(apiv1.ProjectSpec{DeploymentPipelineRef: "test-pipeline"}))
			Expect(project.Spec).NotTo(BeNil())
		})

		By("Deleting the project resource", func() {
			err := k8sClient.Get(ctx, projectNamespacedName, project)
			Expect(err).NotTo(HaveOccurred())
			Expect(k8sClient.Delete(ctx, project)).To(Succeed())
		})

		By("Checking the project resource deletion", func() {
			Eventually(func() error {
				return k8sClient.Get(ctx, projectNamespacedName, project)
			}, time.Second*10, time.Millisecond*500).ShouldNot(Succeed())
		})

		By("Reconciling the project resource after deletion", func() {
			dpReconciler := &Reconciler{
				Client:   k8sClient,
				Scheme:   k8sClient.Scheme(),
				Recorder: record.NewFakeRecorder(100),
			}
			result, err := dpReconciler.Reconcile(ctx, reconcile.Request{
				NamespacedName: projectNamespacedName,
			})
			Expect(err).NotTo(HaveOccurred())
			Expect(result.Requeue).To(BeFalse())
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
})
