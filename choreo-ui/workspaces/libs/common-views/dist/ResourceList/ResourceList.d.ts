export interface Resource {
    id: string;
    name: string;
    description: string;
    type: string;
    lastUpdated: string;
    href?: string;
}
export interface ResourceListProps {
    resources?: Resource[];
    footerResourceListCardLeft?: React.ReactNode;
    footerResourceListCardRight?: React.ReactNode;
    cardWidth?: string | number;
}
export declare function ResourceList(props: ResourceListProps): import("react/jsx-runtime").JSX.Element;
