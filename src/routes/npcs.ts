import { getInfobox } from "../parsing";
import { isError } from "../utility";
import { createVendor } from "../types/categories/base/vendor";
import { createTrainer } from "../types/categories/base/trainer";
import { APIResponse, Location, ResponseCode, type School } from "../types/common";
import { MAX_BONUSES, type NPC, type NPCBonus, type NPCInfobox } from "../types/categories/npcs";
import app from "../app";

app.get("/npcs");
app.get("/npcs/:npcName", async (req, res) => {
  const { npcName } = req.params;
  const infobox = await getInfobox<NPCInfobox>(`NPC:${npcName}`);
  const errored = isError(infobox);
  if (errored)
    return void res.json(new APIResponse(!errored, infobox));

  let result = createNPC(infobox);
  if ("vendor" in infobox)
    result = Object.assign(result, createVendor(infobox as never));
  if ("trainer" in infobox)
    result = Object.assign(result, createTrainer(infobox as never));

  res
    .status(errored ? infobox.code : ResponseCode.Success)
    .json(new APIResponse(!errored, result));
});

function createNPC(base: NPCInfobox): NPC {
  const bonuses = createBonuses(base);

  return {
    titles: base.titles,
    images: base.images,
    description: base.descrip,
    locations: base.locations.map(lexeme => new Location(lexeme)),
    givesQuests: base.givequests ?? [],
    questGoals: base.questgoals ?? [],
    endsQuests: base.endquests ?? [],
    holidays: base.holidays,
    trainer: base.trainer,
    vendor: base.vendor,
    ally: base.ally,
    bonuses
  };
}

function createBonuses(base: NPCInfobox): Maybe<NPCBonus[]> {
  const bonuses: NPCBonus[] = [];
  for (let i = 1; i <= MAX_BONUSES; i++) {
    const type = base[`bonustype${i}`] as Maybe<string>;
    const school = base[`bonusschool${i}`] as Maybe<string>;
    const value = base[`bonusvalue${i}`] as string | number;
    const itemCardNumber = base[`bonusicnum${i}`] as Maybe<number>;
    const note = base[`bonusnote${i}`] as Maybe<string>;
    if (type === undefined) break;

    bonuses.push({ type, school: school === "Any" ? undefined : school as School, value, itemCardNumber, note });
  }

  return bonuses.length > 0 ? bonuses : undefined;
}