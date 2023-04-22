import { Application, Response } from "express";
import { CommonRoutesConfig } from "../Common/Common.Routes.Config";
import { SearchWiki, GetInternalType, Logger } from "../Util";
import { Spell, SpellMinion } from "../Data/Types/WikiTypes";
import { APIResponse } from "../Data/Types/APITypes";

interface SpellInternal {
  readonly school: School;
  readonly pipcost: string;
  readonly schoolpipcost?: string;
  readonly shadpipcost?: number;
  readonly shadowenhanced?: boolean;
  readonly accuracy: string;
  readonly type: string;
  readonly type2?: string;
  readonly subtype?: string;
  readonly noenchant?: string;
  readonly PvP?: boolean;
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
  readonly minion?: boolean;
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
  readonly minion4?: string;
  readonly minion4pips?: number;
  readonly minion4look?: string;
  readonly minion4rank?: number;
  readonly minion4health?: number;
  readonly minion5?: string;
  readonly minion5pips?: number;
  readonly minion5look?: string;
  readonly minion5rank?: number;
  readonly minion5health?: number;
  readonly minion6?: string;
  readonly minion6pips?: number;
  readonly minion6look?: string;
  readonly minion6rank?: number;
  readonly minion6health?: number;
  readonly minion7?: string;
  readonly minion7pips?: number;
  readonly minion7look?: string;
  readonly minion7rank?: number;
  readonly minion7health?: number;
  readonly minion8?: string;
  readonly minion8pips?: number;
  readonly minion8look?: string;
  readonly minion8rank?: number;
  readonly minion8health?: number;
  readonly minion9?: string;
  readonly minion9pips?: number;
  readonly minion9look?: string;
  readonly minion9rank?: number;
  readonly minion9health?: number;
  readonly minion10?: string;
  readonly minion10pips?: number;
  readonly minion10look?: string;
  readonly minion10rank?: number;
  readonly minion10health?: number;
  readonly minion11?: string;
  readonly minion11pips?: number;
  readonly minion11look?: string;
  readonly minion11rank?: number;
  readonly minion11health?: number;
  readonly minion12?: string;
  readonly minion12pips?: number;
  readonly minion12look?: string;
  readonly minion12rank?: number;
  readonly minion12health?: number;
  readonly minion13?: string;
  readonly minion13pips?: number;
  readonly minion13look?: string;
  readonly minion13rank?: number;
  readonly minion13health?: number;
  readonly minion14?: string;
  readonly minion14pips?: number;
  readonly minion14look?: string;
  readonly minion14rank?: number;
  readonly minion14health?: number;
}

const getMinions = (ic: SpellInternal): SpellMinion[] => {
  const getMinionProperty = (minion: keyof SpellInternal, propertyKey: string) => {
    const propKey = <keyof SpellInternal>(minion + propertyKey);
    return ic[propKey];
  }
  const minions: SpellMinion[] = [];
  for (let i = 1; i <= 14; i++) {
    const minionKey = <keyof SpellInternal>("minion" + i);
    const minion = <Maybe<string>>ic[minionKey];
    if (minion)
      minions.push({
        Name: minion,
        Pips: <number>getMinionProperty(minionKey, "pips"),
        Rank: <number>getMinionProperty(minionKey, "rank"),
        Health: <number>getMinionProperty(minionKey, "health"),
      });
  }
  return minions
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
            const base = await GetInternalType<SpellInternal>(page);
            if (!base)
              response = this.NotFound(res);

            const descrip = [base.descrip1, base.dimage1, base.descrip2, base.dimage2, base.descrip3, base.dimage3, base.descrip4, base.dimage4, base.descrip5, base.dimage5];
            return {
              School: base.school,
              PipCost: base.pipcost,
              SchoolPipCost: base.schoolpipcost,
              ShadowPipCost: base.shadpipcost ?? 0,
              ShadowEnhanced: base.shadowenhanced ?? false,
              Accuracy: base.accuracy,
              Description: descrip.map(s => s?.trim()).filter(s => s !== undefined).join(" "),
              NoEnchant: base.noenchant,
              Type: base.type,
              Type2: base.type2,
              Subtype: base.subtype,
              NoPvP: !(base.PvP ?? true),
              Enchantments: [base.enchantment1, base.enchantment2, base.enchantment3],
              Enchantable: base.enchantable ?? false,
              CreatureOnly: base.creatureonly ?? false,
              Polymorph: base.polymorph,
              Trainer1: base.trainer1,
              Trainer2: base.trainer2,
              RequiredSpells: [base.reqspell1, base.reqspell2, base.reqspell3],
              PreSpells: [base.prespell1, base.prespell2, base.prespell3],
              ReqTrainingPoint: base.trainpoint ?? false,
              Minion: base.minion ?? false,
              Minions: getMinions(base)
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
