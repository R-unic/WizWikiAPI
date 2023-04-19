import APIResult from "./API/Result";

export default interface World extends APIResult {
  readonly Name: string;
  readonly Quests: number;
  readonly LevelRange: {
    readonly First: number;
    readonly Second: number;
  };
  readonly Abbreviation: string;
  readonly Areas: string[];
}
