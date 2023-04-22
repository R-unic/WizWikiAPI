type Maybe<T> = T | undefined;

type School = "Fire" | "Ice" | "Storm" | "Life" | "Death" | "Myth" | "Balance" | "Sun" | "Moon" | "Star" | "Shadow";
const enum ResponseCode {
  SUCCESS = 200,
  NOT_FOUND = 404,
  WRONG_PATH = 300
}

interface SearchResult {
  readonly ns: number;
  readonly title: string;
  readonly snippet: string;
  readonly size: number;
  readonly wordcount: number;
  readonly timestamp: string;
}

interface SearchResponse {
  readonly query: {
    readonly search: SearchResult[];
  };
}

interface Revision {
  readonly pageid: number;
  readonly ns: number;
  readonly title: string;
  readonly revisions: { "*": string; }[];
}

interface PageResponse {
  readonly query: {
    readonly normalized: {
      readonly from: string;
      readonly to: string;
    }[];
    readonly pages: { [key: string]: Revision };
  };
}