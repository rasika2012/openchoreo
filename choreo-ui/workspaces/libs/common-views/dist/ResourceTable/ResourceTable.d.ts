export interface Resource {
    id: string;
    name: string;
    description: string;
    type: string;
    lastUpdated: string;
    href?: string;
}
export interface ResourceTableProps {
    resources: Resource[];
}
export declare function ResourceTable(props: ResourceTableProps): import("react/jsx-runtime").JSX.Element;
