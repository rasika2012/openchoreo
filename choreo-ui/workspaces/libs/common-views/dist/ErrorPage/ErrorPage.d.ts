export interface ErrorPageProps {
    image: React.ReactNode;
    title: React.ReactNode;
    description: React.ReactNode;
}
export declare function ErrorPage(props: ErrorPageProps): import("react/jsx-runtime").JSX.Element;
export interface PresetErrorPageProps {
    preset: 'default' | '404' | '500';
}
export declare function PresetErrorPage(props: PresetErrorPageProps): import("react/jsx-runtime").JSX.Element;
