export interface PageLayoutProps {
    testId: string;
    children: React.ReactNode;
    title: string;
    description?: string;
    backUrl?: string;
    backButtonText?: string;
    actions?: React.ReactNode;
}
export declare function PageLayout({ testId, children, title, description, backUrl, backButtonText, actions, }: PageLayoutProps): import("react/jsx-runtime").JSX.Element;
