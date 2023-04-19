import { Response } from "express";
import { format } from "winston";

export const Arrayify = (s?: string) => (s ?? "")
  .split("\n")
  .map(s =>
    s.replace(/\;/, "")
      .replace(/\*F\d+/g, "")
      .replace(/\*WMV/, "")
      .replace(/\*CR/, "")
      .trim()
  ).filter(s => s !== "");

export const ToTitleCase = (item: string): string => item.toLowerCase()
  .replace(/_/g, " ")
  .replace(/\b[a-z]/g, t => t.toUpperCase());

export function DeserializeWikiData<R extends object = object>(data: string): R {
  const pairs = data.replace(/^\{\{/, "").replace(/\}\}$/, "").split("\n| ");
  pairs.shift();
  const object: { [key: string]: Maybe<string | number | boolean> } = {};
  for (const pair of pairs) {
    let [key, value] = pair.split(" =");
    value = value
      .replace(/\;/g, "")
      .replace(/\'\'/g, "")
      .replace(/\:/g, "")
      .replace(/\<\!\-\-Recipes which Craft this Spell automatically list from the Recipe pages\-\-\>/, "")
      .trim();

    let trueValue: Maybe<string | number | boolean> = value.trim();
    if (value === "" || value === "None")
      trueValue = undefined;
    else if (!isNaN(Number(value)))
      trueValue = Number(value);
    else if (!isNaN(Number(value.replace(/\,/, ""))))
      trueValue = Number(value.replace(/\,/, ""));
    else if (value === "No")
      trueValue = false;
    else if (value === "Yes")
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
    srsearch: `${wikiType}:${searchQuery}`,
    format: "json"
  });

  return fetch(searchEndpoint).then(res => res.json());
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
