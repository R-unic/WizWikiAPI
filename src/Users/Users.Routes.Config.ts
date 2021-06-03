import { CommonRoutesConfig } from "../Common/Common.Routes.Config";
import express, { Application } from "express";

export class UsersRoutes extends CommonRoutesConfig {
    public constructor(
        App: Application
    ) {
        super(App, "UsersRoutes");
    }

    public ConfigureRoutes(): Application {
        this.App.route("/worlds")
            .get((req, res) => res.status(200).send("List worlds"));

        this.App.route("/worlds/:worldName")
            .all((req, res, next) => next())
            .get((req, res) => res.status(200).send(`GET requested for world ${req.params.worldName}`))

        return this.App;
    }
}