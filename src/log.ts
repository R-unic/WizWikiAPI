import { format } from "winston";

export class Log {
  private static readonly colorizer = format.colorize({
    message: true,
    colors: {
      info: "cyan",
      warn: "yellow",
      error: "red"
    }
  });

  public static info(msg: string): void {
    this.log(this.info.name, msg);
  }

  public static warn(msg: string): void {
    this.log(this.warn.name, msg);
  }

  public static fatal(msg: string): void {
    this.log(this.fatal.name, msg);
  }

  private static log(kind: string, msg: string): void {
    console.log(`[${this.colorizer.colorize(kind.toLowerCase(), kind.toUpperCase())}]: ${msg}`);
  }
}