type School = "Fire" | "Ice" | "Storm" | "Life" | "Death" | "Myth" | "Balance";
const enum ResponseCode {
  SUCCESS = 200,
  NOT_FOUND = 404,
  WRONG_PATH = 300
}

interface SearchResponse {
  query: {
    search: {
      ns: number;
      title: string;
      snippet: string;
      size: number;
      wordcount: number;
      timestamp: string;
    }[];
  };
}

interface Revision {
  pageid: number;
  ns: number;
  title: string;
  revisions: { "*": string; }[];
}

interface PageResponse {
  query: {
    pages: { [key: string]: Revision };
  };
}
