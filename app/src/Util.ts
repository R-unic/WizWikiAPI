import { format } from "winston";

export const ToTitleCase = (item: string): string => item.toLowerCase()
  .replace(/_/g, ' ')
  .replace(/\b[a-z]/g, t => t.toUpperCase());

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
