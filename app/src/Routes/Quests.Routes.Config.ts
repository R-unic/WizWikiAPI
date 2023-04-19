import { Application, Response } from "express";
import { CommonRoutesConfig } from "../Common/Common.Routes.Config";
import { Arrayify, DeserializeWikiData, SearchWiki } from "../Util";
import APIResponse from "../Data/Types/API/Response";
import Quest from "../Data/Types/Quest";

interface QuestInternal {

}

export default class SpellRoutes extends CommonRoutesConfig {
  public constructor(App: Application) {
    super(App, "Spells");
  }

  protected ConfigureRoutes(): Application {
    this.App.route("/quests");
    this.App.route("/quests/:questName")
      .all((_, __, next) => next())
      .get((req, res) => {
        const { questName } = req.params;
        const { resultCount } = req.query;
        let response: Response;

        SearchWiki("Quest", questName, Number(resultCount))
          .then(res => res.query.search)
          .then(results => results.map<Promise<Quest>>(async page => {
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
              .then(DeserializeWikiData<QuestInternal>);

            if (!base)
              response = this.NotFound(res);

            return {

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
