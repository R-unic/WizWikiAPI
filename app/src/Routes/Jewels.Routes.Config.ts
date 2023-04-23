import { Application, Response } from "express";
import { CommonRoutesConfig } from "../Common/Common.Routes.Config";
import { SearchWiki, GetInternalType, Logger } from "../Util";
import { Jewel } from "../Data/Types/WikiTypes";
import { APIResponse } from "../Data/Types/APITypes";

interface JewelInternal {
  readonly quality: string;
  readonly socket: string;
  readonly type: string;
  readonly effect: string;
  readonly effectval?: string;
  readonly effectcard?: string;
  readonly petability?: string;
  readonly level?: number;
  readonly petlevel?: string;
  readonly ultra?: boolean;
  readonly fishchestlocations?: string;
}

export default class JewelRoutes extends CommonRoutesConfig {
  public constructor(App: Application) {
    super(App, "Jewels");
  }

  protected ConfigureRoutes(): Application {
    this.App.route("/jewels");
    this.App.route("/jewels/:npcName")
      .all((_, __, next) => next())
      .get((req, res) => {
        const { npcName } = req.params;
        const { resultCount } = req.query;

        let response: Response;
        SearchWiki(this.Name.slice(0, -1), npcName, Number(resultCount ?? 1))
          .then(res => res.query.search)
          .then(results => results.map<Promise<Jewel>>(async page => {
            const base = await GetInternalType<JewelInternal>(page);
            if (!base)
              response = this.NotFound(res);

            return {
              Quality: base.quality,
              Socket: base.socket,
              Type: base.type,
              Effect: base.effect,
              EffectValue: base.effectval,
              EffectCard: base.effectcard,
              PetAbility: base.petability,
              Level: base.level,
              PetLevel: base.petlevel,
              Ultra: base.ultra ?? false,
              FishChestLocations: base.fishchestlocations
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
