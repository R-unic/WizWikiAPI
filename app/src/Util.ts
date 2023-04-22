import { format } from "winston";

export const ImageProviderURL = "https://www.wizard101central.com/wiki/images/d/dc/";
export const WikiBaseURL = "https://www.wizard101central.com/wiki/api.php?";
export const Arrayify = (s?: string) => (s ?? "")
  .split("\n")
  .map(s =>
    s.replace(/\;/, "")
      .replace(/\*F\d+/g, "")
      .replace(/\*WMV/, "")
      .replace(/\*CR/, "")
      .trim()
  ).filter(s => s !== "");

export const ToTitleCase = (item: string): string => item
  .toLowerCase()
  .replace(/_/g, " ")
  .replace(/\b[a-z]/g, t => t.toUpperCase());

export function DeserializeWikiData<R extends object = object>(data: string): R {
  const pairs = data.replace(/^\{\{/, "").replace(/\}\}$/, "").split("\n| ").filter(p => p.includes("="));
  const object: { [key: string]: Maybe<string | number | boolean> } = {};
  for (const pair of pairs) {
    let [key, value] = pair.split("=");
    value = value
      .replace(/\;/g, "")
      .replace(/\'\'/g, "")
      .replace(/\:\'\'/, "")
      .replace(/<!\-\-.*?\-\->/g, "")
      .trim();

    let trueValue: Maybe<string | number | boolean> = value.trim();
    if (value === "" || value === "None")
      trueValue = undefined;
    else if (!isNaN(Number(value)))
      trueValue = Number(value);
    else if (!isNaN(Number(value.replace(/\,/, ""))))
      trueValue = Number(value.replace(/\,/, ""));
    else if (value.toLowerCase() === "no")
      trueValue = false;
    else if (value.toLowerCase() === "yes")
      trueValue = true;

    object[key.trim()] = trueValue;
  }
  return <R>object;
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

export async function SearchWiki(wikiType: string, searchQuery: string, resultCount = 1): Promise<SearchResponse> {
  const searchEndpoint = WikiBaseURL + new URLSearchParams({
    action: "query",
    list: "search",
    srlimit: !isNaN(resultCount) ? resultCount.toString() : "1",
    srsearch: `${wikiType}:${searchQuery.replace(/\_/g, " ")}`,
    format: "json"
  });
  
  const responsePromise = fetch(searchEndpoint).then(res => res.json());
  responsePromise.catch(e => Logger.Error("Wiki API ratelimiting???"));
  return responsePromise
}

export class Logger {
  private static readonly colorizer = format.colorize({
    message: true,
    colors: {
      log: "green",
      error: "red"
    }
  });

  public static Log(msg: string): void {
    console.log(`[${this.colorizer.colorize("log", "LOG")}]: ${msg}`);
  }

  public static Error(msg: string): void {
    console.log(`[${this.colorizer.colorize("error", "ERROR")}]: ${msg}`);
  }
}
