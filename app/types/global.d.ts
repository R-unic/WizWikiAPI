type Maybe<T> = T | undefined;

type School = "Fire" | "Ice" | "Storm" | "Life" | "Death" | "Myth" | "Balance" | "Sun" | "Moon" | "Star" | "Shadow";
const enum ResponseCode {
  SUCCESS = 200,
  NOT_FOUND = 404,
  WRONG_PATH = 300
}

interface Revision {
  pageid: number;
  ns: number;
  title: string;
  revisions: { "*": string; }[];
}

interface PageResponse {
  query: {
    normalized: {
      from: string;
      to: string;
    }[];
    pages: { [key: string]: Revision };
  };
}
