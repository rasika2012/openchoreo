import React from 'react';
export interface AvatarUserNameProps {
    /** The content to be rendered within the component */
    children?: React.ReactNode;
    /** Additional CSS class names */
    className?: string;
    /** Click event handler */
    onClick?: (event: React.MouseEvent<HTMLDivElement>) => void;
    /** Whether the component is disabled */
    disabled?: boolean;
    /**
     * username to be displayed
     */
    username?: string | 'John Doe';
    /**
     * hide the username
     */
    hideUsername?: boolean;
    /**
     * The sx prop for custom styles
     */
    sx?: React.CSSProperties;
    /**
     * Additional props for the component
     */
    [key: string]: any;
}
/**
 * AvatarUserName component
 * @component
 */
export declare const AvatarUserName: React.ForwardRefExoticComponent<Omit<AvatarUserNameProps, "ref"> & React.RefAttributes<HTMLDivElement>>;
