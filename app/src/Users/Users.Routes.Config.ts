import { Application } from "express";
import { CommonRoutesConfig } from "../Common/Common.Routes.Config";
import { World } from "../Data/Types/World";
import { APIResponse } from "../Data/Types/API/Response";
import { APIError } from "../Data/Types/API/Error";
import Worlds = require("../Data/Worlds.json");

export class UsersRoutes extends CommonRoutesConfig {
    public constructor(
        App: Application
    ) {
        super(App, "UsersRoutes");
    }

    public ConfigureRoutes(): Application {
        this.App.route("/worlds")
            .get((req, res) => {
                const response: APIResponse = {
                    success: true,
                    results: Worlds
                }

                return res.status(200).send(JSON.stringify(response))
            });

        this.App.route("/worlds/:worldName")
            .all((req, res, next) => next())
            .get((req, res) => {
                const worldName = req.params.worldName
                    .split(" ")
                    .join("")
                    .toLowerCase() as (
                        "wizardcity" |
                        "krokotopia" |
                        "marleybone" |
                        "mooshu"
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
                    const err: APIError = {
                        code: 404,
                        message: "World not found."
                    }

                    const response: APIResponse = {
                        success: false,
                        results: err
                    }

                    return res.status(err.code).send(JSON.stringify(response))
                } else {
                    const response: APIResponse = {
                        success: true,
                        results: world
                    }

                    return res.status(200).send(response);
                }
            });

        return this.App;
    }
}