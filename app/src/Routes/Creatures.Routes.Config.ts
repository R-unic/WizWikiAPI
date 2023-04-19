import { Application, Response } from "express";
import { CommonRoutesConfig } from "../Common/Common.Routes.Config";
import { DeserializeWikiData } from "../Util";
import Creature from "../Data/Types/Creature";
import APIResponse from "../Data/Types/API/Response";
import APIError from "../Data/Types/API/Error";

interface SearchResponse {
  query: {
    search: {
      ns: number;
      title: string;
      snippet: string;
      size: number;
      wordcount: number;
      timestamp: string;
    }[];
  };
}

interface Revision {
  pageid: number;
  ns: number;
  title: string;
  revisions: { "*": string; }[];
}

interface PageResponse {
  query: {
    pages: { [key: string]: Revision };
  };
}

interface CreatureInternal {
  cretype: string;
  rank: number;
  heal: number;
  crecla: string;
  school: School;
  masteries?: string;
  cheats?: boolean;
  shadowslots?: number;
  startpips: number;
  powerpips?: boolean;
  outpierce?: string;
  outboost: string;
  incboost?: string;
  incresist?: string;
  outhealing?: string;
  inchealing?: string;
  stunable: boolean;
  beguilable: boolean;
  minion?: string;
  minion2?: string;
  world: string;
  location: string;
  subloc1?: string;
  descrip: string;
  speech?: string;
  monstrotomedescrip: string;
  summon_animus: number;
  summon_gold: number;
  guest_animus: number;
  guest_gold: number;
  can_expel: boolean;
  expel_animus: number;
  expel_gold: number;
  spellnotes?: string;
  casts?: string;
  gold: string;
  hats?: string;
  robes?: string;
  boots?: string;
  athames?: string;
  amulets?: string;
  rings?: string;
  wands?: string;
  decks?: string;
  items?: string;
  spellements?: string;
  reagents?: string;
  cards?: string;
  snacks?: string;
  jewels?: string;
  pets?: string;
  seeds?: string;
  spells?: string;
  mounts?: string;
  elixirs?: string;
  recipes?: string;
}

export class CreatureRoutes extends CommonRoutesConfig {
  private readonly baseURL = "https://www.wizard101central.com/wiki/api.php?";

  public constructor(App: Application) {
    super(App, "Creatures");
  }

  protected ConfigureRoutes(): Application {
    this.App.route("/creatures");
    this.App.route("/creatures/:creatureName")
      .all((_, __, next) => next())
      .get((req, res) => {
        const { creatureName } = req.params;
        const searchEndpoint = this.baseURL + new URLSearchParams({
          action: "query",
          list: "search",
          srlimit: "4",
          srsearch: `Creature:${creatureName}`,
          format: "json"
        });

        let response: Response;
        fetch(searchEndpoint)
          .then(res => res.json())
          .then((res: SearchResponse) => res.query.search)
          .then(results => results.map(async page => {
            const pageEndpoint = this.baseURL + new URLSearchParams({
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
              .then(DeserializeWikiData<CreatureInternal>);

            if (!base) {
              const err = new APIError(ResponseCode.NOT_FOUND, "Creature not found.");
              response = res.status(err.Code)
                .send(JSON.stringify(new APIResponse(false, err)));
            }

            const split = (s?: string) => {
              return (s ?? "")
              .split("\n")
              .map(s =>
                s.replace(/\;/, "")
                  .replace(/\*F\d+/g, "")
                  .replace(/\*WMV/, "")
                  .replace(/\*CR/, "")
                  .trim()
              )
              .filter(s => s !== "");
            }

            const creature: Creature = {
              Type: base.cretype,
              Rank: base.rank,
              Health: base.heal,
              Classification: base.crecla,
              School: base.school,
              Masteries: <School[]>split(base.masteries),
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
              Casts: split(base.casts),
              GoldRange: [Number(base.gold.split(" - ")[0]), Number(base.gold.split(" - ")[1])],
              Drops: {
                Hats: split(base.hats),
                Robes: split(base.robes),
                Boots: split(base.boots),
                Athames: split(base.athames),
                Amulets: split(base.amulets),
                Rings: split(base.rings),
                Wands: split(base.wands),
                Decks: split(base.decks),
                HousingItems: split(base.items),
                Spellements: split(base.spellements),
                Reagents: split(base.reagents),
                TreasureCards: split(base.cards),
                Snacks: split(base.snacks),
                Jewels: split(base.jewels),
                Pets: split(base.pets),
                Mounts: split(base.mounts),
                Elixirs: split(base.elixirs),
                Recipes: split(base.recipes),
                Seeds: split(base.seeds),
                Spells: split(base.spells),
              }
            };

            if (response) return;
            response = res.status(ResponseCode.SUCCESS)
              .send(new APIResponse(true, creature));
          }))
          .catch(e => {
            if (response) return;
            const err = new APIError(ResponseCode.NOT_FOUND, e);
            response = res.status(err.Code)
              .send(JSON.stringify(new APIResponse(false, err)));
          });

        return response!;
      });

    return this.App;
  }
}
