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

package kubernetes

import (
	"testing"

	"github.com/google/go-cmp/cmp"
	corev1 "k8s.io/api/core/v1"

	choreov1 "github.com/wso2-enterprise/choreo-cp-declarative-api/api/v1"
)

type fakePort struct {
	Name     string
	Port     int32
	Protocol corev1.Protocol
}

func createFakePort(name string, port int32, protocol corev1.Protocol) fakePort {
	return fakePort{
		Name:     name,
		Port:     port,
		Protocol: protocol,
	}
}

func TestMakeUniquePorts(t *testing.T) {
	tests := []struct {
		name              string
		endpointTemplates []choreov1.EndpointTemplate
		want              []fakePort
	}{
		{
			name: "single endpoint",
			endpointTemplates: []choreov1.EndpointTemplate{
				{
					Spec: choreov1.EndpointSpec{
						Service: choreov1.EndpointServiceSpec{
							BasePath: "/customer",
							Port:     8080,
						},
						Type: choreov1.EndpointTypeREST,
					},
				},
			},
			want: []fakePort{
				{Name: "ep-8080-tcp", Port: 8080, Protocol: corev1.ProtocolTCP},
			},
		},
		{
			name: "two endpoints with same port and type",
			endpointTemplates: []choreov1.EndpointTemplate{
				{
					Spec: choreov1.EndpointSpec{
						Service: choreov1.EndpointServiceSpec{
							BasePath: "/customer",
							Port:     8080,
						},
						Type: choreov1.EndpointTypeREST,
					},
				},
				{
					Spec: choreov1.EndpointSpec{
						Service: choreov1.EndpointServiceSpec{
							BasePath: "/order",
							Port:     8080,
						},
						Type: choreov1.EndpointTypeREST,
					},
				},
			},
			want: []fakePort{
				{Name: "ep-8080-tcp", Port: 8080, Protocol: corev1.ProtocolTCP},
			},
		},
		{
			name: "two endpoints with same port but tcp and udp",
			endpointTemplates: []choreov1.EndpointTemplate{
				{
					Spec: choreov1.EndpointSpec{
						Service: choreov1.EndpointServiceSpec{
							Port: 8080,
						},
						Type: choreov1.EndpointTypeTCP,
					},
				},
				{
					Spec: choreov1.EndpointSpec{
						Service: choreov1.EndpointServiceSpec{
							Port: 8080,
						},
						Type: choreov1.EndpointTypeUDP,
					},
				},
			},
			want: []fakePort{
				{Name: "ep-8080-tcp", Port: 8080, Protocol: corev1.ProtocolTCP},
				{Name: "ep-8080-udp", Port: 8080, Protocol: corev1.ProtocolUDP},
			},
		},
		{
			name: "three endpoints with different ports",
			endpointTemplates: []choreov1.EndpointTemplate{
				{
					Spec: choreov1.EndpointSpec{
						Service: choreov1.EndpointServiceSpec{
							BasePath: "/customer",
							Port:     8080,
						},
						Type: choreov1.EndpointTypeREST,
					},
				},
				{
					Spec: choreov1.EndpointSpec{
						Service: choreov1.EndpointServiceSpec{
							BasePath: "/graphql",
							Port:     8081,
						},
						Type: choreov1.EndpointTypeGraphQL,
					},
				},
				{
					Spec: choreov1.EndpointSpec{
						Service: choreov1.EndpointServiceSpec{
							Port: 8082,
						},
						Type: choreov1.EndpointTypeGRPC,
					},
				},
			},
			want: []fakePort{
				{Name: "ep-8080-tcp", Port: 8080, Protocol: corev1.ProtocolTCP},
				{Name: "ep-8081-tcp", Port: 8081, Protocol: corev1.ProtocolTCP},
				{Name: "ep-8082-tcp", Port: 8082, Protocol: corev1.ProtocolTCP},
			},
		},
	}

	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			got := makeUniquePorts(tt.endpointTemplates, createFakePort)
			if diff := cmp.Diff(tt.want, got); diff != "" {
				t.Errorf("makeUniquePorts() returned unexpected result (-want, +got): %s", diff)
			}
		})
	}
}
