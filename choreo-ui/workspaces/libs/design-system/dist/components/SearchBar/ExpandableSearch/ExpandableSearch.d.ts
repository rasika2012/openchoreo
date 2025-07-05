import React from 'react';
export interface AutofocusFieldProps {
    onChange: (data: any) => void;
    onClearClick: () => void;
    onBlur: (data: any) => void;
    searchQuery: string;
    inputReference: React.RefObject<HTMLInputElement | null>;
    size?: 'small' | 'medium';
    placeholder?: string;
    testId: string;
}
/**
 * SearchBar component
 * @component
 */
export declare const AutofocusField: React.ForwardRefExoticComponent<AutofocusFieldProps & React.RefAttributes<HTMLDivElement>>;
export interface ExpandableSearchProps {
    searchString: string;
    setSearchString: (value: string) => void;
    direction?: 'left' | 'right';
    placeholder?: string;
    testId: string;
    size?: 'small' | 'medium';
}
export declare const ExpandableSearch: React.ForwardRefExoticComponent<ExpandableSearchProps & React.RefAttributes<HTMLDivElement>>;
