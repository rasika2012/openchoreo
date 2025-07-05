import React from 'react';
import { LevelItem } from '../utils';
interface SelectorContentProps {
    selectedItem: LevelItem;
    onOpen: (event: React.MouseEvent<HTMLButtonElement>) => void;
    disableMenu?: boolean;
}
/**
 * Content component for the TopLevelSelector showing the selected item and dropdown button
 */
export declare const SelectorContent: React.FC<SelectorContentProps>;
export {};
