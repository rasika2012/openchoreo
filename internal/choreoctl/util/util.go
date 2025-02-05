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

package util

import (
	"context"
	"fmt"
	"os"
	"path/filepath"
	"sort"
	"time"

	"github.com/spf13/viper"
	corev1 "k8s.io/api/core/v1"
	metav1 "k8s.io/apimachinery/pkg/apis/meta/v1"
	"k8s.io/apimachinery/pkg/apis/meta/v1/unstructured"
	"k8s.io/apimachinery/pkg/runtime"
	"k8s.io/apimachinery/pkg/runtime/schema"
	utilruntime "k8s.io/apimachinery/pkg/util/runtime"
	clientgoscheme "k8s.io/client-go/kubernetes/scheme"
	"k8s.io/client-go/rest"
	"k8s.io/client-go/tools/clientcmd"
	clientcmdapi "k8s.io/client-go/tools/clientcmd/api"
	"sigs.k8s.io/controller-runtime/pkg/client"
	"sigs.k8s.io/yaml"

	choreov1 "github.com/wso2-enterprise/choreo-cp-declarative-api/api/v1"
	"github.com/wso2-enterprise/choreo-cp-declarative-api/internal/choreoctl/errors"
)

var (
	scheme = runtime.NewScheme()
)

func init() {
	utilruntime.Must(clientgoscheme.AddToScheme(scheme))
	utilruntime.Must(choreov1.AddToScheme(scheme))
}

func IsLoginConfigFileExists() bool {
	configPath, err := GetLoginConfigFilePath()
	if err != nil {
		return false
	}
	if _, err := os.Stat(configPath); os.IsNotExist(err) {
		return false
	}
	return true
}

func GetLoginConfigFilePath() (string, error) {
	homeDir, err := os.UserHomeDir()
	if err != nil {
		return "", errors.NewError("failed to get home directory %v", err)
	}
	return filepath.Join(homeDir, ".choreo", "config"), nil
}

func SaveLoginConfig(kubeconfigPath, context string) error {
	configPath, err := GetLoginConfigFilePath()
	if err != nil {
		return err
	}
	viper.SetConfigFile(configPath)
	viper.SetConfigType("yaml")
	viper.Set("kubeconfig", kubeconfigPath)
	viper.Set("context", context)

	if err := viper.WriteConfigAs(configPath); err != nil {
		return errors.NewError(fmt.Sprintf("failed to write login config: %v", err), nil)
	}
	return nil
}

func GetKubernetesClient() (client.Client, error) {
	config, err := getKubernetesConfig()
	if err != nil {
		return nil, err
	}

	k8sClient, err := client.New(config, client.Options{
		Scheme: scheme,
	})
	if err != nil {
		return nil, errors.NewError("failed to create kubernetes client %v", err)
	}

	return k8sClient, nil
}

func getKubernetesConfig() (*rest.Config, error) {
	configPath, err := GetLoginConfigFilePath()
	if err != nil {
		return nil, err
	}

	if err := loadConfig(configPath); err != nil {
		return nil, err
	}

	kubeconfig, context, err := getStoredKubeConfigValues()
	if err != nil {
		return nil, err
	}

	return buildKubeConfig(kubeconfig, context)
}

func loadConfig(configPath string) error {
	viper.SetConfigFile(configPath)
	viper.SetConfigType("yaml")
	if err := viper.ReadInConfig(); err != nil {
		return errors.NewError("failed to read login config at: %s %v", configPath, err)
	}
	return nil
}

func getStoredKubeConfigValues() (string, string, error) {
	kubeconfig := viper.GetString("kubeconfig")
	kubeContext := viper.GetString("context")

	if kubeconfig == "" || kubeContext == "" {
		return "", "", errors.NewError("kubeconfig or context not found in login config")
	}
	return kubeconfig, kubeContext, nil
}

func buildKubeConfig(kubeconfigPath, context string) (*rest.Config, error) {
	loadingRules := &clientcmd.ClientConfigLoadingRules{
		ExplicitPath: kubeconfigPath,
	}

	configOverrides := &clientcmd.ConfigOverrides{
		CurrentContext: context,
	}

	config, err := clientcmd.NewNonInteractiveDeferredLoadingClientConfig(
		loadingRules,
		configOverrides,
	).ClientConfig()
	if err != nil {
		return nil, errors.NewError("failed to build kubeconfig %v", err)
	}

	return config, nil
}

func testConnection(k8sClient client.Client) error {
	podList := &corev1.PodList{}
	if err := k8sClient.List(context.Background(), podList, client.InNamespace("default")); err != nil {
		return errors.NewError("failed to test the kubernetes connection %v", err)
	}
	return nil
}

func FormatAge(t time.Time) string {
	duration := time.Since(t).Round(time.Second)
	if duration.Hours() > 48 {
		return fmt.Sprintf("%dd", int(duration.Hours()/24))
	} else if duration.Hours() > 0 {
		return fmt.Sprintf("%dh", int(duration.Hours()))
	}
	return fmt.Sprintf("%dm", int(duration.Minutes()))
}

func GetStatus(conditions []metav1.Condition, conditionType string) string {
	for _, condition := range conditions {
		if condition.Type == conditionType {
			return string(condition.Status)
		}
	}
	return "Unknown"
}

func GetKubeContextNames(config *clientcmdapi.Config) []string {
	contexts := make([]string, 0, len(config.Contexts))
	for name := range config.Contexts {
		contexts = append(contexts, name)
	}
	sort.Strings(contexts)
	return contexts
}

func CleanupLoginConfig() error {
	configPath, err := GetLoginConfigFilePath()
	if err != nil {
		return err
	}

	if err := os.Remove(configPath); err != nil && !os.IsNotExist(err) {
		return errors.NewError("failed to cleanup login config at: %s %v", configPath, err)
	}
	return nil
}

func LoginWithContext(kubeconfigPath, contextName string) error {
	if err := SaveLoginConfig(kubeconfigPath, contextName); err != nil {
		return err
	}

	k8sClient, err := GetKubernetesClient()
	if err != nil {
		return err
	}

	if err := testConnection(k8sClient); err != nil {
		if cleanupErr := CleanupLoginConfig(); cleanupErr != nil {
			return cleanupErr
		}
		return err
	}

	return nil
}

// GetOrganizationNames retrieves a sorted list of organization names
func GetOrganizationNames() ([]string, error) {
	k8sClient, err := GetKubernetesClient()
	if err != nil {
		return nil, err
	}

	orgList := &choreov1.OrganizationList{}
	if err := k8sClient.List(context.Background(), orgList); err != nil {
		return nil, errors.NewError("failed to list organizations %v", err)
	}

	names := make([]string, 0, len(orgList.Items))
	for _, org := range orgList.Items {
		names = append(names, org.Name)
	}

	sort.Strings(names)
	return names, nil
}

// GetProjectNames retrieves a sorted list of project names in an organization
func GetProjectNames(organization string) ([]string, error) {
	k8sClient, err := GetKubernetesClient()
	if err != nil {
		return nil, err
	}

	projectList := &choreov1.ProjectList{}
	if err := k8sClient.List(context.Background(), projectList,
		client.InNamespace(organization)); err != nil {
		return nil, errors.NewError("failed to list projects %v", err)
	}

	names := make([]string, 0, len(projectList.Items))
	for _, proj := range projectList.Items {
		names = append(names, proj.Name)
	}

	sort.Strings(names)
	return names, nil
}

func GetK8sObjectYAMLFromCRD(group, version, kind, name, namespace string) (string, error) {
	k8sClient, err := GetKubernetesClient()
	if err != nil {
		return "", err
	}

	// Define GVK and create unstructured object
	gvk := schema.GroupVersionKind{
		Group:   group,
		Version: version,
		Kind:    kind,
	}

	obj := &unstructured.Unstructured{}
	obj.SetGroupVersionKind(gvk)

	// Get the object
	key := client.ObjectKey{Name: name}
	if namespace != "" {
		key.Namespace = namespace
	}

	if err := k8sClient.Get(context.Background(), key, obj); err != nil {
		return "", errors.NewError("failed to get object %v", err)
	}

	// Clean runtime fields
	obj.SetManagedFields(nil)
	obj.SetGeneration(0)
	obj.SetResourceVersion("")
	obj.SetUID("")

	// Convert to YAML
	yamlBytes, err := yaml.Marshal(obj)
	if err != nil {
		return "", errors.NewError("failed to marshal object to YAML %v", err)
	}

	return string(yamlBytes), nil
}

// GetDefaultKubeconfigPath returns the default kubeconfig path
// First checks KUBECONFIG env var, then falls back to $HOME/.kube/config
func GetDefaultKubeconfigPath() (string, error) {
	if kubeconfigPath := os.Getenv("KUBECONFIG"); kubeconfigPath != "" {
		return filepath.Abs(kubeconfigPath)
	}

	homeDir, err := os.UserHomeDir()
	if err != nil {
		return "", errors.NewError("failed to get home directory %v", err)
	}

	return filepath.Abs(filepath.Join(homeDir, ".kube", "config"))
}

func GetOrganization(name string) (*choreov1.Organization, error) {
	k8sClient, err := GetKubernetesClient()
	if err != nil {
		return nil, err
	}

	org := &choreov1.Organization{}
	if err := k8sClient.Get(context.Background(), client.ObjectKey{Name: name}, org); err != nil {
		return nil, err
	}

	return org, nil
}
func GetOrganizations() (*choreov1.OrganizationList, error) {
	k8sClient, err := GetKubernetesClient()
	if err != nil {
		return nil, err
	}

	orgList := &choreov1.OrganizationList{}
	if err := k8sClient.List(context.Background(), orgList); err != nil {
		return nil, errors.NewError("failed to list organizations %v", err)
	}

	if len(orgList.Items) == 0 {
		return nil, errors.NewError("no organizations found")
	}
	return orgList, nil
}
func GetProjects(orgName string) (*choreov1.ProjectList, error) {
	k8sClient, err := GetKubernetesClient()
	if err != nil {
		return nil, err
	}

	projectList := &choreov1.ProjectList{}
	labels := client.MatchingLabels{
		"core.choreo.dev/organization": orgName,
	}

	if err := k8sClient.List(context.Background(), projectList,
		client.InNamespace(orgName),
		labels); err != nil {
		return nil, errors.NewError("failed to list projects for organization %s: %v", orgName, err)
	}

	return projectList, nil
}

func GetAllComponents(orgName, projectName string) (*choreov1.ComponentList, error) {
	k8sClient, err := GetKubernetesClient()
	if err != nil {
		return nil, err
	}

	componentList := &choreov1.ComponentList{}
	labels := client.MatchingLabels{
		"core.choreo.dev/project":      projectName,
		"core.choreo.dev/organization": orgName,
	}

	if err := k8sClient.List(context.Background(), componentList,
		client.InNamespace(orgName),
		labels); err != nil {
		return nil, errors.NewError("failed to list components for organization %s and project %s: %v", orgName, projectName, err)
	}

	return componentList, nil
}
func GetComponent(orgName, projectName, componentName string) (*choreov1.Component, error) {
	k8sClient, err := GetKubernetesClient()
	if err != nil {
		return nil, err
	}

	componentList := &choreov1.ComponentList{}
	labels := client.MatchingLabels{
		"core.choreo.dev/project":      projectName,
		"core.choreo.dev/name":         componentName,
		"core.choreo.dev/organization": orgName,
	}

	if err := k8sClient.List(context.Background(), componentList,
		client.InNamespace(orgName),
		labels); err != nil {
		return nil, errors.NewError("failed to list components for organization %s and project %s: %v", orgName, projectName, err)
	}

	if len(componentList.Items) == 0 {
		return nil, errors.NewError("component not found for organization %s, project %s, and component %s", orgName, projectName, componentName)
	}
	if len(componentList.Items) > 1 {
		return nil, errors.NewError("multiple components found for organization %s, project %s, and component %s", orgName, projectName, componentName)
	}

	return &componentList.Items[0], nil
}

func GetProject(orgName, projectName string) (*choreov1.Project, error) {
	k8sClient, err := GetKubernetesClient()
	if err != nil {
		return nil, err
	}

	projectList := &choreov1.ProjectList{}
	labels := client.MatchingLabels{
		"core.choreo.dev/organization": orgName,
		"core.choreo.dev/name":         projectName,
	}

	if err := k8sClient.List(context.Background(), projectList,
		client.InNamespace(orgName),
		labels); err != nil {
		return nil, errors.NewError("failed to list project for organization %s and project %s: %v", orgName, projectName, err)
	}

	if len(projectList.Items) == 0 {
		return nil, errors.NewError("project not found for organization %s and project %s", orgName, projectName)
	}

	return &projectList.Items[0], nil
}
