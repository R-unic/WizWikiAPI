import { getInfobox } from "../parsing";
import { isError } from "../utility";
import { APIResponse, Location, playableSchools, ResponseCode, School, schools } from "../types/common";
import { MAX_GOALS, MAX_POSTQUESTS, MAX_PREQUESTS, MAX_SUB_GOALS, type Postquest, type QuestGoal, type Quest, type QuestInfobox, MAX_REWARDS } from "../types/categories/quests";
import app from "../app";

app.get("/quests");
app.get("/quests/:questName", async (req, res) => {
  const { questName } = req.params;
  const infobox = await getInfobox<QuestInfobox>(`Quest:${questName}`);
  const errored = isError(infobox);
  const result = errored ? infobox : createQuest(infobox);

  res
    .status(errored ? infobox.code : ResponseCode.Success)
    .json(new APIResponse(!errored, result));
});

function createQuest(base: QuestInfobox): Quest {
  const prequests = createPrequests(base);
  const postquests = createPostquests(base);
  const goals = createGoals(base);
  const schoolRewards = createSchoolRewards(base);

  return {
    levelRequirement: base.prelevel,
    giver: {
      name: base.giver,
      location: new Location(base.giverwld + "::" + base.giverloc)
    },
    handIn: base.handin,
    storyline: base.storyline,
    instance: base.instance,
    rewards: {
      gold: base.rewgold,
      xp: base.rewxp,
      trainingPoints: base.rewtp,
      potions: base.rewpot,
      perSchool: schoolRewards
    },
    imageNumber: base.imagenum,
    prequests,
    postquests,
    goals
  };
}

function createPrequests(base: QuestInfobox): string[] {
  const prequests: string[] = [];
  for (let i = 1; i <= MAX_PREQUESTS; i++) {
    const name = base[`prequest${i}`] as Maybe<string>;
    if (name === undefined) break;

    prequests.push(name);
  }

  return prequests;
}

function createPostquests(base: QuestInfobox): Postquest[] {
  const postquests: Postquest[] = [];
  for (let i = 1; i <= MAX_POSTQUESTS; i++) {
    const name = base[`postquest${i}`] as Maybe<string>;
    const mod = base[`postquest${i}mod`] as Maybe<string>;
    if (name === undefined) break;

    postquests.push({ name, mod });
  }

  return postquests;
}

function createGoals(base: QuestInfobox): QuestGoal[] {
  const goals: QuestGoal[] = [];
  for (let i = 1; i <= MAX_GOALS; i++) {
    const description = base[`goal${i}`] as Maybe<string>;
    const subGoals = createSubGoals(base, i);
    if (description === undefined) break;

    goals.push({ description, subGoals });
  }

  return goals;
}

function createSubGoals(base: QuestInfobox, i: number): Maybe<string[]> {
  const subGoals: string[] = [];
  for (let j = 1; j <= MAX_SUB_GOALS; j++) {
    const description = base[`goal${i}-${j}`] as Maybe<string>;
    if (description === undefined) break;

    subGoals.push(description);
  }

  return subGoals.length > 0 ? subGoals : undefined;
}

function createSchoolRewards(base: QuestInfobox): Maybe<Record<School, string>> {
  const schoolRewards: Partial<Record<School, string>> = {};
  for (let i = 1; i <= MAX_REWARDS; i++) {
    const variesPerSchool = base[`vary${i}`];
    if (variesPerSchool === undefined) continue;

    for (const school of playableSchools) {
      const reward = base[`reward${i}${school.toLowerCase()}`];
      if (reward === undefined) break;

      schoolRewards[school] = reward;
    }
  }

  return Object.values(schoolRewards).length > 0
    ? schoolRewards as never // poo
    : undefined;
}
