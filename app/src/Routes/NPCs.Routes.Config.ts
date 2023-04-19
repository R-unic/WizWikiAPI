import { Application, Response } from "express";
import { CommonRoutesConfig } from "../Common/Common.Routes.Config";
import { Arrayify, DeserializeWikiData } from "../Util";
import NPC from "../Data/Types/NPC";
import APIResponse from "../Data/Types/API/Response";

interface NpcInternal {
  readonly titles: string;
  readonly locations: string;
  readonly descrip: string;
  readonly givequests: string;
  readonly questgoals: string;
  readonly endquests: string;
}

export default class NpcRoutes extends CommonRoutesConfig {
  private readonly baseURL = "https://www.wizard101central.com/wiki/api.php?";

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
        const searchEndpoint = this.baseURL + new URLSearchParams({
          action: "query",
          list: "search",
          srlimit: (resultCount ?? 1).toString(),
          srsearch: `NPC:${npcName}`,
          format: "json"
        });

        let response: Response;
        fetch(searchEndpoint)
          .then(res => res.json())
          .then((res: SearchResponse) => res.query.search)
          .then(results => results.map<Promise<NPC>>(async page => {
            const pageEndpoint = this.baseURL + new URLSearchParams({
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
              Locations: Arrayify(base.locations),
              Description: base.descrip,
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
            if (response) return;
            response = this.NotFound(res);
          });

        return response!;
      });

    return this.App;
  }
}
