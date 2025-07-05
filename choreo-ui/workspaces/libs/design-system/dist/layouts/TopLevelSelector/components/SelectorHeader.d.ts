import React from 'react';
import { Level } from '../utils';
interface SelectorHeaderProps {
    level: Level;
    onClose?: () => void;
}
/**
 * Header component for the TopLevelSelector showing the level label and close button
 */
export declare const SelectorHeader: React.FC<SelectorHeaderProps>;
export {};
