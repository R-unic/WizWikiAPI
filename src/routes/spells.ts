import { getInfobox, parsePercent, parsePerSchoolStat } from "../parsing";
import { isError } from "../utility";
import { APIResponse, InfoboxValue, ResponseCode } from "../types/common";
import { MAX_BACKLASH_ACTIONS, MAX_ENCHANTMENTS, MAX_MINIONS, type BranchedSpellement, type SpellType, type FusionBase, type Minion, type Spell, type Spellement, type SpellInfobox } from "../types/categories/spells";
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
  const enchantments = createEnchantments(base);
  const types = createTypes(base);
  const minions = createMinions(base);
  const spellements = createSpellements(base);
  const fusionBases = createFusionBases(base);
  const positiveBacklashActions = createPositiveBacklashActions(base);
  const negativeBacklashActions = createNegativeBacklashActions(base);

  return {
    school: base.school,
    pipCost: base.pipcost,
    schoolPipCost: base.schoolpipcost !== undefined
      ? parsePerSchoolStat(base.schoolpipcost)
      : undefined,
    shadowPipCost: base.shadpipcost,
    accuracy: parsePercent(base.accuracy),
    types,
    pvp: base.PvP,
    pvpLevel: base.PvPlevel,
    maxCopies: base.maxcopies,
    description: base.descrip,
    enchantments,
    enchantable: base.enchantable,
    creatureOnly: base.creatureonly,
    polymorph: base.polymorph,
    requiredSpell: base.reqspell,
    prequest: base.prequest1,
    cooldown: base.cooldown,
    retired: base.retired,
    canDiscard: base.discard,
    canReshuffle: base.reshuffle,
    disabled: base.disabled,
    beastmoon: base.beastmoon,
    given: base.givenspell,
    requiresTrainingPoint: base.trainpoint,
    pestRank: base.pestrank,
    minion: base["minion"] as Maybe<boolean>,
    minions,
    mutateName: base.mutatename,
    spellwrightingLearnable: base.wrightinglearnable,
    spellwrighting: base.spellwrighting,
    wrightingTiers: base.wrightingtiers,
    tiersBranchAt: base.tiersbranchat,
    firstBranch: base.firstbranch,
    spellements,
    fusionBases,
    positiveBacklashActions,
    negativeBacklashActions
  };
}

function createNegativeBacklashActions(base: SpellInfobox): Maybe<string[]> {
  const actions: string[] = [];
  for (let i = 1; i <= MAX_BACKLASH_ACTIONS; i++) {
    const action = base[`negbacklash${i}`];
    if (action === undefined) break;

    actions.push(action);
  }

  return actions.length > 0 ? actions : undefined;
}

function createPositiveBacklashActions(base: SpellInfobox): Maybe<string[]> {
  const actions: string[] = [];
  for (let i = 1; i <= MAX_BACKLASH_ACTIONS; i++) {
    const action = base[`posbacklash${i}`];
    if (action === undefined) break;

    actions.push(action);
  }

  return actions.length > 0 ? actions : undefined;
}

function createMinions(base: SpellInfobox): Maybe<Minion[]> {
  const minions: Minion[] = [];
  for (let i = 1; i <= MAX_MINIONS; i++) {
    const name = base[`minion${i}`] as Maybe<string>;
    if (name === undefined) break;

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
      : { name, pips, look, rank, health };

    minions.push(minion);
  }

  return minions.length > 0 ? minions : undefined;
}

function createSpellements(base: SpellInfobox): Maybe<Spellement[]> {
  const spellements: Spellement[] = [];
  for (let i = 1; i <= (base.wrightingtiers ?? 5); i++) {
    const baseCost = base[`spellements${i}`] as Maybe<number>;
    const baseLevel = base[`level${i}`] as Maybe<number>;
    const baseCopies = base[`copies${i}`] as Maybe<number>;
    const costA = base[`spellements${i}a`] as Maybe<number>;
    const costB = base[`spellements${i}b`] as Maybe<number>;
    const costC = base[`spellements${i}c`] as Maybe<number>;
    const levelA = base[`level${i}a`] as Maybe<number>;
    const levelB = base[`level${i}b`] as Maybe<number>;
    const levelC = base[`level${i}c`] as Maybe<number>;
    const copiesA = base[`copies${i}a`] as Maybe<number>;
    const copiesB = base[`copies${i}b`] as Maybe<number>;
    const copiesC = base[`copies${i}c`] as Maybe<number>;
    const noVariants = costA === undefined || costB === undefined;
    if (baseCost === undefined && noVariants) break;

    console.log(i, costA, costB, costC, baseCost)
    const spellement: Spellement = !noVariants
      ? {
        a: { cost: costA!, requiredLevel: levelA, copies: copiesA },
        b: { cost: costB!, requiredLevel: levelB, copies: copiesB },
        c: costC !== undefined
          ? { cost: costC!, requiredLevel: levelC, copies: copiesC }
          : undefined,
      } satisfies BranchedSpellement
      : {
        cost: baseCost!,
        requiredLevel: baseLevel,
        copies: baseCopies
      };

    spellements.push(spellement);
  }

  return spellements.length > 0 ? spellements : undefined;
}

function createFusionBases(base: SpellInfobox): Maybe<FusionBase[]> {
  const fusionBases: FusionBase[] = [];
  for (let i = 1; i <= 6; i++) {
    const a = base[`fusionbase${i}a`] as Maybe<string>;
    const b = base[`fusionbase${i}b`] as Maybe<string>;
    if (a === undefined || b === undefined) continue;

    fusionBases.push({ a, b });
  }

  return fusionBases.length > 0 ? fusionBases : undefined;
}

function createEnchantments(base: SpellInfobox): Maybe<string[]> {
  if (base["enchantment1"] as InfoboxValue === false) return;
  const enchantments: string[] = [];
  for (let i = 1; i <= MAX_ENCHANTMENTS; i++) {
    const name = base[`enchantment${i}`];
    if (name === undefined) break;

    enchantments.push(name);
  }

  return enchantments.length > 0 ? enchantments : undefined;
}

function createTypes(base: SpellInfobox): SpellType[] {
  const types: SpellType[] = [];
  for (let i = 1; i <= 3; i++) {
    const name = base[`type${i === 1 ? "" : i}`] as Maybe<string>;
    const subType = base[`subtype${i === 1 ? "" : i}`] as Maybe<string>;
    if (name === undefined) break;

    types.push({ name, subType });
  }

  return types;
}