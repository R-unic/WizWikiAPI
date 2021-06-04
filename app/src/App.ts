import { logger, LoggerOptions } from "express-winston";
import { error, format, transports } from "winston";
import { readFileSync } from "fs";
import { env } from "process";
import { CommonRoutesConfig } from "./Common/Common.Routes.Config";
import { UsersRoutes } from "./Users/Users.Routes.Config";
import express, { Application, json } from "express";
import debug, { IDebugger } from "debug";
import cors from "cors";

const app: Application = express(); // Create express app
const port = env.PORT || 3000; // 
const routes: CommonRoutesConfig[] = [];
const debugLog: IDebugger = debug("App");

app.use(json());
app.use(cors());

const loggerOptions: LoggerOptions = {
    transports: [new transports.Console()],
    format: format.combine(
        format.json(),
        format.prettyPrint(),
        format.colorize({ all: true })
    )
}

if (!process.env.DEBUG)
    loggerOptions.meta = false;

app.use(logger(loggerOptions));

const usersRoutes = new UsersRoutes(app);
routes.push(usersRoutes);

try {
    const homepageHTML = readFileSync(__dirname + "/../html/index.html", { encoding: "utf8" });
    app.get("/", (req, res) => 
        res.status(usersRoutes.ResponseCode.SUCCESS)
            .send(homepageHTML)
    ).listen(port, () => {
        routes.forEach(route => debugLog(`Routes configured for ${route.Name}`));
        console.log(`Server is listening @https://wizard101-api.herokuapp.com`);
    });
} catch (err) {
    error(err);
}