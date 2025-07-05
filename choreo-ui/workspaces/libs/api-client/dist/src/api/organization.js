import { apiRequest } from '../core/config';
export const organizationApi = {
    async listOrganizations(config) {
        return apiRequest(`/api/v1/orgs`, { method: 'GET' }, config);
    },
};
//# sourceMappingURL=organization.js.map