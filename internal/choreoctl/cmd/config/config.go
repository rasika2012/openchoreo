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

package config

import (
	"fmt"
	"os"
	"path/filepath"
	"text/tabwriter"

	"github.com/spf13/cobra"
	"k8s.io/client-go/tools/clientcmd"

	"github.com/wso2-enterprise/choreo-cp-declarative-api/internal/choreoctl/util"
	configContext "github.com/wso2-enterprise/choreo-cp-declarative-api/pkg/cli/cmd/config"
	"github.com/wso2-enterprise/choreo-cp-declarative-api/pkg/cli/flags"
	"github.com/wso2-enterprise/choreo-cp-declarative-api/pkg/cli/types/api"
)

// ConfigContextImpl implements context-related commands.
type ConfigContextImpl struct{}

// NewConfigContextImpl creates a new instance of ConfigContextImpl.
func NewConfigContextImpl() *ConfigContextImpl {
	return &ConfigContextImpl{}
}

// GetContexts prints all available contexts with their details.
func (c *ConfigContextImpl) GetContexts() error {
	cfg, err := util.LoadStoredConfig()
	if err != nil {
		return fmt.Errorf("failed to load config: %w", err)
	}

	if len(cfg.Contexts) == 0 {
		fmt.Println("No contexts stored.")
		return nil
	}

	w := tabwriter.NewWriter(os.Stdout, 0, 0, 3, ' ', 0)
	fmt.Fprintln(w, "NAME\tORGANIZATION\tPROJECT\tCOMPONENT\tENVIRONMENT\tDATAPLANE\tK8S CONFIG\tK8S CONTEXT")

	for _, ctx := range cfg.Contexts {
		// Current context marker
		marker := " "
		if cfg.CurrentContext == ctx.Name {
			marker = "*"
		}

		// Get cluster details
		kubeconfig := "-"
		kubecontext := "-"
		if ctx.ClusterRef != "" {
			for _, cluster := range cfg.Clusters {
				if cluster.Name == ctx.ClusterRef {
					if cluster.Kubeconfig != "" {
						kubeconfig = cluster.Kubeconfig
					}
					if cluster.Context != "" {
						kubecontext = cluster.Context
					}
					break
				}
			}
		}

		// Format output with empty value handling
		fmt.Fprintf(w, "%s%s\t%s\t%s\t%s\t%s\t%s\t%s\t%s\n",
			marker,
			getValueOrDefault(ctx.Name),
			getValueOrDefault(ctx.Organization),
			getValueOrDefault(ctx.Project),
			getValueOrDefault(ctx.Component),
			getValueOrDefault(ctx.Environment),
			getValueOrDefault(ctx.DataPlane),
			kubeconfig,
			kubecontext,
		)
	}

	return w.Flush()
}

func getValueOrDefault(value string) string {
	if value == "" {
		return "-"
	}
	return value
}

// GetCurrentContext prints the current context details.
func (c *ConfigContextImpl) GetCurrentContext() error {
	cfg, err := util.LoadStoredConfig()
	if err != nil {
		return fmt.Errorf("failed to load config: %w", err)
	}

	if cfg.CurrentContext == "" {
		fmt.Println("No current context is set.")
		return nil
	}

	var currentCtx *configContext.Context
	for _, ctx := range cfg.Contexts {
		if ctx.Name == cfg.CurrentContext {
			ctxCopy := ctx
			currentCtx = &ctxCopy
			break
		}
	}

	if currentCtx == nil {
		return fmt.Errorf("current context %q not found in config", cfg.CurrentContext)
	}

	// Create tabwriter for main context info
	w := tabwriter.NewWriter(os.Stdout, 0, 0, 2, ' ', 0)

	fmt.Fprintf(w, "Current Context:\t%s\n", currentCtx.Name)
	fmt.Fprintf(w, "Organization\t%s\n", getValueOrDefault(currentCtx.Organization))
	fmt.Fprintf(w, "Project\t%s\n", getValueOrDefault(currentCtx.Project))
	fmt.Fprintf(w, "Component\t%s\n", getValueOrDefault(currentCtx.Component))
	fmt.Fprintf(w, "Environment\t%s\n", getValueOrDefault(currentCtx.Environment))
	fmt.Fprintf(w, "Data Plane\t%s\n", getValueOrDefault(currentCtx.DataPlane))
	w.Flush()

	// Print cluster info if available
	if currentCtx.ClusterRef != "" {
		for _, cluster := range cfg.Clusters {
			if cluster.Name == currentCtx.ClusterRef {
				fmt.Println("\nCluster:")
				w := tabwriter.NewWriter(os.Stdout, 2, 0, 2, ' ', 0)
				fmt.Fprintf(w, "  Name\t%s\n", cluster.Name)
				fmt.Fprintf(w, "  Kubeconfig\t%s\n", cluster.Kubeconfig)
				fmt.Fprintf(w, "  Context\t%s\n", cluster.Context)
				w.Flush()
				break
			}
		}
	}

	return nil
}

// SetContext creates or updates a configuration context with the given parameters.
func (c *ConfigContextImpl) SetContext(params api.SetContextParams) error {
	// 1. Load the stored choreo config
	cfg, err := util.LoadStoredConfig()
	if err != nil {
		return fmt.Errorf("failed to load config: %w", err)
	}

	// 2. Fill missing kubeconfig/context from current context if needed
	c.fillKubeconfigAndContextFromCurrent(cfg, &params)

	// 3. Fall back to default kubeconfig if still unset
	if err := c.fallbackToDefaultKubeconfig(&params); err != nil {
		return err
	}

	// 4. Validate kubeconfig and context
	if err := c.validateKubeconfigAndContext(&params); err != nil {
		return err
	}

	// 5. Reuse or create a cluster reference
	clusterRef, err := c.getOrCreateCluster(cfg, params)
	if err != nil {
		return err
	}

	// 6. Update or create the context
	if err := c.updateOrCreateContext(cfg, params, clusterRef); err != nil {
		return err
	}

	return nil
}

// fillKubeconfigAndContextFromCurrent updates params with kubeconfig/context from current context if they are missing.
func (c *ConfigContextImpl) fillKubeconfigAndContextFromCurrent(cfg *configContext.StoredConfig, params *api.SetContextParams) {
	if params.KubeconfigPath != "" || params.KubeContext != "" {
		return
	}
	if cfg.CurrentContext == "" {
		return
	}
	for _, ctx := range cfg.Contexts {
		if ctx.Name == cfg.CurrentContext {
			for _, cluster := range cfg.Clusters {
				if cluster.Name == ctx.ClusterRef {
					params.KubeconfigPath = cluster.Kubeconfig
					params.KubeContext = cluster.Context
					return
				}
			}
		}
	}
}

// fallbackToDefaultKubeconfig sets the default kubeconfig path if none is provided.
func (c *ConfigContextImpl) fallbackToDefaultKubeconfig(params *api.SetContextParams) error {
	if params.KubeconfigPath != "" {
		return nil
	}
	defaultPath, err := util.GetDefaultKubeconfigPath()
	if err != nil {
		return fmt.Errorf("failed to get default kubeconfig path: %w", err)
	}
	params.KubeconfigPath = defaultPath
	return nil
}

// validateKubeconfigAndContext ensures the kubeconfig file is valid and sets context if empty.
func (c *ConfigContextImpl) validateKubeconfigAndContext(params *api.SetContextParams) error {
	k8sCfg, err := clientcmd.LoadFromFile(params.KubeconfigPath)
	if err != nil {
		return fmt.Errorf("failed to load kubeconfig from %s: %w", params.KubeconfigPath, err)
	}
	if params.KubeContext == "" {
		if k8sCfg.CurrentContext == "" {
			return fmt.Errorf("no current context in kubeconfig; please specify --kube-context")
		}
		params.KubeContext = k8sCfg.CurrentContext
	}
	return nil
}

// getOrCreateCluster reuses or creates a cluster entry for the given kubeconfig and context.
func (c *ConfigContextImpl) getOrCreateCluster(cfg *configContext.StoredConfig, params api.SetContextParams) (string, error) {
	absPath, err := filepath.Abs(params.KubeconfigPath)
	if err != nil {
		return "", fmt.Errorf("cannot resolve kubeconfig path: %w", err)
	}

	// Check if a matching cluster already exists
	for i := range cfg.Clusters {
		cPath, cErr := filepath.Abs(cfg.Clusters[i].Kubeconfig)
		if cErr != nil {
			continue
		}
		if cPath == absPath && cfg.Clusters[i].Context == params.KubeContext {
			// Found exact match, reuse it
			return cfg.Clusters[i].Name, nil
		}
	}

	// Create a new cluster with a unique name
	clusterName := fmt.Sprintf("cluster-%s", params.KubeContext)
	newCluster := configContext.KubernetesCluster{
		Name:       clusterName,
		Kubeconfig: params.KubeconfigPath,
		Context:    params.KubeContext,
	}
	cfg.Clusters = append(cfg.Clusters, newCluster)
	return clusterName, nil
}

// updateOrCreateContext merges or creates the context and saves config.
func (c *ConfigContextImpl) updateOrCreateContext(
	cfg *configContext.StoredConfig,
	params api.SetContextParams,
	clusterRef string,
) error {
	newCtx := configContext.Context{
		Name:         params.Name,
		Organization: params.Organization,
		Project:      params.Project,
		Component:    params.Component,
		Environment:  params.Environment,
		DataPlane:    params.DataPlane,
		ClusterRef:   clusterRef,
	}

	found := false
	for i := range cfg.Contexts {
		if cfg.Contexts[i].Name == params.Name {
			// Preserve existing fields if not provided
			if params.Organization == "" {
				newCtx.Organization = cfg.Contexts[i].Organization
			}
			if params.Project == "" {
				newCtx.Project = cfg.Contexts[i].Project
			}
			if params.Component == "" {
				newCtx.Component = cfg.Contexts[i].Component
			}
			if params.Environment == "" {
				newCtx.Environment = cfg.Contexts[i].Environment
			}
			if params.DataPlane == "" {
				newCtx.DataPlane = cfg.Contexts[i].DataPlane
			}
			cfg.Contexts[i] = newCtx
			found = true
			break
		}
	}
	if !found {
		cfg.Contexts = append(cfg.Contexts, newCtx)
	}

	if err := util.SaveStoredConfig(cfg); err != nil {
		return fmt.Errorf("failed to save updated config: %w", err)
	}

	action := "Updated"
	if !found {
		action = "Created"
	}
	fmt.Printf("%s context: %s\n", action, params.Name)

	return nil
}

// UseContext sets the current context to the context with the given name.
func (c *ConfigContextImpl) UseContext(params api.UseContextParams) error {
	cfg, err := util.LoadStoredConfig()
	if err != nil {
		return fmt.Errorf("failed to load config: %w", err)
	}
	found := false
	for _, ctx := range cfg.Contexts {
		if ctx.Name == params.Name {
			found = true
			break
		}
	}
	if !found {
		return fmt.Errorf("context '%s' not found", params.Name)
	}
	cfg.CurrentContext = params.Name
	if err := util.SaveStoredConfig(cfg); err != nil {
		return fmt.Errorf("failed to save config: %w", err)
	}
	fmt.Printf("Now using context: %s\n", params.Name)
	return nil
}

// Add helper function to manage clusters

func (c *ConfigContextImpl) AddCluster(cluster *configContext.KubernetesCluster) error {
	cfg, err := util.LoadStoredConfig()
	if err != nil {
		return fmt.Errorf("failed to load config: %w", err)
	}

	// Check for duplicate cluster names
	for _, existing := range cfg.Clusters {
		if existing.Name == cluster.Name {
			return fmt.Errorf("cluster %s already exists", cluster.Name)
		}
	}

	cfg.Clusters = append(cfg.Clusters, *cluster)
	return util.SaveStoredConfig(cfg)
}

// Add function to get cluster by name

func (c *ConfigContextImpl) GetCluster(name string) (*configContext.KubernetesCluster, error) {
	cfg, err := util.LoadStoredConfig()
	if err != nil {
		return nil, fmt.Errorf("failed to load config: %w", err)
	}

	for _, cluster := range cfg.Clusters {
		if cluster.Name == name {
			return &cluster, nil
		}
	}
	return nil, fmt.Errorf("cluster %s not found", name)
}

// ApplyContextDefaults loads the stored config and sets default flag values
// from the current context, if not already provided.
func ApplyContextDefaults(cmd *cobra.Command) error {
	// Skip for certain commands to avoid circular dependencies
	if cmd.Parent() != nil && cmd.Parent().Name() == "config" {
		return nil
	}

	cfg, err := util.LoadStoredConfig()
	if err != nil {
		return fmt.Errorf("failed to load config: %w", err)
	}

	// No defaults to apply if no current context
	if cfg.CurrentContext == "" {
		return nil
	}

	// Find current context and its cluster
	var curCtx *configContext.Context
	var curCluster *configContext.KubernetesCluster

	for _, c := range cfg.Contexts {
		if c.Name == cfg.CurrentContext {
			ctxCopy := c // Create copy to avoid pointer to loop variable
			curCtx = &ctxCopy

			// Find associated cluster
			if curCtx.ClusterRef != "" {
				for _, cluster := range cfg.Clusters {
					if cluster.Name == curCtx.ClusterRef {
						clusterCopy := cluster
						curCluster = &clusterCopy
						break
					}
				}
			}
			break
		}
	}

	if curCtx == nil {
		return fmt.Errorf("current context %q not found", cfg.CurrentContext)
	}

	// Apply context-based defaults only if flags not explicitly set
	applyIfNotSet(cmd, flags.Organization.Name, curCtx.Organization)
	applyIfNotSet(cmd, flags.Project.Name, curCtx.Project)
	applyIfNotSet(cmd, flags.Environment.Name, curCtx.Environment)
	applyIfNotSet(cmd, flags.Component.Name, curCtx.Component)
	applyIfNotSet(cmd, flags.DataPlane.Name, curCtx.DataPlane)

	// Apply cluster config if available
	if curCluster != nil {
		if cmd.Flags().Lookup("kubeconfig") != nil {
			applyIfNotSet(cmd, "kubeconfig", curCluster.Kubeconfig)
		}
		if cmd.Flags().Lookup("context") != nil {
			applyIfNotSet(cmd, "context", curCluster.Context)
		}
	}

	return nil
}

// Helper function to apply flag value if not already set
func applyIfNotSet(cmd *cobra.Command, flagName, value string) {
	if value != "" && !cmd.Flags().Changed(flagName) {
		if flag := cmd.Flags().Lookup(flagName); flag != nil {
			_ = cmd.Flags().Set(flagName, value)
		}
	}
}

// InitializeDefaultContext creates and sets a default context if none exists.
func InitializeDefaultContext() error {
	if !util.IsLoginConfigFileExists() {
		// Get default kubeconfig path
		kubeconfigPath, err := util.GetDefaultKubeconfigPath()
		if err != nil {
			return fmt.Errorf("failed to get kubeconfig path: %w", err)
		}

		// Load k8s config to get default context
		k8sConfig, err := clientcmd.LoadFromFile(kubeconfigPath)
		if err != nil {
			return fmt.Errorf("failed to load kubeconfig: %w", err)
		}

		// Load existing config or create new if not exists
		cfg, err := util.LoadStoredConfig()
		if err != nil {
			return err
		}

		// If no contexts exist, create default context with cluster
		if len(cfg.Contexts) == 0 {
			// Add default cluster mapping
			defaultCluster := configContext.KubernetesCluster{
				Name:       "default-cluster",
				Kubeconfig: kubeconfigPath,
				Context:    k8sConfig.CurrentContext,
			}
			cfg.Clusters = append(cfg.Clusters, defaultCluster)

			// Create default context
			defaultContext := configContext.Context{
				Name:         "default",
				Organization: "default-org",
				Project:      "default-project",
				DataPlane:    "default-dataplane",
				Environment:  "development",
				ClusterRef:   defaultCluster.Name,
			}
			cfg.Contexts = append(cfg.Contexts, defaultContext)

			// Set as current context
			cfg.CurrentContext = defaultContext.Name

			// Save the config file
			if err := util.SaveStoredConfig(cfg); err != nil {
				return fmt.Errorf("failed to save default config: %w", err)
			}
		}
	}

	return nil
}
