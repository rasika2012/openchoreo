import React from 'react';
import { LevelItem, Level } from './utils';
export interface TopLevelSelectorProps {
    className?: string;
    items: LevelItem[];
    recentItems?: LevelItem[];
    selectedItem: LevelItem;
    level: Level;
    isHighlighted?: boolean;
    disabled?: boolean;
    onSelect: (item: LevelItem) => void;
    onClick: (level: Level) => void;
    onClose?: () => void;
    onCreateNew?: () => void;
}
/**
 * TopLevelSelector component for selecting items at different levels (Organization, Project, Component)
 * @component
 */
export declare const TopLevelSelector: React.ForwardRefExoticComponent<TopLevelSelectorProps & React.RefAttributes<HTMLDivElement>>;
