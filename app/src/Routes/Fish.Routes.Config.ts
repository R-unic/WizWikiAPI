import { Application, Response } from "express";
import { CommonRoutesConfig } from "../Common/Common.Routes.Config";
import { SearchWiki, GetInternalType, Logger } from "../Util";
import { Fish } from "../Data/Types/WikiTypes";
import { APIResponse } from "../Data/Types/APITypes";

interface FishInternal {
  
}

export default class FishRoutes extends CommonRoutesConfig {
  public constructor(App: Application) {
    super(App, "Fishs");
  }

  protected ConfigureRoutes(): Application {
    this.App.route("/fish");
    this.App.route("/fish/:fishName")
      .all((_, __, next) => next())
      .get((req, res) => {
        const { fishName } = req.params;
        const { resultCount } = req.query;

        let response: Response;
        SearchWiki(this.Name.slice(0, -1), fishName, Number(resultCount ?? 1))
          .then(res => res.query.search)
          .then(results => results.map<Promise<Fish>>(async page => {
            const base = await GetInternalType<FishInternal>(page);
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
