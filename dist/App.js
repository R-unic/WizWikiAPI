"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const http_1 = require("http");
const express_winston_1 = require("express-winston");
const winston_1 = require("winston");
const Users_Routes_Config_1 = require("./Users/Users.Routes.Config");
const express_1 = tslib_1.__importDefault(require("express"));
const debug_1 = tslib_1.__importDefault(require("debug"));
const cors_1 = tslib_1.__importDefault(require("cors"));
const app = express_1.default();
const server = http_1.createServer(app);
const port = process.env.PORT;
const running = `Server running https://localhost:${port}`;
const routes = [];
const debugLog = debug_1.default("app");
app.use(express_1.default.json());
app.use(cors_1.default());
const loggerOptions = {
    transports: [new winston_1.transports.Console()],
    format: winston_1.format.combine(winston_1.format.json(), winston_1.format.prettyPrint(), winston_1.format.colorize({ all: true }))
};
if (!process.env.DEBUG)
    loggerOptions.meta = false;
app.use(express_winston_1.logger(loggerOptions));
routes.push(new Users_Routes_Config_1.UsersRoutes(app));
app.get("/", (req, res) => res.status(200).send(running));
server.listen(port, () => {
    routes.forEach(route => debugLog(`Routes configured for ${route.Name}`));
    console.log(running);
});
//# sourceMappingURL=App.js.map