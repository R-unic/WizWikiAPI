import { format } from "winston";

export class Log {
  private static readonly colorizer = format.colorize({
    message: true,
    colors: {
      info: "cyan",
      warn: "yellow",
      error: "red",
      fatal: "red"
    }
  });

  public static info(msg: string): never {
    this.log(this.info.name, msg);
  }

  public static warn(msg: string): never {
    this.log(this.warn.name, msg);
  }

  public static error(msg: string): never {
    this.log(this.error.name, msg);
  }

  public static fatal(msg: string): never {
    this.log(this.fatal.name, msg);
  }

  private static log(kind: string, msg: string): never {
    console.log(`[${this.colorizer.colorize(kind.toLowerCase(), kind.toUpperCase())}]: ${msg}`);
    return undefined!;
  }
}