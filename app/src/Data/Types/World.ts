import { Area } from "./Area";

export interface World {
    Name: string;
    Quests: number;
    LevelRange: {
        First: number;
        Second: number;
    };
    Abbreviation: string;
    Areas: string[];
}