export declare function useUrlParams(): Readonly<Partial<{
    orgHandle: string;
    projectHandle: string;
    componentHandle: string;
    page: string;
    subPage: string;
}>>;
export declare function usePathMatchOrg(): import("react-router").PathMatch<"orgHandle" | "*">;
export declare function useOrgHandle(): string;
export declare function useProjectHandle(): string;
export declare function useComponentHandle(): string;
export declare function usePathMatchProject(): import("react-router").PathMatch<"orgHandle" | "projectHandle" | "*">;
export declare function usePathMatchComponent(): import("react-router").PathMatch<"orgHandle" | "projectHandle" | "componentHandle" | "*">;
export declare function useHomePath(): string;
