import { Application, Response } from "express";
import { CommonRoutesConfig } from "../Common/Common.Routes.Config";
import { Arrayify, SearchWiki, GetInternalType, Logger } from "../Util";
import { HousingItem } from "../Data/Types/WikiTypes";
import { APIResponse } from "../Data/Types/APITypes";

interface HousingItemInternal {
  readonly type: string;
  readonly trade: boolean;
  readonly interact?: boolean;
  readonly auction: boolean;
  readonly crownsonly?: boolean;
  readonly notes?: string;
  readonly vendor: string;
  readonly vendor2?: string;
  readonly buyval: string;
  readonly xchgu: string;
  readonly sellval: string;
  readonly wrldv: string;
  readonly fishchestloc1?: string;
  readonly fishchestloc2?: string;
  readonly fishchestloc3?: string;
}

export default class HousingItemRoutes extends CommonRoutesConfig {
  public constructor(App: Application) {
    super(App, "HousingItems");
  }

  protected ConfigureRoutes(): Application {
    this.App.route("/housingItems");
    this.App.route("/housingItems/:housingItemName")
      .all((_, __, next) => next())
      .get((req, res) => {
        const { housingItemName } = req.params;
        const { resultCount } = req.query;

        let response: Response;
        SearchWiki("House", housingItemName, Number(resultCount ?? 1))
          .then(res => res.query.search)
          .then(results => results.map<Promise<HousingItem>>(async page => {
            const base = await GetInternalType<HousingItemInternal>(page);
            if (!base) // check if base.type exists and if it doesnt its a castle
              response = this.NotFound(res);

            return {
              BuyValue: Number(base.buyval.replace(/\,/, "").replace(/Gold/, "").trim()),
              Notes: Arrayify(base.notes, /\*/)
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
