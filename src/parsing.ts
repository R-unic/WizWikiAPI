import { getErrorResponseCode, isError, isErrorResult } from "./utility";
import { Log } from "./log";
import type { APIError, ErrorResult, Infobox, InfoboxValue, PageParseResult } from "./types/common";

const baseURL = "https://wiki.wizard101central.com/wiki/api.php?";

export async function getInfobox<T extends Infobox = Infobox>(page: string): Promise<T | APIError> {
  const rawInfobox = await getInfoboxRaw(page);
  if (rawInfobox === undefined)
    return undefined!;

  if (isError(rawInfobox))
    return rawInfobox;

  const [kind] = page.split(":");
  return parseInfobox(rawInfobox, kind) as T;
}

async function getInfoboxRaw(page: string): Promise<string | APIError> {
  const endpoint = baseURL + `action=parse&page=${page}&prop=wikitext&format=json`;
  try {
    const res = await fetch(endpoint);
    const data: PageParseResult | ErrorResult = await res.json();

    return !isErrorResult(data)
      ? data.parse.wikitext["*"]
      : {
        code: getErrorResponseCode(data.error.code),
        message: data.error.info
      };
  } catch (e) {
    Log.error(`Failed to fetch '${page}'! Error message:\n${e}`);
  }
}

function parseInfobox(raw: string, infoboxKind: string): Infobox {
  const infoboxLines = raw
    .replace(new RegExp(`^\\{\\{${infoboxKind}Infobox\\n|\\}\\}$`, "g"), "")
    .split("\n")
    .map(line => line.trim().substring(1));

  const parsed: Infobox = {};
  for (const line of infoboxLines) {
    if (line === "") continue;

    const [key, value] = line.split("=").map(p => p.trim());
    if (key === undefined || value === undefined) continue;
    if (value === "") continue;

    parsed[key] = parseInfoboxValue(value);
  }

  return parsed;
}

function parseInfoboxValue(value: string): InfoboxValue {
  if (value === "Yes") return true;
  if (value === "No") return false;
  if (value === "N/A") return;

  const parsedNumber = parseFloat(value);
  if (isNumericString(value) && !isNaN(parsedNumber))
    return parsedNumber;

  return value;
}

function isNumericString(s: string): boolean {
  return /^[+-]?(\d+(\.\d+)?|\.\d+)$/.test(s.trim());
}