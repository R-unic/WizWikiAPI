import { logger, LoggerOptions } from "express-winston";
import { format, transports } from "winston";
import { readFileSync } from "fs";
import { env } from "process";
import { CommonRoutesConfig } from "./Common/Common.Routes.Config";
import { WorldRoutes } from "./Routes/Worlds.Routes.Config";
import { Logger } from "./Util";
import express from "express";
import cors from "cors";

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

app.use(express.json());
app.use(cors());
app.use(logger(loggerOptions));

const usersRoutes = new WorldRoutes(app);
routes.push(usersRoutes);

try {
  const homepageHTML = readFileSync(__dirname + "/../html/index.html", { encoding: "utf8" });
  app.get("/", (_, res) =>
    res.status(ResponseCode.SUCCESS).send(homepageHTML)
  ).listen(port, () => {
    routes.forEach(route => Logger.Log(`Routes configured for ${route.Name}`));
    Logger.Log(`Server is listening @http://localhost:${port}`);
  });
} catch (err) {
  throw new Error(<string | undefined>err);
}
