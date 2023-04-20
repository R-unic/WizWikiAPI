import { Application, Response } from "express";
import { CommonRoutesConfig } from "../Common/Common.Routes.Config";
import { Arrayify, DeserializeWikiData, Logger, SearchWiki, WikiBaseURL } from "../Util";
import { Recipe } from "../Data/Types/WikiTypes";
import { APIResponse } from "../Data/Types/APITypes";

interface RecipeInternal {

}

export default class RecipeRoutes extends CommonRoutesConfig {
  public constructor(App: Application) {
    super(App, "Recipes");
  }

  protected ConfigureRoutes(): Application {
    this.App.route("/recipes");
    this.App.route("/recipes/:recipeName")
      .all((_, __, next) => next())
      .get((req, res) => {
        const { recipeName } = req.params;
        const { resultCount } = req.query;

        let response: Response;
        SearchWiki(this.Name.slice(0, -1), recipeName, Number(resultCount ?? 1))
          .then(res => res.query.search)
          .then(results => results.map<Promise<Recipe>>(async page => {
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
              .then(DeserializeWikiData<RecipeInternal>);

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
            Logger.Error(e.stack);
            if (response) return;
            response = this.NotFound(res);
          });

        return response!;
      });

    return this.App;
  }
}
