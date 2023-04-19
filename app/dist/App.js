"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_winston_1 = require("express-winston");
const winston_1 = require("winston");
const fs_1 = require("fs");
const process_1 = require("process");
const Worlds_Routes_Config_1 = require("./Routes/Worlds.Routes.Config");
const Util_1 = require("./Util");
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const node_sass_1 = __importDefault(require("node-sass"));
const path_1 = __importDefault(require("path"));
const app = express_1.default(); // Create express app
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
app.use(cors_1.default());
app.use(express_winston_1.logger(loggerOptions));
const usersRoutes = new Worlds_Routes_Config_1.WorldRoutes(app);
routes.push(usersRoutes);
try {
    const homepageHTML = fs_1.readFileSync(__dirname + "/../index.html", { encoding: "utf8" });
    app.get("/styles.css", compileSass);
    app.get("/", (_, res) => res.status(200 /* SUCCESS */).send(homepageHTML)).listen(port, () => {
        routes.forEach(route => Util_1.Logger.Log(`Routes configured for ${route.Name}`));
        Util_1.Logger.Log(`Server is listening @http://localhost:${port}`);
    });
}
catch (err) {
    throw new Error(err);
}
