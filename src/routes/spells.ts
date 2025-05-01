import { getInfobox, parsePercent } from "../parsing";
import { isError } from "../utility";
import { APIResponse, ResponseCode } from "../types/common";
import type { FusionBase, Minion, Spell, SpellDescription, Spellement, SpellInfobox } from "../types/categories/spells";
import app from "../app";

app.get("/spells");
app.get("/spells/:spellName", async (req, res) => {
  const { spellName } = req.params;
  const infobox = await getInfobox<SpellInfobox>(`Spell:${spellName}`);
  const errored = isError(infobox);
  const result = errored ? infobox : createSpell(infobox);

  res
    .status(errored ? infobox.code : ResponseCode.Success)
    .json(new APIResponse(!errored, result));
});

function createSpell(base: SpellInfobox): Spell {
  const descriptions = createDescriptions(base);
  const minions = createMinions(base);
  const spellements = createSpellements(base);
  const fusionBases = createFusionBases(base);

  const enchantments = base.enchantment1 !== false
    ? [base.enchantment1, base.enchantment2, base.enchantment3]
      .filter((e): e is string => e !== undefined)
    : [];
  const prequests = [base.prequest1, base.prequest2, base.prequest3]
    .filter(e => e !== undefined);

  return {
    school: base.school,
    pipCost: base.pipcost,
    schoolPipCost: base.schoolpipcost,
    shadowPipCost: base.shadpipcost,
    accuracy: parsePercent(base.accuracy),
    type: base.type,
    type2: base.type2,
    type3: base.type3,
    subtype: base.subtype,
    pvp: base.PvP,
    pvpLevel: base.PvPlevel,
    maxCopies: base.maxcopies,
    descriptions,
    enchantments: enchantments.length > 0 ? enchantments : undefined,
    enchantable: base.enchantable,
    creatureOnly: base.creatureonly,
    polymorph: base.polymorph,
    requiredSpell: base.reqspell,
    prequests: prequests.length > 0 ? prequests : undefined,
    requiresTrainingPoint: base.trainpoint,
    minion: base.minion,
    minions: minions.length > 0 ? minions : undefined,
    spellwrightingLearnable: base.wrightinglearnable,
    spellwrighting: base.spellwrighting,
    wrightingTiers: base.wrightingtiers,
    tiersBranchAt: base.tiersbranchat,
    spellements: spellements.length > 0 ? spellements : undefined,
    fusionBases: fusionBases.length > 0 ? fusionBases : undefined
  };
}

function createDescriptions(base: SpellInfobox): SpellDescription[] {
  const descriptions: SpellDescription[] = [];
  if (base.descrip !== undefined)
    descriptions.push({ text: base.descrip })

  for (let i = 1; i <= 5; i++) {
    const text = base[`descrip${i}`] as string;
    const image = base[`dimage${i}`] as Maybe<string>;
    if (text === undefined) continue;

    descriptions.push({ text, image });
  }

  return descriptions;
}

function createMinions(base: SpellInfobox): Minion[] {
  const minions: Minion[] = [];
  for (let i = 1; i <= 14; i++) {
    const name = base[`minion${i}`] as Maybe<string>;
    if (name === undefined) continue;

    const pips = base[`minion${i}pips`] as Maybe<number>;
    const look = base[`minion${i}look`] as Maybe<string>;
    const rank = base[`minion${i}rank`] as Maybe<number>;
    const health = base[`minion${i}health`] as Maybe<number>;
    const hasExtraInfo = pips !== undefined
      && look !== undefined
      && rank !== undefined
      && health !== undefined;

    const minion: Minion = !hasExtraInfo
      ? { name }
      : {
        name,
        pips,
        look,
        rank,
        health
      };

    minions.push(minion);
  }

  return minions;
}

function createSpellements(base: SpellInfobox): Spellement[] {
  const spellements: Spellement[] = [];
  for (let i = 1; i <= 5; i++) {
    const baseCost = base[`spellements${i}`] as Maybe<number>;
    const costA = base[`spellements${i}a`] as Maybe<number>;
    const costB = base[`spellements${i}b`] as Maybe<number>;
    const noVariants = costA === undefined || costB === undefined;
    if (baseCost === undefined || noVariants) continue;

    const spellement: Spellement = noVariants
      ? { costA, costB }
      : { cost: baseCost! };

    spellements.push(spellement);
  }

  return spellements;
}

function createFusionBases(base: SpellInfobox): FusionBase[] {
  const fusionBases: FusionBase[] = [];
  for (let i = 1; i <= 6; i++) {
    const a = base[`fusionbase${i}a`] as Maybe<string>;
    const b = base[`fusionbase${i}b`] as Maybe<string>;
    if (a === undefined || b === undefined) continue;

    fusionBases.push({ a, b });
  }

  return fusionBases;
}