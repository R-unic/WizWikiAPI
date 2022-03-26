"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersRoutes = void 0;
const Common_Routes_Config_1 = require("../Common/Common.Routes.Config");
const Response_1 = require("../Data/Types/API/Response");
const Error_1 = require("../Data/Types/API/Error");
const Worlds = require("../Data/Worlds.json");
class UsersRoutes extends Common_Routes_Config_1.CommonRoutesConfig {
    constructor(App) {
        super(App, "UsersRoutes");
        this.ResponseCode = {
            SUCCESS: 200,
            NOT_FOUND: 404,
            WRONG_PATH: 300
        };
    }
    ConfigureRoutes() {
        this.App.route("/worlds")
            .get((_, res) => res.status(this.ResponseCode.SUCCESS)
            .send(JSON.stringify(new Response_1.APIResponse(true, Worlds))));
        this.App.route("/worlds/:worldName")
            .all((_, $, next) => next())
            .get((req, res) => {
            const worldName = req.params.worldName
                .split(" ")
                .join("")
                .toLowerCase();
            const obj = Worlds[worldName];
            let world = obj;
            if (!obj) {
                const map = new Map(Object.entries(Worlds));
                map.forEach(w => {
                    if (w.Abbreviation ===
                        req.params.worldName
                            .toLowerCase()
                            .split(" ")
                            .join(""))
                        world = w;
                });
            }
            if (!world) {
                const err = new Error_1.APIError(this.ResponseCode.NOT_FOUND, "World not found.");
                return res.status(err.Code)
                    .send(JSON.stringify(new Response_1.APIResponse(false, err)));
            }
            else
                return res.status(this.ResponseCode.SUCCESS)
                    .send(new Response_1.APIResponse(true, world));
        });
        return this.App;
    }
}
exports.UsersRoutes = UsersRoutes;
