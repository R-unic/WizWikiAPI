import { Application, Response } from "express";
import { CommonRoutesConfig } from "../Common/Common.Routes.Config";
import { DeserializeWikiData, Logger, SearchWiki, WikiBaseURL } from "../Util";
import { Spell } from "../Data/Types/WikiTypes";
import { APIResponse } from "../Data/Types/APITypes";

interface SpellInternal {
  readonly school: School;
  readonly pipcost: number;
  readonly shadpipcost?: number;
  readonly accuracy: string;
  readonly shadowenhanced?: boolean;
  readonly type: string;
  readonly type2?: string;
  readonly subtype?: string;
  readonly noenchant?: string;
  readonly descrip1: string;
  readonly dimage1?: string;
  readonly descrip2: string;
  readonly dimage2?: string;
  readonly descrip3: string;
  readonly dimage3?: string;
  readonly descrip4: string;
  readonly dimage4?: string;
  readonly descrip5: string;
  readonly dimage5?: string;
  readonly enchantment1?: string;
  readonly enchantment2?: string;
  readonly enchantment3?: string;
  readonly enchantable?: boolean;
  readonly creatureonly?: boolean;
  readonly polymorph?: string;
  readonly trainer1?: string;
  readonly trainer2?: string;
  readonly reqspell1?: string;
  readonly reqspell2?: string;
  readonly reqspell3?: string;
  readonly prespell1?: string;
  readonly prespell2?: string;
  readonly prespell3?: string;
  readonly trainpoint?: boolean;
  readonly minion?: string;
  readonly minion1?: string;
  readonly minion1pips?: number;
  readonly minion1look?: string;
  readonly minion1rank?: number;
  readonly minion1health?: number;
  readonly minion2?: string;
  readonly minion2pips?: number;
  readonly minion2look?: string;
  readonly minion2rank?: number;
  readonly minion2health?: number;
  readonly minion3?: string;
  readonly minion3pips?: number;
  readonly minion3look?: string;
  readonly minion3rank?: number;
  readonly minion3health?: number;
}

export default class SpellRoutes extends CommonRoutesConfig {
  public constructor(App: Application) {
    super(App, "Spells");
  }

  protected ConfigureRoutes(): Application {
    this.App.route("/spells");
    this.App.route("/spells/:spellName")
      .all((_, __, next) => next())
      .get((req, res) => {
        const { spellName } = req.params;
        const { resultCount } = req.query;
        let response: Response;

        SearchWiki(this.Name.slice(0, -1), spellName, Number(resultCount ?? 1))
          .then(res => res.query.search)
          .then(results => results.map<Promise<Spell>>(async page => {
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
              .then(DeserializeWikiData<SpellInternal>);

            if (!base)
              response = this.NotFound(res);

            const descrip = [base.descrip1, base.dimage1, base.descrip2, base.dimage2, base.descrip3, base.dimage3, base.descrip4, base.dimage4, base.descrip5, base.dimage5];
            return {
              School: base.school,
              PipCost: base.pipcost,
              ShadowPipCost: base.shadpipcost ?? 0,
              ShadowEnhanced: base.shadowenhanced ?? false,
              Accuracy: base.accuracy,
              Description: descrip.map(s => s?.trim()).filter(s => s !== undefined).join(" "),
              NoEnchant: base.noenchant,
              Type: base.type,
              Type2: base.type2,
              Subtype: base.subtype,
              Enchantment1: base.enchantment1,
              Enchantment2: base.enchantment2,
              Enchantment3: base.enchantment3,
              Enchantable: base.enchantable ?? false,
              CreatureOnly: base.creatureonly ?? false,
              Polymorph: base.polymorph,
              Trainer1: base.trainer1,
              Trainer2: base.trainer2,
              ReqSpell1: base.reqspell1,
              ReqSpell2: base.reqspell2,
              ReqSpell3: base.reqspell3,
              PreSpell1: base.prespell1,
              PreSpell2: base.prespell2,
              PreSpell3: base.prespell3,
              ReqTrainingPoint: base.trainpoint ?? false,
              Minion: base.minion,
              Minion1: base.minion1,
              Minion1Pips: base.minion1pips,
              Minion1Look: base.minion1look,
              Minion1Rank: base.minion1rank,
              Minion1Health: base.minion1health,
              Minion2: base.minion2,
              Minion2Pips: base.minion2pips,
              Minion2Look: base.minion2look,
              Minion2Rank: base.minion2rank,
              Minion2Health: base.minion2health,
              Minion3: base.minion3,
              Minion3Pips: base.minion3pips,
              Minion3Look: base.minion3look,
              Minion3Rank: base.minion3rank,
              Minion3Health: base.minion3health
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
