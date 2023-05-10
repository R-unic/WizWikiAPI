import { Application, Response } from "express";
import { CommonRoutesConfig } from "../Common/Common.Routes.Config";
import { Arrayify, SearchWiki, GetInternalType, Logger } from "../Util";
import { PetAbility } from "../Data/Types/WikiTypes";
import { APIResponse } from "../Data/Types/APITypes";

interface PetAbilityInternal {
  readonly type: string;
  readonly rarity: string;
  readonly taltype: string;
  readonly talschool?: School;
  readonly talcard?: string;
  readonly trigger?: string;
  readonly taladventure?: string;
  readonly locked?: boolean;
  readonly unlockreagent1?: string;
  readonly unlockcost1?: number;
  readonly unlockreagent2?: string;
  readonly unlockcost2?: number;
  readonly unlockreagent3?: string;
  readonly unlockcost3?: number;
  readonly unlockreagent4?: string;
  readonly unlockcost4?: number;
  readonly happcost?: number;
  readonly talcool?: number;
  readonly talother?: string;
  readonly talstr?: string;
  readonly talint?: string;
  readonly talagil?: string;
  readonly talwill?: string;
  readonly talpow?: string;
  readonly bonusgold?: string;
  readonly bonuscards?: string;
  readonly bonusreagents?: string;
}

export default class PetAbilityRoutes extends CommonRoutesConfig {
  public constructor(App: Application) {
    super(App, "PetAbilitys");
  }

  protected ConfigureRoutes(): Application {
    this.App.route("/petAbilities");
    this.App.route("/petAbilities/:abilityName")
      .all((_, __, next) => next())
      .get((req, res) => {
        const { abilityName } = req.params;
        const { resultCount } = req.query;

        let response: Response;
        SearchWiki(this.Name.slice(0, -1), abilityName, Number(resultCount ?? 1))
          .then(res => res.query.search)
          .then(results => results.map<Promise<PetAbility>>(async page => {
            const base = await GetInternalType<PetAbilityInternal>(page);
            if (!base)
              response = this.NotFound(res);

            return {
              Type: base.type,
              Rarity: base.rarity,
              TalentType: base.taltype,
              School: base.talschool,
              Trigger: base.trigger,
              Locked: base.locked,
              HappinessCost: base.happcost,
              Stats: {
                Other: base.talother,
                Strength: base.talstr,
                Intellect: base.talint,
                Agility: base.talagil,
                Will: base.talwill,
                Power: base.talpow,
                Card: base.talcard,
                Adventure: base.taladventure ? {
                  Description: base.taladventure,
                  Cooldown: base.talcool!,
                  UnlockReagents: [
                    base.unlockreagent1 ? {
                      Name: base.unlockreagent1,
                      Cost: base.unlockcost1!
                    } : undefined,
                    base.unlockreagent2 ? {
                      Name: base.unlockreagent2,
                      Cost: base.unlockcost2!
                    } : undefined,
                    base.unlockreagent3 ? {
                      Name: base.unlockreagent3,
                      Cost: base.unlockcost3!
                    } : undefined,
                    base.unlockreagent4 ? {
                      Name: base.unlockreagent4,
                      Cost: base.unlockcost4!
                    } : undefined
                  ]
                } : undefined
              },
              
              BonusCards: Arrayify(base.bonuscards),
              BonusReagents: Arrayify(base.bonusreagents),
              BonusGoldRange:
                base.bonusgold ?
                <[number, number]>base.bonusgold.split("-").map(s => Number(s.trim().replace(/\,/, "")))
                : undefined,
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
