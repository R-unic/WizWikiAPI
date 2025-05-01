export interface PageParseResult {
  readonly parse: PageInfo;
}

export interface PageInfo {
  readonly title: string;
  readonly pageid: number;
  readonly wikitext: { "*": string };
}

export type InfoboxValue = Maybe<string | number | boolean>;
export interface Infobox {
  [key: string]: InfoboxValue;
}

export type School = "Fire" | "Ice" | "Storm" | "Life" | "Death" | "Myth" | "Balance" | "Star" | "Moon" | "Sun" | "Shadow";
export interface WikiObject { }