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
    }
    ConfigureRoutes() {
        this.App.route("/worlds")
            .get((_, res) => res.status(200 /* SUCCESS */)
            .send(JSON.stringify(new Response_1.APIResponse(true, Worlds))));
        this.App.route("/worlds/:worldName")
            .all((_, $, next) => next())
            .get((req, res) => {
            const worldName = req.params.worldName
                .split(" ")
                .join("")
                .toLowerCase();
            let world = Worlds[worldName];
            if (!world) {
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
                const err = new Error_1.APIError(404 /* NOT_FOUND */, "World not found.");
                return res.status(err.Code)
                    .send(JSON.stringify(new Response_1.APIResponse(false, err)));
            }
            else
                return res.status(200 /* SUCCESS */)
                    .send(new Response_1.APIResponse(true, world));
        });
        return this.App;
    }
}
exports.UsersRoutes = UsersRoutes;
