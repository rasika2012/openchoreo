export const defaultConfig = {
    baseUrl: 'http://localhost:3001',
    headers: {
        'Content-Type': 'application/json',
    },
};
export class ApiError extends Error {
    status;
    statusText;
    response;
    constructor(message, status, statusText, response) {
        super(message);
        this.status = status;
        this.statusText = statusText;
        this.response = response;
        this.name = 'ApiError';
    }
}
export async function apiRequest(url, options = {}, config = defaultConfig) {
    const fullUrl = `${config.baseUrl}${url}`;
    const fetchOptions = {
        ...options,
        headers: {
            ...config.headers,
            ...options.headers,
        },
    };
    const response = await fetch(fullUrl, fetchOptions);
    if (!response.ok) {
        let errorMessage = `HTTP ${response.status}: ${response.statusText}`;
        let responseData;
        try {
            responseData = await response.json();
            errorMessage = responseData.message || errorMessage;
        }
        catch {
            // If response is not JSON, use the default error message
        }
        throw new ApiError(errorMessage, response.status, response.statusText, responseData);
    }
    // Handle empty responses
    const contentType = response.headers.get('content-type');
    if (contentType && contentType.includes('application/json')) {
        return response.json();
    }
    return response.text();
}
//# sourceMappingURL=config.js.map