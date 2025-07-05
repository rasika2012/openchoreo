import React from 'react';
export interface SearchBarProps {
    onChange: (v: string) => void;
    placeholder?: string;
    iconPlacement?: 'left' | 'right';
    size?: 'small' | 'medium';
    color?: 'secondary';
    keyDown?: React.KeyboardEventHandler<HTMLInputElement | HTMLTextAreaElement>;
    testId: string;
    onFilterChange?: (value: string) => void;
    filterValue?: string;
    filterItems?: {
        value: number;
        label: string;
    }[];
    bordered?: boolean;
    inputValue?: string;
}
/**
 * SearchBar component
 * @component
 */
export declare const SearchBar: React.ForwardRefExoticComponent<SearchBarProps & React.RefAttributes<HTMLDivElement>>;
