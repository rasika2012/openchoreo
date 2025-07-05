export declare enum Level {
    ORGANIZATION = "organization",
    PROJECT = "project",
    COMPONENT = "component"
}
export interface LevelItem {
    label: string;
    id: string;
}
export declare function getLevelLabel(level: Level): "Organization" | "Project" | "Component" | "Unknown";
