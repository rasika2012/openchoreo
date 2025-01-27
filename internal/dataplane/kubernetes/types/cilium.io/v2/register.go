package v2

import (
	metav1 "k8s.io/apimachinery/pkg/apis/meta/v1"
	"k8s.io/apimachinery/pkg/runtime"
	"k8s.io/apimachinery/pkg/runtime/schema"
)

// Register this GroupVersion with the scheme

var (
	SchemeGroupVersion = schema.GroupVersion{Group: "cilium.io", Version: "v2"}
)

// AddToScheme is typically used in main.go to register
func AddToScheme(s *runtime.Scheme) error {
	s.AddKnownTypes(SchemeGroupVersion,
		&CiliumNetworkPolicy{},
		&CiliumNetworkPolicyList{},
	)
	metav1.AddToGroupVersion(s, SchemeGroupVersion)
	return nil
}
