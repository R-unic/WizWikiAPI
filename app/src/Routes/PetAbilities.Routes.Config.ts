import { Application, Response } from "express";
import { CommonRoutesConfig } from "../Common/Common.Routes.Config";
import { Arrayify, DeserializeWikiData, Logger, SearchWiki, WikiBaseURL } from "../Util";
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
              .then(DeserializeWikiData<PetAbilityInternal>);

            if (!base)
              response = this.NotFound(res);

            return {
              Type: base.type,
              Rarity: base.rarity,
              TalentType: base.taltype,
              School: base.talschool,
              Card: base.talcard,
              Trigger: base.trigger,
              Adventure: base.taladventure,
              Locked: base.locked,
              HappinessCost: base.happcost,
              Cooldown: base.talcool,
              Other: base.talother,
              Strength: base.talstr,
              Intellect: base.talint,
              Agility: base.talagil,
              Will: base.talwill,
              Power: base.talpow,
              BonusGoldRange:
                base.bonusgold ?
                <[number, number]>base.bonusgold.split("-").map(s => Number(s.trim().replace(/\,/, "")))
                : undefined,

              BonusCards: Arrayify(base.bonuscards),
              BonusReagents: Arrayify(base.bonusreagents),
              UnlockReagents: [
                base.unlockreagent1 ? {
                  Name: base.unlockreagent1,
                  Cost: base.unlockcost1!
                } : undefined,
                base.unlockreagent2 ? {
                  Name: base.unlockreagent2,
                  Cost: base.unlockcost2!
                } : undefined
              ],
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
