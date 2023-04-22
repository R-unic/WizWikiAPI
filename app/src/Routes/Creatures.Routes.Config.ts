import { Application, Response } from "express";
import { CommonRoutesConfig } from "../Common/Common.Routes.Config";
import { Arrayify, SearchWiki, GetInternalType, Logger } from "../Util";
import { Creature } from "../Data/Types/WikiTypes";
import { APIResponse } from "../Data/Types/APITypes";

interface CreatureInternal {
  readonly cretype: string;
  readonly rank: number;
  readonly heal: number;
  readonly crecla: string;
  readonly school: School;
  readonly masteries?: string;
  readonly cheats?: boolean;
  readonly shadowslots?: number;
  readonly startpips: number;
  readonly powerpips?: boolean;
  readonly outpierce?: string;
  readonly outboost: string;
  readonly incboost?: string;
  readonly incresist?: string;
  readonly outhealing?: string;
  readonly inchealing?: string;
  readonly stunable: boolean;
  readonly beguilable: boolean;
  readonly minion?: string;
  readonly minion2?: string;
  readonly world: string;
  readonly location: string;
  readonly subloc1?: string;
  readonly descrip: string;
  readonly speech?: string;
  readonly monstrotomedescrip: string;
  readonly summon_animus: number;
  readonly summon_gold: number;
  readonly guest_animus: number;
  readonly guest_gold: number;
  readonly can_expel: boolean;
  readonly expel_animus: number;
  readonly expel_gold: number;
  readonly spellnotes?: string;
  readonly casts?: string;
  readonly gold: string;
  readonly hats?: string;
  readonly robes?: string;
  readonly boots?: string;
  readonly athames?: string;
  readonly amulets?: string;
  readonly rings?: string;
  readonly wands?: string;
  readonly decks?: string;
  readonly items?: string;
  readonly spellements?: string;
  readonly reagents?: string;
  readonly cards?: string;
  readonly snacks?: string;
  readonly jewels?: string;
  readonly pets?: string;
  readonly seeds?: string;
  readonly spells?: string;
  readonly mounts?: string;
  readonly elixirs?: string;
  readonly recipes?: string;
}

export default class CreatureRoutes extends CommonRoutesConfig {
  public constructor(App: Application) {
    super(App, "Creatures");
  }

  protected ConfigureRoutes(): Application {
    this.App.route("/creatures");
    this.App.route("/creatures/:creatureName")
      .all((_, __, next) => next())
      .get((req, res) => {
        const { creatureName } = req.params;
        const { resultCount } = req.query;
        let response: Response;

        SearchWiki(this.Name.slice(0, -1), creatureName, Number(resultCount ?? 1))
          .then(res => res.query.search)
          .then(results => results.map<Promise<Creature>>(async page => {
            const base = await GetInternalType<CreatureInternal>(page);
            if (!base)
              response = this.NotFound(res);

            return {
              Type: base.cretype,
              Rank: base.rank,
              Health: base.heal,
              Classification: base.crecla,
              School: base.school,
              Masteries: <School[]>Arrayify(base.masteries),
              Cheats: base.cheats ?? false,
              StartPips: base.startpips,
              PowerPips: base.powerpips ?? false,
              OutPierce: base.outpierce,
              OutBoost: base.outboost,
              IncBoost: base.incboost,
              IncResist: base.incresist,
              OutHealing: base.outhealing ?? "0%",
              IncHealing: base.inchealing ?? "0%",
              ShadowPipSlots: base.shadowslots ?? 0,
              Stunable: base.stunable,
              Beguilable: base.beguilable,
              Minion: base.minion,
              Minion2: base.minion2,
              World: base.world,
              Location: base.location,
              Sublocation: base.subloc1,
              Description: base.descrip,
              Speech: base.speech,
              MonstrotomeDescription: base.monstrotomedescrip,
              SummonAnimus: base.summon_animus,
              SummonGold: base.summon_gold,
              GuestAnimus: base.guest_animus,
              GuestGold: base.guest_gold,
              CanExpel: base.can_expel,
              ExpelAnimus: base.expel_animus,
              ExpelGold: base.expel_gold,
              SpellNotes: base.spellnotes,
              Casts: Arrayify(base.casts),
              GoldRange: [Number(base.gold.split(" - ")[0]), Number(base.gold.split(" - ")[1])],
              Drops: {
                Hats: Arrayify(base.hats),
                Robes: Arrayify(base.robes),
                Boots: Arrayify(base.boots),
                Athames: Arrayify(base.athames),
                Amulets: Arrayify(base.amulets),
                Rings: Arrayify(base.rings),
                Wands: Arrayify(base.wands),
                Decks: Arrayify(base.decks),
                HousingItems: Arrayify(base.items),
                Spellements: Arrayify(base.spellements),
                Reagents: Arrayify(base.reagents),
                TreasureCards: Arrayify(base.cards),
                Snacks: Arrayify(base.snacks),
                Jewels: Arrayify(base.jewels),
                Pets: Arrayify(base.pets),
                Mounts: Arrayify(base.mounts),
                Elixirs: Arrayify(base.elixirs),
                Recipes: Arrayify(base.recipes),
                Seeds: Arrayify(base.seeds),
                Spells: Arrayify(base.spells),
              }
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
