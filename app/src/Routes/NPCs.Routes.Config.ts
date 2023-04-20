import { Application, Response } from "express";
import { CommonRoutesConfig } from "../Common/Common.Routes.Config";
import { Arrayify, DeserializeWikiData, Logger, SearchWiki, WikiBaseURL } from "../Util";
import { NPC } from "../Data/Types/WikiTypes";
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
            const pageEndpoint = WikiBaseURL + new URLSearchParams({
              action: "query",
              prop: "revisions",
              rvprop: "content",
              titles: page.title,
              format: "json"
            });

            const base = await fetch(pageEndpoint)
              .then(res => res.json())
              .then((res: PageResponse) => Object.values(res.query.pages)[0])
              .then(page => page.revisions[0]["*"])
              .then(DeserializeWikiData<NpcInternal>);

            if (!base)
              response = this.NotFound(res);

            return {
              Title: base.titles,
              Description: base.descrip,
              Locations: Arrayify(base.locations),
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
