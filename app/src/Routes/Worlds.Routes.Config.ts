import { Application } from "express";
import { CommonRoutesConfig } from "../Common/Common.Routes.Config";
import Worlds = require("../Data/Worlds.json");
import World from "../Data/Types/World";
import APIResponse from "../Data/Types/API/Response";
import APIError from "../Data/Types/API/Error";

type WorldName =
  "wizardcity"
  | "krokotopia"
  | "marleybone"
  | "mooshu"
  | "dragonspyre"
  | "celestia"
  | "zafaria"
  | "avalon"
  | "azteca"
  | "khrysalis"
  | "polaris"
  | "mirage"
  | "empyrea"
  | "karamelle"
  | "lemuria"
  | "novus";

export default class WorldRoutes extends CommonRoutesConfig {
  public constructor(App: Application) {
    super(App, "Worlds");
  }

  protected ConfigureRoutes(): Application {
    this.App.route("/worlds")
      .get((_, res) => res.status(ResponseCode.SUCCESS)
        .send(JSON.stringify(new APIResponse(true, Worlds))));

    this.App.route("/worlds/:worldName")
      .all((_, __, next) => next())
      .get((req, res) => {
        const worldName = <WorldName>req.params.worldName
          .split(" ")
          .join("")
          .toLowerCase();

        let world: Maybe<World> = Worlds[worldName];
        if (!world)
          for (const w of Object.values(Worlds)) {
            if (w.Abbreviation ===
              req.params.worldName
                .toLowerCase()
                .split(" ")
                .join("")
            ) world = w;
          }

        if (!world) {
          const err = new APIError(ResponseCode.NOT_FOUND, "World not found.");
          return res.status(err.Code)
            .send(JSON.stringify(new APIResponse(false, err)));
        } else
          return res.status(ResponseCode.SUCCESS).send(new APIResponse(true, world));
      });

    return this.App;
  }
}
