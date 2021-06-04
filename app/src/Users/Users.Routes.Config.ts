import { CommonRoutesConfig } from "../Common/Common.Routes.Config";
import { Application } from "express";
import Worlds = require("../Data/Worlds.json");

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
                return res.status(200).send(JSON.stringify(obj));
            });

        return this.App;
    }
}