import { Application, Response } from "express";
import { CommonRoutesConfig } from "../Common/Common.Routes.Config";
import { SearchWiki, GetInternalType, Logger, Arrayify } from "../Util";
import { Location, Snack } from "../Data/Types/WikiTypes";
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
    this.App.route("/snacks/:snackName")
      .all((_, __, next) => next())
      .get((req, res) => {
        const { snackName } = req.params;
        const { resultCount } = req.query;

        let response: Response;
        SearchWiki(this.Name.slice(0, -1), snackName, Number(resultCount ?? 1))
          .then(res => res.query.search)
          .then(results => results.map<Promise<Snack>>(async page => {
            const base = await GetInternalType<SnackInternal>(page);
            if (!base)
              response = this.NotFound(res);

            return {
              Rank: base.value,
              School: base.school,
              Class: base.class,
              SellValue: base.sellval,
              Auctionable: base.auction,
              FishChestLocations: Arrayify(base.fishchestlocations).map(lexeme => new Location(lexeme)),
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
