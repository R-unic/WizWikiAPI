import { Application, Response } from "express";
import { CommonRoutesConfig } from "../Common/Common.Routes.Config";
import { Arrayify, SearchWiki, GetInternalType, Logger } from "../Util";
import { Location, NPC } from "../Data/Types/WikiTypes";
import { APIResponse } from "../Data/Types/APITypes";

interface NpcInternal {
  readonly titles: string;
  readonly locations: string;
  readonly descrip: string;
  readonly givequests: string;
  readonly questgoals: string;
  readonly endquests: string;
}

export default class NpcRoutes extends CommonRoutesConfig {
  public constructor(App: Application) {
    super(App, "NPCs");
  }

  protected ConfigureRoutes(): Application {
    this.App.route("/npcs");
    this.App.route("/npcs/:npcName")
      .all((_, __, next) => next())
      .get((req, res) => {
        const { npcName } = req.params;
        const { resultCount } = req.query;

        let response: Response;
        SearchWiki(this.Name.slice(0, -1), npcName, Number(resultCount ?? 1))
          .then(res => res.query.search)
          .then(results => results.map<Promise<NPC>>(async page => {
            const base = await GetInternalType<NpcInternal>(page);
            if (!base)
              response = this.NotFound(res);

            return {
              Title: base.titles,
              Description: base.descrip,
              Locations: Arrayify(base.locations).map(lexeme => new Location(lexeme)),
              GivesQuests: Arrayify(base.givequests),
              QuestGoals: Arrayify(base.questgoals),
              EndsQuests: Arrayify(base.endquests)
            };
          }))
          .then(async results => {
            if (response) return;
            response = res.status(ResponseCode.SUCCESS)
              .send(new APIResponse(true, await Promise.all(results)));
          })
          .catch(e => {
            Logger.Error(e.stack);
            if (response) return;
            response = this.NotFound(res);
          });

        return response!;
      });

    return this.App;
  }
}
