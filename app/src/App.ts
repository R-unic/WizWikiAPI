import { logger, LoggerOptions } from "express-winston";
import { format, transports } from "winston";
import { readdirSync, readFileSync } from "fs";
import { env } from "process";

import { CommonRoutesConfig } from "./Common/Common.Routes.Config";
import { Logger } from "./Util";
import express from "express";
import cors from "cors";
import sass from "node-sass";
import path from "path";

const app = express();
const port = env.PORT || 3000; //
const routes: CommonRoutesConfig[] = [];
const loggerOptions: LoggerOptions = {
  transports: [new transports.Console()],
  format: format.combine(
    format.json(),
    format.prettyPrint(),
    format.colorize({ all: true })
  )
};

if (!env.DEBUG)
  loggerOptions.meta = false;

function addStyles(...styleNames: string[]): void {
  for (const style of styleNames)
    app.get(`/${style}.css`, (_, res) => {
      const css = sass.renderSync({
        file: path.join(__dirname, "..", "public", style + ".sass")
      }).css;
      res.type("text/css");
      res.send(css);
    });
}

app.use(express.json());
app.use(cors());
app.use(logger(loggerOptions));

try {
  const routesPath = path.join(__dirname, "..", "dist", "Routes");
  const routeFiles = readdirSync(routesPath).filter(file => file.endsWith(".js"));
  for (const file of routeFiles) {
    const RouteClass = require(`${routesPath}/${file}`).default;
    routes.push(new RouteClass(app));
  }
} catch (e) {
  throw new Error(<string | undefined>e);
}

try {
  const homepageHTML = readFileSync(__dirname + "/../index.html", { encoding: "utf8" });
  const docsHTML = readFileSync(__dirname + "/../docs.html", { encoding: "utf8" });
  addStyles("main", "docs");
  app.get("/docs", (_, res) =>res.status(ResponseCode.SUCCESS).send(docsHTML))
  app.get("/", (_, res) =>
    res.status(ResponseCode.SUCCESS).send(homepageHTML)
  ).listen(port, () => {
    routes.forEach(route => Logger.Log(`Routes configured for ${route.Name}`));
    Logger.Log(`Server is listening @http://localhost:${port}`);
  });
} catch (e) {
  throw new Error(<string | undefined>e);
}
