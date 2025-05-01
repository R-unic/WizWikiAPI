import { getInfobox } from "../parsing";
import { isError } from "../utility";
import { createVendor } from "../types/categories/base/vendor";
import { createTrainer } from "../types/categories/base/trainer";
import { APIResponse, Location } from "../types/common";
import type { NPC, NPCInfobox } from "../types/categories/npcs";
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

  res.json(new APIResponse(!errored, result));
});

function createNPC(base: NPCInfobox): NPC {
  return {
    titles: base.titles,
    images: base.images,
    description: base.descrip,
    locations: base.locations.map(lexeme => new Location(lexeme)),
    givesQuests: base.givequests ?? [],
    questGoals: base.questgoals ?? [],
    endsQuests: base.endquests ?? []
  };
}