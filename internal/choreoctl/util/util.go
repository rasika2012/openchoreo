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
	"reflect"
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
	"github.com/wso2-enterprise/choreo-cp-declarative-api/pkg/cli/cmd/config"
	"github.com/wso2-enterprise/choreo-cp-declarative-api/pkg/cli/common/constants"
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
	return filepath.Join(homeDir, ".choreoctl", "config"), nil
}

func SaveLoginConfig(kubeconfigPath, context string) error {
	configPath, err := GetLoginConfigFilePath()
	if err != nil {
		return err
	}

	if err := os.MkdirAll(filepath.Dir(configPath), os.ModePerm); err != nil {
		return errors.NewError("failed to create config directory %v", err)
	}

	viper.SetConfigFile(configPath)
	viper.SetConfigType("yaml")
	viper.Set("kubeconfig", kubeconfigPath)
	viper.Set("context", context)

	if err := viper.WriteConfigAs(configPath); err != nil {
		return errors.NewError("failed to write login config %v", err)
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
	// Load stored choreoctl config
	cfg, err := LoadStoredConfig()
	if err != nil {
		return "", "", fmt.Errorf("failed to load config: %w", err)
	}

	// Check for current context
	if cfg.CurrentContext == "" {
		return "", "", fmt.Errorf("no current context set")
	}

	// Find current context
	var currentContext *config.Context
	for _, ctx := range cfg.Contexts {
		if ctx.Name == cfg.CurrentContext {
			currentContext = &ctx
			break
		}
	}
	if currentContext == nil {
		return "", "", fmt.Errorf("current context %q not found", cfg.CurrentContext)
	}

	// Find referenced cluster
	if currentContext.ClusterRef == "" {
		return "", "", fmt.Errorf("no cluster reference in context %q", cfg.CurrentContext)
	}

	// Get cluster config
	for _, cluster := range cfg.Clusters {
		if cluster.Name == currentContext.ClusterRef {
			return cluster.Kubeconfig, cluster.Context, nil
		}
	}

	return "", "", fmt.Errorf("referenced cluster %q not found", currentContext.ClusterRef)
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
	projectList, err := GetProjects(organization)
	if err != nil {
		return nil, err
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

type GenericResource interface {
	metav1.Object
	runtime.Object
}

type GenericList interface {
	runtime.Object
	GetItems() []runtime.Object
}

// newPtrTypeOf returns a fresh pointer of type L.
// If L == *choreov1.BuildList, it returns &choreov1.BuildList{}.
func newPtrTypeOf[L any]() L {
	t := reflect.TypeOf((*L)(nil)).Elem() // e.g. *choreov1.BuildList
	if t.Kind() != reflect.Pointer {
		panic("L must be a pointer type, e.g. *BuildList")
	}
	elem := t.Elem() // e.g. choreov1.BuildList
	v := reflect.New(elem).Interface()
	return v.(L)
}

// GetResource fetches exactly one resource matching the given labels.
// T is a non-pointer struct (e.g. choreov1.Build).
// L is a pointer-to-list type (e.g. *choreov1.BuildList).
func GetResource[T any, L client.ObjectList](namespace string, labels map[string]string) (*T, error) {
	k8sClient, err := GetKubernetesClient()
	if err != nil {
		return nil, err
	}

	// Instantiate something like &choreov1.BuildList{}
	list := newPtrTypeOf[L]()
	if err := k8sClient.List(context.Background(), list,
		client.InNamespace(namespace),
		client.MatchingLabels(labels),
	); err != nil {
		return nil, errors.NewError("failed to list resource: %v", err)
	}

	// Reflect the .Items field
	itemsVal := reflect.ValueOf(list).Elem().FieldByName("Items")
	if !itemsVal.IsValid() || itemsVal.Len() == 0 {
		return nil, errors.NewError("resource not found")
	}
	if itemsVal.Len() > 1 {
		return nil, errors.NewError("multiple resources found")
	}

	// The single item is a struct T, so .Addr() is *T.
	item := itemsVal.Index(0).Addr().Interface().(*T)
	return item, nil
}

// GetResources fetches all resources matching the given labels.
// T is a non-pointer struct (e.g. choreov1.Build).
// L is a pointer-to-list type (e.g. *choreov1.BuildList).
func GetResources[T any, L client.ObjectList](namespace string, labels map[string]string) (L, error) {
	k8sClient, err := GetKubernetesClient()
	if err != nil {
		return newPtrTypeOf[L](), err
	}

	// e.g. &choreov1.BuildList{}
	list := newPtrTypeOf[L]()
	if err := k8sClient.List(
		context.Background(),
		list,
		client.InNamespace(namespace),
		client.MatchingLabels(labels),
	); err != nil {
		return newPtrTypeOf[L](), fmt.Errorf("failed to list resources: %w", err)
	}
	return list, nil
}

func CreateChoreoLabels(org, project, component, name string) map[string]string {
	labels := map[string]string{
		constants.LabelOrganization: org,
	}
	if project != "" {
		labels[constants.LabelProject] = project
	}
	if component != "" {
		labels[constants.LabelComponent] = component
	}
	if name != "" {
		labels[constants.LabelName] = name
	}
	return labels
}

func GetBuild(orgName, projectName, componentName, buildName string) (*choreov1.Build, error) {
	labels := CreateChoreoLabels(orgName, projectName, componentName, buildName)
	return GetResource[choreov1.Build, *choreov1.BuildList](orgName, labels)
}

func GetAllBuilds(orgName, projectName, componentName string) (*choreov1.BuildList, error) {
	labels := CreateChoreoLabels(orgName, projectName, componentName, "")
	return GetResources[choreov1.Build, *choreov1.BuildList](orgName, labels)
}

func GetProject(orgName, projectName string) (*choreov1.Project, error) {
	labels := CreateChoreoLabels(orgName, "", "", projectName)
	return GetResource[choreov1.Project, *choreov1.ProjectList](orgName, labels)
}

func GetProjects(orgName string) (*choreov1.ProjectList, error) {
	labels := CreateChoreoLabels(orgName, "", "", "")
	return GetResources[choreov1.Project, *choreov1.ProjectList](orgName, labels)
}

func GetComponent(orgName, projectName, componentName string) (*choreov1.Component, error) {
	labels := CreateChoreoLabels(orgName, projectName, "", componentName)
	return GetResource[choreov1.Component, *choreov1.ComponentList](orgName, labels)
}

func GetAllComponents(orgName, projectName string) (*choreov1.ComponentList, error) {
	labels := CreateChoreoLabels(orgName, projectName, "", "")
	return GetResources[choreov1.Component, *choreov1.ComponentList](orgName, labels)
}

func GetDeployableArtifact(orgName, projectName, componentName, deployableArtifactName string) (*choreov1.DeployableArtifact, error) {
	labels := CreateChoreoLabels(orgName, projectName, componentName, deployableArtifactName)
	return GetResource[choreov1.DeployableArtifact, *choreov1.DeployableArtifactList](orgName, labels)
}

func GetAllDeployableArtifacts(orgName, projectName, componentName string) (*choreov1.DeployableArtifactList, error) {
	labels := CreateChoreoLabels(orgName, projectName, componentName, "")
	return GetResources[choreov1.DeployableArtifact, *choreov1.DeployableArtifactList](orgName, labels)
}

func GetDeployableArtifactNames(orgName, projectName, componentName string) ([]string, error) {
	deployableArtifactList, err := GetAllDeployableArtifacts(orgName, projectName, componentName)
	if err != nil {
		return nil, err
	}

	names := make([]string, 0, len(deployableArtifactList.Items))
	for _, artifact := range deployableArtifactList.Items {
		names = append(names, artifact.Name)
	}

	sort.Strings(names)
	return names, nil
}

func GetBuildNames(orgName, projectName, componentName string) ([]string, error) {
	buildList, err := GetAllBuilds(orgName, projectName, componentName)
	if err != nil {
		return nil, err
	}

	names := make([]string, 0, len(buildList.Items))
	for _, build := range buildList.Items {
		names = append(names, build.Name)
	}

	sort.Strings(names)
	return names, nil
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

func GetComponentNames(orgName, projectName string) ([]string, error) {
	componentList, err := GetAllComponents(orgName, projectName)
	if err != nil {
		return nil, err
	}

	names := make([]string, 0, len(componentList.Items))
	for _, comp := range componentList.Items {
		names = append(names, comp.Name)
	}

	sort.Strings(names)
	return names, nil
}

func GetDeployment(orgName, projectName, componentName, deploymentName string) (*choreov1.Deployment, error) {
	labels := CreateChoreoLabels(orgName, projectName, componentName, deploymentName)
	return GetResource[choreov1.Deployment, *choreov1.DeploymentList](orgName, labels)
}

func GetAllDeployments(orgName, projectName, componentName string) (*choreov1.DeploymentList, error) {
	labels := CreateChoreoLabels(orgName, projectName, componentName, "")
	return GetResources[choreov1.Deployment, *choreov1.DeploymentList](orgName, labels)
}

func GetEnvironmentNames(orgName string) ([]string, error) {
	fmt.Println("list of environments" + orgName)
	envList, err := GetAllEnvironments(orgName)
	if err != nil {
		return nil, err
	}

	names := make([]string, 0, len(envList.Items))
	for _, env := range envList.Items {
		names = append(names, env.Name)
	}

	sort.Strings(names)
	return names, nil
}

func GetEnvironment(orgName, envName string) (*choreov1.Environment, error) {
	labels := CreateChoreoLabels(orgName, "", "", envName)
	return GetResource[choreov1.Environment, *choreov1.EnvironmentList](orgName, labels)
}

func GetAllEnvironments(orgName string) (*choreov1.EnvironmentList, error) {
	labels := CreateChoreoLabels(orgName, "", "", "")
	return GetResources[choreov1.Environment, *choreov1.EnvironmentList](orgName, labels)
}

func GetDataPlane(orgName, dataPlaneName string) (*choreov1.DataPlane, error) {
	labels := CreateChoreoLabels(orgName, "", "", dataPlaneName)
	return GetResource[choreov1.DataPlane, *choreov1.DataPlaneList](orgName, labels)
}

func GetDataPlanes(orgName string) (*choreov1.DataPlaneList, error) {
	labels := CreateChoreoLabels(orgName, "", "", "")
	return GetResources[choreov1.DataPlane, *choreov1.DataPlaneList](orgName, labels)
}

func GetDataPlaneNames(orgName string) ([]string, error) {
	dataPlaneList, err := GetDataPlanes(orgName)
	if err != nil {
		return nil, err
	}

	names := make([]string, 0, len(dataPlaneList.Items))
	for _, dataPlane := range dataPlaneList.Items {
		names = append(names, dataPlane.Name)
	}

	sort.Strings(names)
	return names, nil
}

func GetDeploymentTrack(orgName, projectName, componentName, trackName string) (*choreov1.DeploymentTrack, error) {
	labels := CreateChoreoLabels(orgName, projectName, componentName, trackName)
	return GetResource[choreov1.DeploymentTrack, *choreov1.DeploymentTrackList](orgName, labels)
}

func GetAllDeploymentTracks(orgName, projectName, componentName string) (*choreov1.DeploymentTrackList, error) {
	labels := CreateChoreoLabels(orgName, projectName, componentName, "")
	return GetResources[choreov1.DeploymentTrack, *choreov1.DeploymentTrackList](orgName, labels)
}

func GetEndpoint(orgName, projectName, componentName, envName, endpointName string) (*choreov1.Endpoint, error) {
	labels := CreateChoreoLabels(orgName, projectName, componentName, endpointName)
	labels["core.choreo.dev/environment"] = envName
	return GetResource[choreov1.Endpoint, *choreov1.EndpointList](orgName, labels)
}

func GetAllEndpoints(orgName, projectName, componentName, envName string) (*choreov1.EndpointList, error) {
	labels := CreateChoreoLabels(orgName, projectName, componentName, "")
	labels["core.choreo.dev/environment"] = envName
	return GetResources[choreov1.Endpoint, *choreov1.EndpointList](orgName, labels)
}

func GetDeploymentTrackNames(orgName, projectName, componentName string) ([]string, error) {
	deploymentTrackList, err := GetAllDeploymentTracks(orgName, projectName, componentName)
	if err != nil {
		return nil, err
	}

	names := make([]string, 0, len(deploymentTrackList.Items))
	for _, track := range deploymentTrackList.Items {
		names = append(names, track.Name)
	}

	sort.Strings(names)
	return names, nil
}

// SaveStoredConfig writes the StoredConfig data to the config file
func SaveStoredConfig(cfg *config.StoredConfig) error {
	configPath, err := GetLoginConfigFilePath()
	if err != nil {
		return err
	}

	data, err := yaml.Marshal(cfg)
	if err != nil {
		return errors.NewError("failed to marshal config: %v", err)
	}

	// Ensure directory exists
	if err := os.MkdirAll(filepath.Dir(configPath), 0755); err != nil {
		return errors.NewError("failed to create config directory: %v", err)
	}

	return os.WriteFile(configPath, data, 0600)
}

// LoadStoredConfig reads the config file and unmarshals it into StoredConfig
func LoadStoredConfig() (*config.StoredConfig, error) {
	configPath, err := GetLoginConfigFilePath()
	if err != nil {
		return nil, err
	}

	data, err := os.ReadFile(configPath)
	if os.IsNotExist(err) {
		return &config.StoredConfig{}, nil
	} else if err != nil {
		return nil, errors.NewError("failed to read config file: %v", err)
	}

	var cfg config.StoredConfig
	if err := yaml.Unmarshal(data, &cfg); err != nil {
		return nil, errors.NewError("failed to parse config: %v", err)
	}

	return &cfg, nil
}
