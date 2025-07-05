import { useClient } from "./useClient";
import { useQuery } from "@tanstack/react-query";
export const useComponent = (orgName, prorjectId, componentId) => {
    const client = useClient();
    return useQuery({
        queryKey: ["component", prorjectId, componentId, orgName, client],
        queryFn: () => {
            if (prorjectId && componentId) {
                return client.getComponent(orgName, prorjectId, componentId);
            }
            return null;
        },
    });
};
export const useComponentList = (orgName, projectId) => {
    const client = useClient();
    return useQuery({
        queryKey: ["componentList", projectId, orgName, client],
        queryFn: () => {
            if (projectId) {
                return client.listProjectComponents(orgName, projectId);
            }
            return null;
        },
    });
};
//# sourceMappingURL=useComponent.js.map