import { useContext } from "react";
import { ApiClientContext, } from "../providers/ApiClientProvider";
export const useClient = () => {
    const { apiClient } = useContext(ApiClientContext);
    return apiClient;
};
//# sourceMappingURL=useClient.js.map