import { Application } from "express";

export abstract class CommonRoutesConfig {
    public constructor(
        public readonly App: Application,
        public readonly Name: string
    ) {
        this.ConfigureRoutes();
    }

    public abstract ConfigureRoutes(): Application;
}