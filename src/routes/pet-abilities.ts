import { getInfobox } from "../parsing";
import { isError } from "../utility";
import { APIResponse, ResponseCode } from "../types/common";
import { MAX_UNLOCK_COSTS, type PetAbility, type PetAbilityInfobox } from "../types/categories/pet-abilities";
import app from "../app";

app.get("/pet-abilities");
app.get("/pet-abilities/:petAbilityName", async (req, res) => {
  const { petAbilityName } = req.params;
  const infobox = await getInfobox<PetAbilityInfobox>(`PetAbility:${petAbilityName}`);
  const errored = isError(infobox);
  const result = errored ? infobox : createPetAbility(infobox);

  res
    .status(errored ? infobox.code : ResponseCode.Success)
    .json(new APIResponse(!errored, result));
});

function createPetAbility(base: PetAbilityInfobox): PetAbility {
  const unlockCosts = createUnlockCosts(base);
  const hasBonus = base.bonusgold !== undefined
    || base.bonuscards !== undefined
    || base.bonusdropnotes !== undefined
    || base.bonuselixirs !== undefined
    || base.bonushousing !== undefined
    || base.bonusjewels !== undefined
    || base.bonusreagents !== undefined
    || base.bonusseeds !== undefined
    || base.bonussnacks !== undefined
    || base.bonusspellements !== undefined;

  return {
    type: base.type,
    rarity: base.rarity,
    manifest: base.manifest ?? false,
    retired: base.retired,
    locked: base.locked,
    healCast: base.healcast,
    fishCast: base.fishcast,
    gardenCast: base.gardencast,
    trigger: base.trigger,
    happinessCost: base.happcost,
    unlockCosts,
    talent: base.taltype !== undefined
      ? {
        school: base.talschool!,
        type: base.taltype,
        card: base.talcard,
        cardMod: base.talcardmod,
        adventureInfo: base.taladventure,
        cooldown: base.talcool,
        strength: base.talstr,
        intellect: base.talint,
        will: base.talwill,
        agility: base.talagil,
        power: base.talpow,
        other: base.talother,
      }
      : undefined,
    derby: base.derbyeff !== undefined
      ? {
        effect: base.derbyeff,
        cooldown: base.derbycool!,
        duration: base.derbydur,
      }
      : undefined,
    bonus: hasBonus
      ? {
        gold: base.bonusgold,
        dropNotes: base.bonusdropnotes,
        housing: base.bonushousing,
        cards: base.bonuscards,
        reagents: base.bonusreagents,
        spellements: base.bonusspellements,
        snacks: base.bonussnacks,
        jewels: base.bonusjewels,
        seeds: base.bonusseeds,
        elixirs: base.bonuselixirs
      }
      : undefined
  };
}

function createUnlockCosts(base: PetAbilityInfobox): Maybe<Record<string, number>> {
  const unlockCosts: Record<string, number> = {};
  for (let i = 1; i <= MAX_UNLOCK_COSTS; i++) {
    const reagent = base[`unlockreagent${i}`];
    const cost = base[`unlockcost${i}`];
    if (reagent === undefined || cost === undefined) break;

    unlockCosts[reagent] = cost;
  }

  return Object.values(unlockCosts).length > 0 ? unlockCosts : undefined;
}