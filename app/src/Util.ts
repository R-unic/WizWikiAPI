import { format } from "winston";

export const ToTitleCase = (item: string): string => item.toLowerCase()
  .replace(/_/g, " ")
  .replace(/\b[a-z]/g, t => t.toUpperCase());

export function DeserializeWikiData<R extends object = object>(data: string): R {
  const pairs = data.replace(/^\{\{/, "").replace(/\}\}$/, "").split("\n| ");
  pairs.shift();
  const object: { [key: string]: string | number | boolean | undefined } = {};
  for (const pair of pairs) {
    let [key, value] = pair.split(" =");
    value = value.replace(/\;/, "").replace(/\'\'/, "").replace(/\:/, "").trim();

    let trueValue: string | number | boolean | undefined = value.trim();
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
