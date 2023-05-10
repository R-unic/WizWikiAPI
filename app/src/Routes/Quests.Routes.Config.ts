import { Application, Response } from "express";
import { CommonRoutesConfig } from "../Common/Common.Routes.Config";
import { SearchWiki, GetInternalType, Logger } from "../Util";
import { Quest } from "../Data/Types/WikiTypes";
import { APIResponse } from "../Data/Types/APITypes";

interface QuestInternal {
  readonly prequest1?: string;
  readonly prequest2?: string;
  readonly prequest3?: string;
  readonly prelevel?: string;
  readonly school?: string;
  readonly giver: string;
  readonly giverwld: string;
  readonly giverloc: string;
  readonly storyline: boolean;
  readonly fishing?: boolean;
  readonly crafting?: boolean;
  readonly instance?: boolean;
  readonly handin: string;
  readonly rewgold?: number;
  readonly rewxp?: number;
  readonly rewtp?: number;
  readonly reward1type?: string;
  readonly reward1balance?: string;
  readonly reward1ice?: string;
  readonly reward1fire?: string;
  readonly reward1storm?: string;
  readonly reward1death?: string;
  readonly reward1life?: string;
  readonly reward1myth?: string;
  readonly reward1?: string;
  readonly reward2type?: string;
  readonly reward2balance?: string;
  readonly reward2ice?: string;
  readonly reward2fire?: string;
  readonly reward2storm?: string;
  readonly reward2death?: string;
  readonly reward2life?: string;
  readonly reward2myth?: string;
  readonly reward2?: string;
  readonly reward3type?: string;
  readonly reward3?: string;
  readonly reward4type?: string;
  readonly reward4?: string;
  readonly vary1?: string;
  readonly postquest1?: string;
  readonly postquest1mod?: string;
  readonly postquest2?: string;
  readonly postquest2mod?: string;
  readonly postquest3?: string;
  readonly postquest3mod?: string;
  readonly dialogue?: string;
  readonly goal1: string;
  readonly "goal1-1"?: string;
  readonly "goal1-2"?: string;
  readonly "goal1-3"?: string;
  readonly "goal1-4"?: string;
  readonly "goal1-5"?: string;
  readonly "goal1-6"?: string;
  readonly "goal1-7"?: string;
  readonly "goal1-8"?: string;
  readonly "goal1-9"?: string;
  readonly goal2?: string;
  readonly "goal2-1"?: string;
  readonly "goal2-2"?: string;
  readonly "goal2-3"?: string;
  readonly "goal2-4"?: string;
  readonly "goal2-5"?: string;
  readonly "goal2-6"?: string;
  readonly "goal2-7"?: string;
  readonly "goal2-8"?: string;
  readonly "goal2-9"?: string;
  readonly goal3?: string;
  readonly "goal3-1"?: string;
  readonly "goal3-2"?: string;
  readonly "goal3-3"?: string;
  readonly "goal3-4"?: string;
  readonly "goal3-5"?: string;
  readonly "goal3-6"?: string;
  readonly "goal3-7"?: string;
  readonly "goal3-8"?: string;
  readonly "goal3-9"?: string;
  readonly goal4?: string;
  readonly "goal4-1"?: string;
  readonly "goal4-2"?: string;
  readonly "goal4-3"?: string;
  readonly "goal4-4"?: string;
  readonly "goal4-5"?: string;
  readonly "goal4-6"?: string;
  readonly "goal4-7"?: string;
  readonly "goal4-8"?: string;
  readonly "goal4-9"?: string;
  readonly goal5?: string;
  readonly "goal5-1"?: string;
  readonly "goal5-2"?: string;
  readonly "goal5-3"?: string;
  readonly "goal5-4"?: string;
  readonly "goal5-5"?: string;
  readonly "goal5-6"?: string;
  readonly "goal5-7"?: string;
  readonly "goal5-8"?: string;
  readonly "goal5-9"?: string;
  readonly goal6?: string;
  readonly "goal6-1"?: string;
  readonly "goal6-2"?: string;
  readonly "goal6-3"?: string;
  readonly "goal6-4"?: string;
  readonly "goal6-5"?: string;
  readonly "goal6-6"?: string;
  readonly "goal6-7"?: string;
  readonly "goal6-8"?: string;
  readonly "goal6-9"?: string;
}

export default class QuestRoutes extends CommonRoutesConfig {
  public constructor(App: Application) {
    super(App, "Quests");
  }

  protected ConfigureRoutes(): Application {
    this.App.route("/quests");
    this.App.route("/quests/:questName")
      .all((_, __, next) => next())
      .get((req, res) => {
        const { questName } = req.params;
        const { resultCount } = req.query;
        let response: Response;

        SearchWiki(this.Name.slice(0, -1), questName, Number(resultCount ?? 1))
          .then(res => res.query.search)
          .then(results => results.map<Promise<Quest>>(async page => {
            const base = await GetInternalType<QuestInternal>(page);
            if (!base)
              response = this.NotFound(res);

            const GetSubGoals = (n: number): string[] => {
              const goalKey = <keyof QuestInternal>(`goal${n}`);
              const mainGoal = <Maybe<string>>base[goalKey];
              const subGoals: string[] = [];
              if (!mainGoal) return subGoals;

              for (let i = 1; i <= 9; i++) {
                const subGoalKey = <keyof QuestInternal>(`${goalKey}-${i}`);
                const subGoal = <Maybe<string>>base[subGoalKey];
                if (subGoal)
                  subGoals.push(subGoal);
              }
              return subGoals;
            }

            return {
              PreQuests: [base.prequest1, base.prequest2, base.prequest3],
              PostQuests: [
                base.postquest1 ? {
                  Name: base.postquest1,
                  Mod: base.postquest1mod
                } : undefined,
                base.postquest2 ? {
                  Name: base.postquest2,
                  Mod: base.postquest2mod
                } : undefined,
                base.postquest3 ? {
                  Name: base.postquest3,
                  Mod: base.postquest3mod
                } : undefined
              ],
              HandIn: base.handin,
              Giver: {
                Name: base.giver,
                World: base.giverwld,
                Location: base.giverloc
              },
              Storyline: base.storyline,
              Fishing: base.fishing ?? false,
              Crafting: base.crafting ?? false,
              Instance: base.instance ?? false,
              Dialogue: base.dialogue,
              Goals: [
                {
                  Description: base.goal1,
                  SubGoals: GetSubGoals(1)
                },
                base.goal2 ? {
                  Description: base.goal2,
                  SubGoals: GetSubGoals(2)
                } : undefined,
                base.goal3 ? {
                  Description: base.goal3,
                  SubGoals: GetSubGoals(3)
                } : undefined,
                base.goal4 ? {
                  Description: base.goal4,
                  SubGoals: GetSubGoals(4)
                } : undefined,
                base.goal5 ? {
                  Description: base.goal5,
                  SubGoals: GetSubGoals(5)
                } : undefined,
                base.goal6 ? {
                  Description: base.goal6,
                  SubGoals: GetSubGoals(6)
                } : undefined
              ],
              Rewards: {
                Gold: base.rewgold,
                XP: base.rewxp,
                TrainingPoints: base.rewtp,
                SchoolBased: {
                  Balance: [base.reward1balance, base.reward2balance],
                  Ice: [base.reward1ice, base.reward2ice],
                  Fire: [base.reward1fire, base.reward2fire],
                  Storm: [base.reward1storm, base.reward2storm],
                  Life: [base.reward1life, base.reward2life],
                  Death: [base.reward1death, base.reward2death],
                  Myth: [base.reward1myth, base.reward2myth],
                },
                Custom: [
                  base.reward1 ? {
                    Type: base.reward1type!,
                    Value: base.reward1
                  } : undefined,
                  base.reward2 ? {
                    Type: base.reward2type!,
                    Value: base.reward2
                  } : undefined,
                  base.reward3 ? {
                    Type: base.reward3type!,
                    Value: base.reward3
                  } : undefined,
                  base.reward4 ? {
                    Type: base.reward4type!,
                    Value: base.reward4
                  } : undefined,
                ]
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
