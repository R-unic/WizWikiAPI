import { Application, Response } from "express";
import { CommonRoutesConfig } from "../Common/Common.Routes.Config";
import { DeserializeWikiData, Logger, SearchWiki, WikiBaseURL } from "../Util";
import { Snack } from "../Data/Types/WikiTypes";
import { APIResponse } from "../Data/Types/APITypes";

interface SnackInternal {
  readonly value: number;
  readonly school: School;
  readonly class: string;
  readonly strength?: number;
  readonly will?: number;
  readonly agility?: number;
  readonly intellect?: number;
  readonly power?: number;
  readonly sellval: number;
  readonly auction: boolean;
  readonly fishchestlocations?: string;
}

export default class SnackRoutes extends CommonRoutesConfig {
  public constructor(App: Application) {
    super(App, "Snacks");
  }

  protected ConfigureRoutes(): Application {
    this.App.route("/snacks");
    this.App.route("/snacks/:npcName")
      .all((_, __, next) => next())
      .get((req, res) => {
        const { npcName } = req.params;
        const { resultCount } = req.query;

        let response: Response;
        SearchWiki(this.Name.slice(0, -1), npcName, Number(resultCount ?? 1))
          .then(res => res.query.search)
          .then(results => results.map<Promise<Snack>>(async page => {
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
              .then(DeserializeWikiData<SnackInternal>);

            if (!base)
              response = this.NotFound(res);

            return {
              Rank: base.value,
              School: base.school,
              Class: base.class,
              SellValue: base.sellval,
              Auctionable: base.auction,
              FishChestLocations: base.fishchestlocations,
              Stats: {
                Strength: base.strength,
                Will: base.will,
                Agility: base.agility,
                Intellect: base.intellect,
                Power: base.power,
              }
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
