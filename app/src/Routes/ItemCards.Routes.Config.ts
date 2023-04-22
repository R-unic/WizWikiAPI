import { Application, Response } from "express";
import { CommonRoutesConfig } from "../Common/Common.Routes.Config";
import { DeserializeWikiData, Logger, SearchWiki, WikiBaseURL } from "../Util";
import { ItemCard, ItemCardBase } from "../Data/Types/WikiTypes";
import { APIResponse } from "../Data/Types/APITypes";

interface ItemCardInternal {
  readonly school: School;
  readonly pipcost: string;
  readonly schoolpipcost?: string;
  readonly shadpipcost?: number;
  readonly accuracy: string;
  readonly PvP?: boolean;
  readonly shadowenhanced?: boolean;
  readonly type: string;
  readonly type2?: string;
  readonly subtype?: string;
  readonly descrip1: string;
  readonly minion?: boolean;
  readonly minion1?: string;
  readonly minion2?: string;
  readonly minion3?: string;
  readonly minion4?: string;
  readonly minion5?: string;
  readonly minion6?: string;
  readonly minion7?: string;
  readonly minion8?: string;
  readonly minion9?: string;
  readonly minion10?: string;
  readonly minion11?: string;
  readonly minion12?: string;
  readonly minion13?: string;
  readonly minion14?: string;
  readonly var?: boolean;
  readonly varschool: School;
  readonly varpipcost: string;
  readonly varschoolpipcost?: string;
  readonly varshadpipcost?: number;
  readonly varaccuracy: string;
  readonly varPvP?: boolean;
  readonly varshadowenhanced?: boolean;
  readonly vartype: string;
  readonly vartype2?: string;
  readonly varsubtype?: string;
  readonly vardescrip1?: string;
  readonly varminion?: boolean;
  readonly varminion1?: string;
  readonly varminion2?: string;
  readonly varminion3?: string;
  readonly varminion4?: string;
  readonly varminion5?: string;
  readonly varminion6?: string;
  readonly varminion7?: string;
  readonly varminion8?: string;
  readonly varminion9?: string;
  readonly varminion10?: string;
  readonly varminion11?: string;
  readonly varminion12?: string;
  readonly varminion13?: string;
  readonly varminion14?: string;
  readonly var2?: boolean;
  readonly var2school: School;
  readonly var2pipcost: string;
  readonly var2schoolpipcost?: string;
  readonly var2shadpipcost?: number;
  readonly var2accuracy: string;
  readonly var2PvP?: boolean;
  readonly var2shadowenhanced?: boolean;
  readonly var2type: string;
  readonly var2type2?: string;
  readonly var2subtype?: string;
  readonly var2descrip1?: string;
  readonly var2minion?: boolean;
  readonly var2minion1?: string;
  readonly var2minion2?: string;
  readonly var2minion3?: string;
  readonly var2minion4?: string;
  readonly var2minion5?: string;
  readonly var2minion6?: string;
  readonly var2minion7?: string;
  readonly var2minion8?: string;
  readonly var2minion9?: string;
  readonly var2minion10?: string;
  readonly var2minion11?: string;
  readonly var2minion12?: string;
  readonly var2minion13?: string;
  readonly var2minion14?: string;
  readonly var3?: boolean;
  readonly var3school: School;
  readonly var3pipcost: string;
  readonly var3schoolpipcost?: string;
  readonly var3shadpipcost?: number;
  readonly var3accuracy: string;
  readonly var3PvP?: boolean;
  readonly var3shadowenhanced?: boolean;
  readonly var3type: string;
  readonly var3type2?: string;
  readonly var3subtype?: string;
  readonly var3descrip1?: string;
  readonly var3minion?: boolean;
  readonly var3minion1?: string;
  readonly var3minion2?: string;
  readonly var3minion3?: string;
  readonly var3minion4?: string;
  readonly var3minion5?: string;
  readonly var3minion6?: string;
  readonly var3minion7?: string;
  readonly var3minion8?: string;
  readonly var3minion9?: string;
  readonly var3minion10?: string;
  readonly var3minion11?: string;
  readonly var3minion12?: string;
  readonly var3minion13?: string;
  readonly var3minion14?: string;
  readonly var4?: boolean;
  readonly var4school: School;
  readonly var4pipcost: string;
  readonly var4schoolpipcost?: string;
  readonly var4shadpipcost?: number;
  readonly var4accuracy: string;
  readonly var4PvP?: boolean;
  readonly var4shadowenhanced?: boolean;
  readonly var4type: string;
  readonly var4type2?: string;
  readonly var4subtype?: string;
  readonly var4descrip1?: string;
  readonly var4minion?: boolean;
  readonly var4minion1?: string;
  readonly var4minion2?: string;
  readonly var4minion3?: string;
  readonly var4minion4?: string;
  readonly var4minion5?: string;
  readonly var4minion6?: string;
  readonly var4minion7?: string;
  readonly var4minion8?: string;
  readonly var4minion9?: string;
  readonly var4minion10?: string;
  readonly var4minion11?: string;
  readonly var4minion12?: string;
  readonly var4minion13?: string;
  readonly var4minion14?: string;
  readonly var5?: boolean;
  readonly var5school: School;
  readonly var5pipcost: string;
  readonly var5schoolpipcost?: string;
  readonly var5shadpipcost?: number;
  readonly var5accuracy: string;
  readonly var5PvP?: boolean;
  readonly var5shadowenhanced?: boolean;
  readonly var5type: string;
  readonly var5type2?: string;
  readonly var5subtype?: string;
  readonly var5descrip1?: string;
  readonly var5minion?: boolean;
  readonly var5minion1?: string;
  readonly var5minion2?: string;
  readonly var5minion3?: string;
  readonly var5minion4?: string;
  readonly var5minion5?: string;
  readonly var5minion6?: string;
  readonly var5minion7?: string;
  readonly var5minion8?: string;
  readonly var5minion9?: string;
  readonly var5minion10?: string;
  readonly var5minion11?: string;
  readonly var5minion12?: string;
  readonly var5minion13?: string;
  readonly var5minion14?: string;
  readonly var6?: boolean;
  readonly var6school: School;
  readonly var6pipcost: string;
  readonly var6schoolpipcost?: string;
  readonly var6shadpipcost?: number;
  readonly var6accuracy: string;
  readonly var6PvP?: boolean;
  readonly var6shadowenhanced?: boolean;
  readonly var6type: string;
  readonly var6type2?: string;
  readonly var6subtype?: string;
  readonly var6descrip1?: string;
  readonly var6minion?: boolean;
  readonly var6minion1?: string;
  readonly var6minion2?: string;
  readonly var6minion3?: string;
  readonly var6minion4?: string;
  readonly var6minion5?: string;
  readonly var6minion6?: string;
  readonly var6minion7?: string;
  readonly var6minion8?: string;
  readonly var6minion9?: string;
  readonly var6minion10?: string;
  readonly var6minion11?: string;
  readonly var6minion12?: string;
  readonly var6minion13?: string;
  readonly var6minion14?: string;
}

const getMinions = (ic: ItemCardInternal, variation = false): string[] => {
  const minions: string[] = [];
  for (let i = 1; i <= 14; i++) {
    const minionKey = <keyof ItemCardInternal>((variation ? "var" : "") + "minion" + i);
    const minion = <Maybe<string>>ic[minionKey];
    if (minion)
      minions.push(minion);
  }
  return minions
}

export default class ItemCardRoutes extends CommonRoutesConfig {
  public constructor(App: Application) {
    super(App, "ItemCards");
  }

  protected ConfigureRoutes(): Application {
    this.App.route("/itemCards");
    this.App.route("/itemCards/:itemCardName")
      .all((_, __, next) => next())
      .get((req, res) => {
        const { itemCardName } = req.params;
        const { resultCount } = req.query;

        let response: Response;
        SearchWiki(this.Name.slice(0, -1), itemCardName, Number(resultCount ?? 1))
          .then(res => res.query.search)
          .then(results => results.map<Promise<ItemCard>>(async page => {
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
              .then(DeserializeWikiData<ItemCardInternal>);

            if (!base)
              response = this.NotFound(res);

            const getVariationProperty = (variation: keyof ItemCardInternal, propertyKey: string) => {
              const propKey = <keyof ItemCardInternal>(variation + propertyKey);
              return base[propKey];
            }

            const variations: ItemCardBase[] = [];
            for (let i = 1; i <= 6; i++) {
              const variation = <keyof ItemCardInternal>("var" + (i === 1 ? "" : i));
              const hasVariation = <Maybe<boolean>>base[variation];
              if (hasVariation)
                variations.push({
                  School: <School>getVariationProperty(variation, "school"),
                  PipCost: <string>getVariationProperty(variation, "pipcost"),
                  ShadowPipCost: <number>(getVariationProperty(variation, "shadpipcost") ?? 0),
                  NoPvP: !(<boolean>(getVariationProperty(variation, "PvP") ?? true)),
                  ShadowEnhanced: <boolean>(getVariationProperty(variation, "shadowenhanced") ?? false),
                  Accuracy: <string>getVariationProperty(variation, "accuracy"),
                  Description: <string>getVariationProperty(variation, "descrip1"),
                  Type: <string>getVariationProperty(variation, "type"),
                  Type2: <Maybe<string>>getVariationProperty(variation, "type2"),
                  Subtype: <Maybe<string>>getVariationProperty(variation, "subtype"),
                  Minion: <boolean>(getVariationProperty(variation, "minion") ?? false),
                  Minions: getMinions(base, true)
                });
            }

            return {
              School: base.school,
              PipCost: base.pipcost,
              ShadowPipCost: base.shadpipcost ?? 0,
              NoPvP: !(base.PvP ?? true),
              ShadowEnhanced: base.shadowenhanced ?? false,
              Accuracy: base.accuracy,
              Description: base.descrip1,
              Type: base.type,
              Type2: base.type2,
              Subtype: base.subtype,
              Minion: base.minion ?? false,
              Minions: getMinions(base),
              Variations: variations
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
