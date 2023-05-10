import { format } from "winston";

export const ImageProviderURL = "https://www.wizard101central.com/wiki/images/d/dc/";
export const WikiBaseURL = "https://www.wizard101central.com/wiki/api.php?";
export const Arrayify = (s?: string, sep = /\;/) => (s ?? "")
  .split("\n")
  .map(s =>
    s.replace(sep, "")
      .replace(/\*F\d+/g, "")
      .replace(/\*WMV/, "")
      .replace(/\*CR/, "")
      .trim()
  ).filter(s => s !== "");

export const ToTitleCase = (item: string): string => item
  .toLowerCase()
  .replace(/_/g, " ")
  .replace(/\b[a-z]/g, t => t.toUpperCase());

export async function GetInternalType<T extends object>(page: SearchResult) {
  const pageEndpoint = WikiBaseURL + new URLSearchParams({
    action: "query",
    prop: "revisions",
    rvprop: "content",
    titles: page.title,
    format: "json"
  });

  const base = await fetch(pageEndpoint)
    .then(res => res.json())
    .then((res: PageResponse) => Object.values(res.query.pages)[0])
    .then(page => page.revisions[0]["*"])
    .then(DeserializeWikiData<T>);
    
  return base;
}

export function DeserializeWikiData<R extends object>(data: string): R {
  const pairs = data.replace(/^\{\{/, "").replace(/\}\}$/, "").split("\n| ").filter(p => p.includes("="));
  const object: { [key: string]: Maybe<string | number | boolean> } = {};
  for (const pair of pairs) {
    let [key, value] = pair.split("=");
    value = value
      .replace(/\;/g, "")
      .replace(/\'\'/g, "")
      .replace(/\:\'\'/, "")
      .replace(/\<\!\-\-.*?\-\-\>/g, "") // die html comments
      .replace(/\{\{ImageStub*?\}\}/g, "") // no image stubs
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
