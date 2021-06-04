import { Application } from "express";
import { CommonRoutesConfig } from "../Common/Common.Routes.Config";
import { World } from "../Data/Types/World";
import { APIResponse } from "../Data/Types/API/Response";
import { APIError } from "../Data/Types/API/Error";
import Worlds = require("../Data/Worlds.json");

export class UsersRoutes extends CommonRoutesConfig {
    public readonly ResponseCode = {
        SUCCESS: 200,
        NOT_FOUND: 404
    }

    public constructor(
        App: Application
    ) {
        super(App, "UsersRoutes");
    }

    public ConfigureRoutes(): Application {
        this.App.route("/worlds")
            .get((_, res) => res.status(this.ResponseCode.SUCCESS)
                .send(JSON.stringify(new APIResponse(true, Worlds))));

        this.App.route("/worlds/:worldName")
            .all((_, $, next) => next())
            .get((req, res) => {
                const worldName = req.params.worldName
                    .split(" ")
                    .join("")
                    .toLowerCase() as (
                        "wizardcity" |
                        "krokotopia" |
                        "marleybone" |
                        "mooshu" |
                        "dragonspyre" |
                        "celestia" |
                        "zafaria" |
                        "avalon" |
                        "azteca" |
                        "khrysalis" |
                        "polaris" |
                        "mirage" |
                        "empyrea" |
                        "karamelle"
                    );

                const obj: World = Worlds[worldName];
                let world: World = obj;
                
                if (!obj) {
                    const map = new Map<string, World>(Object.entries(Worlds));
                    map.forEach(w => {
                        if (w.Abbreviation ===
                            req.params.worldName
                                .toLowerCase()
                                .split(" ")
                                .join("")
                        ) world = w;
                    })
                }
                
                if (!world) {
                    const err = new APIError(this.ResponseCode.NOT_FOUND, "World not found.");
                    return res.status(err.Code)
                        .send(JSON.stringify(new APIResponse(false, err)))
                } else
                    return res.status(this.ResponseCode.SUCCESS)
                        .send(new APIResponse(true, world));
            });

        return this.App;
    }
}