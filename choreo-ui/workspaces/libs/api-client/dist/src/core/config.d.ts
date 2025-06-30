export interface ApiConfig {
    baseUrl: string;
    headers?: Record<string, string>;
}
export declare const defaultConfig: ApiConfig;
export declare class ApiError extends Error {
    status: number;
    statusText: string;
    response?: any;
    constructor(message: string, status: number, statusText: string, response?: any);
}
export declare function apiRequest<T>(url: string, options?: RequestInit, config?: ApiConfig): Promise<T>;
