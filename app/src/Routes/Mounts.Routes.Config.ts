import { Application, Response } from "express";
import { CommonRoutesConfig } from "../Common/Common.Routes.Config";
import { SearchWiki, GetInternalType, Logger } from "../Util";
import { Location, Mount } from "../Data/Types/WikiTypes";
import { APIResponse } from "../Data/Types/APITypes";

interface MountInternal {
  readonly dyeable?: boolean;
  readonly passengers: number;
  readonly descrip: string;
  readonly "1dayexists": boolean;
  readonly "1daycrowns"?: string;
  readonly "1daygold"?: string;
  readonly "1dayspeed"?: number;
  readonly "7dayexists": boolean;
  readonly "7daycrowns"?: string;
  readonly "7daygold"?: string;
  readonly "7dayspeed"?: number;
  readonly permanentexists: boolean;
  readonly permanentcrownsonly: boolean;
  readonly permanentcrowns: number;
  readonly permanenttickets?: number;
  readonly permanentgold?: number;
  readonly permanentstat?: string;
  readonly permanentstatschool?: School;
  readonly permanentstatboost?: string;
  readonly fishchestloc1?: string;
  readonly fishchestloc2?: string;
}

export default class MountRoutes extends CommonRoutesConfig {
  public constructor(App: Application) {
    super(App, "Mounts");
  }

  protected ConfigureRoutes(): Application {
    this.App.route("/mounts");
    this.App.route("/mounts/:mountName")
      .all((_, __, next) => next())
      .get((req, res) => {
        const { mountName } = req.params;
        const { resultCount } = req.query;

        let response: Response;
        SearchWiki(this.Name.slice(0, -1), mountName, Number(resultCount ?? 1))
          .then(res => res.query.search)
          .then(results => results.map<Promise<Mount>>(async page => {
            const base = await GetInternalType<MountInternal>(page);
            if (!base)
              response = this.NotFound(res);


            const fishChestLocations: string[] = [];
            if (base.fishchestloc1)
              fishChestLocations.push(base.fishchestloc1);
            if (base.fishchestloc2)
              fishChestLocations.push(base.fishchestloc2);

            return {
              Dyeable: base.dyeable ?? false,
              Passengers: base.passengers,
              Description: base.descrip,
              OneDay: {
                Exists: base["1dayexists"],
                Crowns: base["1daycrowns"],
                Gold: base["1daygold"],
                Speed: base["1dayspeed"],
              },
              SevenDay: {
                Exists: base["7dayexists"],
                Crowns: base["7daycrowns"],
                Gold: base["7daygold"],
                Speed: base["7dayspeed"],
              },
              Permanent: {
                CrownsOnly: base.permanentcrownsonly,
                Exists: base.permanentexists,
                Crowns: base.permanentcrowns,
                Gold: base.permanentgold,
                Tickets: base.permanenttickets,
                Speed: 40,
                Stat: base.permanentstat,
                StatSchool: base.permanentstatschool,
                StatBoost: base.permanentstatboost
              },
              FishChestLocations: fishChestLocations.map(lexeme => new Location(lexeme))
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
