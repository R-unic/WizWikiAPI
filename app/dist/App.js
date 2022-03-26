"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_winston_1 = require("express-winston");
const winston_1 = require("winston");
const fs_1 = require("fs");
const process_1 = require("process");
const Users_Routes_Config_1 = require("./Users/Users.Routes.Config");
const express_1 = __importStar(require("express"));
const debug_1 = __importDefault(require("debug"));
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)(); // Create express app
const port = process_1.env.PORT || 3000; // 
const routes = [];
const debugLog = (0, debug_1.default)("App");
app.use((0, express_1.json)());
app.use((0, cors_1.default)());
const loggerOptions = {
    transports: [new winston_1.transports.Console()],
    format: winston_1.format.combine(winston_1.format.json(), winston_1.format.prettyPrint(), winston_1.format.colorize({ all: true }))
};
if (!process.env.DEBUG)
    loggerOptions.meta = false;
app.use((0, express_winston_1.logger)(loggerOptions));
const usersRoutes = new Users_Routes_Config_1.UsersRoutes(app);
routes.push(usersRoutes);
try {
    const homepageHTML = (0, fs_1.readFileSync)(__dirname + "/../html/index.html", { encoding: "utf8" });
    app.get("/", (req, res) => res.status(usersRoutes.ResponseCode.SUCCESS)
        .send(homepageHTML)).listen(port, () => {
        routes.forEach(route => debugLog(`Routes configured for ${route.Name}`));
        console.log(`Server is listening @https://wizard101-api.herokuapp.com`);
    });
}
catch (err) {
    (0, winston_1.error)(err);
}
