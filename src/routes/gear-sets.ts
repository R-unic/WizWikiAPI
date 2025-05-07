import { getInfobox, tryParsePercent } from "../parsing";
import { isError } from "../utility";
import { APIResponse, ResponseCode, School } from "../types/common";
import { type GearSet, type GearSetInfobox, type SetBonus, type SetBonusType, type SetTier, MAX_BONUSES, MAX_TIERS } from "../types/categories/gear-sets";
import app from "../app";

app.get("/gear-sets");
app.get("/gear-sets/:setName", async (req, res) => {
  const { setName } = req.params;
  const infobox = await getInfobox<GearSetInfobox>(`Set:${setName}`);
  const errored = isError(infobox);
  const result = errored ? infobox : createGearSet(infobox);

  res
    .status(errored ? infobox.code : ResponseCode.Success)
    .json(new APIResponse(!errored, result));
});

function createGearSet(base: GearSetInfobox): GearSet {
  const tiers = createTiers(base);

  return { tiers };
}

function createTiers(base: GearSetInfobox): SetTier[] {
  const tiers: SetTier[] = [];
  for (let i = 1; i <= MAX_TIERS; i++) {
    const itemsRequired = base[`tier${i}`];
    if (itemsRequired === undefined) break;

    const bonuses = createBonuses(base, i);
    tiers.push({ itemsRequired, bonuses });
  }

  return tiers;
}

function createBonuses(base: GearSetInfobox, tierNumber: number): SetBonus[] {
  const bonuses: SetBonus[] = [];
  for (let i = 1; i <= MAX_BONUSES; i++) {
    const type = base[`tier${tierNumber}btype${i}`] as Maybe<SetBonusType>;
    const stat = base[`tier${tierNumber}bstat${i}`] as Maybe<number | string>;
    const school = base[`tier${tierNumber}bsch${i}`] as Maybe<School>;
    const itemCardNumber = base[`tier${tierNumber}icnum${i}`];
    if (type === undefined) break;

    bonuses.push({
      type: type!,
      stat: typeof stat === "string" ? tryParsePercent(stat) ?? stat : stat!,
      school,
      itemCardNumber
    });
  }

  return bonuses;
}