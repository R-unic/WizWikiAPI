import { logger, LoggerOptions } from "express-winston";
import { format, transports } from "winston";
import { readFileSync } from "fs";
import { env } from "process";

import { CommonRoutesConfig } from "./Common/Common.Routes.Config";
import { WorldRoutes } from "./Routes/Worlds.Routes.Config";
import { CreatureRoutes } from "./Routes/Creatures.Routes.Config";
import { Logger } from "./Util";
import express from "express";
import cors from "cors";
import sass from "node-sass";
import path from "path";

const app = express(); // Create express app
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

function compileSass(_: express.Request, res: express.Response) {
  const css = sass.renderSync({
    file: path.join(__dirname, "..", "public", "styles.sass")
  }).css;

  res.type("text/css");
  res.send(css);
}

app.use(express.json());
app.use(cors());
app.use(logger(loggerOptions));
routes.push(
  new WorldRoutes(app),
  new CreatureRoutes(app)
);

try {
  const homepageHTML = readFileSync(__dirname + "/../index.html", { encoding: "utf8" });
  app.get("/styles.css", compileSass);
  app.get("/", (_, res) =>
    res.status(ResponseCode.SUCCESS).send(homepageHTML)
  ).listen(port, () => {
    routes.forEach(route => Logger.Log(`Routes configured for ${route.Name}`));
    Logger.Log(`Server is listening @http://localhost:${port}`);
  });
} catch (err) {
  throw new Error(<string | undefined>err);
}
