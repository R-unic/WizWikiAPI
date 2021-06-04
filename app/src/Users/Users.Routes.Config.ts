import { Application } from "express";
import { CommonRoutesConfig } from "../Common/Common.Routes.Config";
import { ToTitleCase } from "../Util";
import Worlds = require("../Data/Worlds.json");
import { World } from "../Data/Types/World";

export class UsersRoutes extends CommonRoutesConfig {
    public constructor(
        App: Application
    ) {
        super(App, "UsersRoutes");
    }

    public ConfigureRoutes(): Application {
        this.App.route("/worlds")
            .get((req, res) => res.status(200).send(JSON.stringify(Worlds)));

        this.App.route("/worlds/:worldName")
            .all((req, res, next) => next())
            .get((req, res) => {
                const worldName = req.params.worldName
                    .split(" ")
                    .join("")
                    .toLowerCase() as (
                        "wizardcity" |
                        "krokotopia"
                    );

                const obj = Worlds[worldName];
                let world: World = obj;
                
                if (!obj) {
                    const map = new Map<string, any>(Object.entries(obj));
                    map.forEach(w => {
                        if (w.Abbreviation ===
                            ToTitleCase(req.params.worldName
                                .toLowerCase())
                                .split(" ")
                                .join("")
                        ) world = w;
                    })
                }
                
                return res.status(200).send(JSON.stringify(world));
            });

        return this.App;
    }
}