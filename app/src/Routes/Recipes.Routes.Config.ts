import { Application, Response } from "express";
import { CommonRoutesConfig } from "../Common/Common.Routes.Config";
import { DeserializeWikiData, Logger, SearchWiki, WikiBaseURL } from "../Util";
import { Recipe, RequiredCraftingItem } from "../Data/Types/WikiTypes";
import { APIResponse } from "../Data/Types/APITypes";

interface RecipeInternal {
  readonly type: string;
  readonly item1: string;
  readonly item2?: string;
  readonly crrank: string;
  readonly crstat: string;
  readonly cooldown: string;
  readonly reagent1: string;
  readonly reagentnum1: number;
  readonly reagent2?: string;
  readonly reagentnum2?: number;
  readonly reagent3?: string;
  readonly reagentnum3?: number;
  readonly reagent4?: string;
  readonly reagentnum4?: number;
  readonly reagent5?: string;
  readonly reagentnum5?: number;
  readonly reagent6?: string;
  readonly reagentnum6?: number;
  readonly reagent7?: string;
  readonly reagentnum7?: number;
  readonly reagent8?: string;
  readonly reagentnum8?: number;
  readonly reagent9?: string;
  readonly reagentnum9?: number;
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

            const items: RequiredCraftingItem[] = [];
            for (let i = 1; i <= 9; i++) {
              const nameKey = <keyof RecipeInternal>(`reagent${i}`);
              const amountKey = <keyof RecipeInternal>(`reagentnum${i}`);
              const name = <Maybe<string>>base[nameKey];
              const amount = <Maybe<number>>base[amountKey];
              if (name && amount)
                items.push({
                  Name: name.replace(/\*TC/g, "").replace(/\*FS/g, "").replace(/\*HS/g, ""),
                  Amount: amount
                });
            }
            return {
              Type: base.type,
              MainItem: base.item1,
              SecondaryItem: base.item2,
              CraftingRank: base.crrank,
              CraftingStation: base.crstat,
              Cooldown: base.cooldown,
              RequiredItems: items
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
