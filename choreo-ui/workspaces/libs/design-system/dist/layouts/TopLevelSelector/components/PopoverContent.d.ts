import React from 'react';
import { LevelItem, Level } from '../utils';
interface PopoverContentProps {
    search: string;
    onSearchChange: (value: string) => void;
    recentItems: LevelItem[];
    items: LevelItem[];
    selectedItem: LevelItem;
    onSelect: (item: LevelItem) => void;
    onCreateNew?: () => void;
    level: Level;
}
/**
 * Content component for the TopLevelSelector popover containing search, create button, and item lists
 */
export declare const PopoverContent: React.FC<PopoverContentProps>;
export {};
