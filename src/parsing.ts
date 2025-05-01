import { getErrorResponseCode, isError, isErrorResult } from "./utility";
import { Log } from "./log";
import type { APIError, ErrorResult, Infobox, InfoboxValue, PageParseResult, PerSchoolStat } from "./types/common";

const baseURL = "https://wiki.wizard101central.com/wiki/api.php?";

export function parsePerSchoolStat(entries: string[]): PerSchoolStat {
  const result: Record<string, number> = {};
  let anyValue: Maybe<number>;

  for (const entry of entries) {
    const match = entry.trim().match(/^(\d+)\s*%?\s*(.*)$/i);
    if (!match)
      Log.fatal(`Invalid per-school stat format: '${entry}'`);

    const percentage = parseInt(match[1]);
    const label = match[2].trim();

    if (label === "" || /^any$/i.test(label)) {
      anyValue = percentage;
      continue;
    }

    const elements = label.split(",").map(e => e.trim());
    elements.forEach(el => result[el] = percentage);
  }

  return Object.keys(result).length > 0 ? result : (anyValue ?? 0);
}

export function parsePercent(percent: string): number {
  const parsed = parseFloat(percent.slice(0, -1));
  return isNaN(parsed) ? 0 : parsed;
}

export async function getInfobox<T extends Infobox = Infobox>(page: string): Promise<T | APIError> {
  const rawInfobox = await getInfoboxRaw(page);
  if (rawInfobox === undefined)
    return null!;

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
    return "";
  }
}

function parseInfobox(raw: string, infoboxKind: string): Infobox {
  const content = raw
    .replace(new RegExp(`^\\{\\{${infoboxKind}Infobox\\n?|\\}\\}$`, "g"), "")
    .trim()
    .split("\n");

  const lines: string[] = [];
  let currentLine = "";

  for (const line of content) {
    if (line.startsWith("|")) {
      if (currentLine !== "")
        lines.push(currentLine);

      currentLine = line;
    } else
      currentLine += "\n" + line;
  }

  if (currentLine)
    lines.push(currentLine);

  const parsed: Infobox = {};
  for (const line of lines) {
    const [keyRaw, ...valueParts] = line.split("=");
    if (keyRaw === "" || valueParts.length === 0) {
      Log.warn(`Skipping parsing for line:\n${line}\n`)
      continue;
    }

    const key = keyRaw.trim().substring(1).trim(); // remove leading `|`
    const rawValue = valueParts.join("=").trim();

    let value: InfoboxValue;
    if (isRangeLike(rawValue))
      value = (/;/.test(rawValue) ? rawValue.slice(0, -1) : rawValue)
        .split("-")
        .map(s => s.trim())
        .map(parseFloat)
        .filter(n => !isNaN(n));
    else if (isListLike(rawValue))
      value = rawValue.split(";")
        .filter(l => l !== "None")
        .map(l =>
          l.replace(/\*F\d+/g, "")
            .replace(/\*WMV/, "")
            .replace(/\*CR/, "")
            .replace(/\*BR/, "")
            .replace(/\*HOL/, "")
            .replace(/\*PERM/, "")
            .trim()
        )
        .filter(s => s !== "")
        .map(parseInfoboxValue);
    else
      value = parseInfoboxValue(rawValue);

    parsed[key] = value;
  }

  return parsed;
}

function isRangeLike(rawValue: string): boolean {
  return /\d+\s-\s\d+/.test(rawValue);
}

function isListLike(rawValue: string): boolean {
  return /^([^;\n]+;\n)*[^;\n]+;\s*$/.test(rawValue);
}

function parseInfoboxValue(value: string): InfoboxValue {
  if (value === "Yes") return true;
  if (value === "No") return false;
  if (value === "N/A" || value === "None" || value === "") return;

  const numericString = value.replace(/,/g, "").trim();
  const parsedNumber = parseFloat(numericString);
  if (isNumericString(numericString) && !isNaN(parsedNumber))
    return parsedNumber;

  return value;
}

function isNumericString(s: string): boolean {
  return /^[+-]?(\d+(\.\d+)?|\.\d+)$/.test(s);
}