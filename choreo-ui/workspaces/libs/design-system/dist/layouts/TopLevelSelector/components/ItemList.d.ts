import React from 'react';
import { LevelItem } from '../utils';
interface ItemListProps {
    title: string;
    items: LevelItem[];
    selectedItemId?: string;
    onSelect: (item: LevelItem) => void;
}
/**
 * List component for displaying items in the TopLevelSelector popover
 */
export declare const ItemList: React.FC<ItemListProps>;
export {};
