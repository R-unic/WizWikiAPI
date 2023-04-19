"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_winston_1 = require("express-winston");
const winston_1 = require("winston");
const fs_1 = require("fs");
const process_1 = require("process");
const Util_1 = require("./Util");
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const node_sass_1 = __importDefault(require("node-sass"));
const path_1 = __importDefault(require("path"));
const app = (0, express_1.default)();
const port = process_1.env.PORT || 3000; //
const routes = [];
const loggerOptions = {
    transports: [new winston_1.transports.Console()],
    format: winston_1.format.combine(winston_1.format.json(), winston_1.format.prettyPrint(), winston_1.format.colorize({ all: true }))
};
if (!process_1.env.DEBUG)
    loggerOptions.meta = false;
function compileSass(_, res) {
    const css = node_sass_1.default.renderSync({
        file: path_1.default.join(__dirname, "..", "public", "styles.sass")
    }).css;
    res.type("text/css");
    res.send(css);
}
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.use((0, express_winston_1.logger)(loggerOptions));
try {
    const routesPath = path_1.default.join(__dirname, "..", "dist", "Routes");
    const routeFiles = (0, fs_1.readdirSync)(routesPath).filter(file => file.endsWith(".js"));
    for (const file of routeFiles) {
        const RouteClass = require(`${routesPath}/${file}`).default;
        routes.push(new RouteClass(app));
    }
}
catch (e) {
    throw new Error(e);
}
try {
    const homepageHTML = (0, fs_1.readFileSync)(__dirname + "/../index.html", { encoding: "utf8" });
    app.get("/styles.css", compileSass);
    app.get("/", (_, res) => res.status(200 /* ResponseCode.SUCCESS */).send(homepageHTML)).listen(port, () => {
        routes.forEach(route => Util_1.Logger.Log(`Routes configured for ${route.Name}`));
        Util_1.Logger.Log(`Server is listening @http://localhost:${port}`);
    });
}
catch (e) {
    throw new Error(e);
}
