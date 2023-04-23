import { Application, Response } from "express";
import { CommonRoutesConfig } from "../Common/Common.Routes.Config";
import { SearchWiki, GetInternalType, Logger, Arrayify } from "../Util";
import { Fish, WorldListLocation } from "../Data/Types/WikiTypes";
import { APIResponse } from "../Data/Types/APITypes";

interface FishInternal {
  readonly school: School;
  readonly aquarium: string;
  readonly rank: number;
  readonly minsize: number;
  readonly maxsize: number;
  readonly initialxp: number;
  readonly regularxp: number;
  readonly rarity: string;
  readonly descrip: string;
  readonly minsell: number;
  readonly minsellsize: number;
  readonly maxsellsf: number;
  readonly maxsellsfsize: number;
  readonly maxsellwh: number;
  readonly maxsellwhsize: number;
  readonly house?: boolean;
  readonly worldfound1: string;
  readonly locationlist1: string;
  readonly worldfound2: string;
  readonly locationlist2: string;
  readonly worldfound3: string;
  readonly locationlist3: string;
  readonly worldfound4: string;
  readonly locationlist4: string;
  readonly worldfound5: string;
  readonly locationlist5: string;
  readonly worldfound6: string;
  readonly locationlist6: string;
  readonly worldfound7: string;
  readonly locationlist7: string;
  readonly worldfound8: string;
  readonly locationlist8: string;
  readonly worldfound9: string;
  readonly locationlist9: string;
  readonly worldfound10: string;
  readonly locationlist10: string;
  readonly worldfound11: string;
  readonly locationlist11: string;
  readonly worldfound12: string;
  readonly locationlist12: string;
}

const getWorldLocations = (internal: FishInternal): WorldListLocation[] => {
  const locationLists: WorldListLocation[] = [];
  for (let i = 1; i <= 12; i++) {
    const worldKey = <keyof FishInternal>("worldfound" + i);
    const locationListKey = <keyof FishInternal>("locationlist" + i);
    const world = <Maybe<string>>internal[worldKey];
    const locationList = <Maybe<string>>internal[locationListKey];
    if (world && locationList)
      locationLists.push({
        WorldName: world,
        Locations: Arrayify(locationList)
      });
  }
  return locationLists;
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
              School: base.school,
              Aquarium: base.aquarium,
              Rank: base.rank,
              SizeRange: [base.minsize, base.maxsize],
              InitialXP: base.initialxp,
              RegularXP: base.regularxp,
              Rarity: base.rarity,
              Description: base.descrip,
              SellPriceRange: [base.minsell, base.maxsellwh],
              SellSizeRange: [base.minsellsize, base.maxsellwhsize],
              FoundInHouses: base.house ?? false,
              FoundIn: getWorldLocations(base)
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
