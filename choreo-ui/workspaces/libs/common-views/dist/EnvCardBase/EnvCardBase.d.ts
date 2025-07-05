export interface EnvCardBaseProps {
    envName: string;
    isRefetching?: boolean;
    isLoading?: boolean;
    isRedeploying?: boolean;
    isDeploying?: boolean;
    isStopping?: boolean;
    onRefresh?: () => void;
    onRedeploy?: () => void;
    onStop?: () => void;
    children?: React.ReactNode;
}
export declare function EnvCardBase(props: EnvCardBaseProps): import("react/jsx-runtime").JSX.Element;
