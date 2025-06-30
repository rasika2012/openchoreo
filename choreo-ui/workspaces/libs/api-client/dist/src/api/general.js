import { apiRequest } from '../core/config';
export const generalApi = {
    /**
     * List available endpoints
     * @param config - Optional API configuration
     * @returns Promise<EndpointsResponse> - List of available API endpoints
     */
    async listEndpoints(config) {
        return apiRequest('/', { method: 'GET' }, config);
    },
};
//# sourceMappingURL=general.js.map