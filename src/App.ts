import { Server, createServer } from "http";
import { logger, LoggerOptions } from "express-winston";
import { format, transports } from "winston";
import { CommonRoutesConfig } from "./Common/Common.Routes.Config";
import { UsersRoutes } from "./Users/Users.Routes.Config";
import express, { Application } from "express";
import debug, { IDebugger } from "debug";
import cors from "cors";

const app: Application = express();
const server: Server = createServer();
const port = 3000;
const running = `Server running https://localhost:${port}`;
const routes: CommonRoutesConfig[] = [];
const debugLog: IDebugger = debug("App");

app.use(express.json());
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
routes.push(new UsersRoutes(app));

app
    .get("/", (req, res) => res.status(200).send(running));

server.listen(port, () => {
    routes.forEach(route => debugLog(`Routes configured for ${route.Name}`));
    console.log(running);
});