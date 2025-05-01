import type { Infobox, InfoboxValue, PageParseResult } from "./types/common";

const baseURL = "https://wiki.wizard101central.com/wiki/api.php?";

export async function getInfobox<T extends Infobox = Infobox>(page: string): Promise<T> {
  const rawInfobox = await getInfoboxRaw(page);
  const [kind] = page.split(":");
  return parseInfobox(rawInfobox, kind) as T;
}

async function getInfoboxRaw(page: string): Promise<string> {
  const endpoint = baseURL + `action=parse&page=${page}&prop=wikitext&format=json`;
  return fetch(endpoint)
    .then(res => res.json())
    .then((result: PageParseResult) => result.parse.wikitext["*"]);
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