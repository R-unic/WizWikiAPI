import type { Infobox, School, WikiObject } from "../common";

type WithUnlockCosts<N extends number> = {
  readonly [K in NumberTypeRange<N> as `unlockcost${K}`]?: number;
} & {
  readonly [K in NumberTypeRange<N> as `unlockreagent${K}`]?: string;
};

type PetAbilityType = "Talent" | "Derby";
type PetAbilityRarity = "Common" | "Uncommon" | "Rare" | "Ultra-Rare" | "Epic";
type PetTalentType =
  | "Health"
  | "Mana"
  | "Accuracy"
  | "Damage"
  | "Power Pip"
  | "Resist"
  | "Card"
  | "Cast"
  | "Attribute"
  | "Armor Piercing"
  | "Critical"
  | "Critical Block"
  | "Incoming Heal"
  | "Outgoing Heal"
  | "Stun Resistance"
  | "Fishing Luck"
  | "Energy"
  | "Pip Conversion"
  | "Combat"
  | "Adventure"
  | "Other";

export const MAX_UNLOCK_COSTS = 4;
export interface PetAbilityInfobox extends Infobox, WithUnlockCosts<typeof MAX_UNLOCK_COSTS> {
  readonly retired?: boolean;
  readonly type: PetAbilityType;
  readonly rarity: PetAbilityRarity;
  readonly manifest?: boolean;
  readonly taltype?: PetTalentType;
  readonly talschool?: School;
  readonly talcard?: string;
  readonly talcardmod?: string;
  readonly healcast?: boolean;
  readonly fishcast?: boolean;
  readonly gardencast?: boolean;
  readonly trigger?: string;
  readonly taladventure?: string;
  readonly locked?: boolean;
  readonly happcost?: number;
  readonly talcool?: number;
  readonly talother?: string;
  readonly talstr?: number;
  readonly talint?: number;
  readonly talagil?: number;
  readonly talwill?: number;
  readonly talpow?: number;
  readonly bonusgold?: number;
  readonly bonusdropnotes?: string;
  readonly bonushousing?: string[];
  readonly bonuscards?: string[];
  readonly bonusreagents?: string[];
  readonly bonusspellements?: string[];
  readonly bonussnacks?: string[];
  readonly bonusjewels?: string[];
  readonly bonusseeds?: string[];
  readonly bonuselixirs?: string[];
  readonly derbyeff?: string;
  readonly derbydur?: number;
  readonly derbycool?: number;
}

interface PetAbilityBonus {
  readonly gold?: number;
  readonly dropNotes?: string;
  readonly housing?: string[];
  readonly cards?: string[];
  readonly reagents?: string[];
  readonly spellements?: string[];
  readonly snacks?: string[];
  readonly jewels?: string[];
  readonly seeds?: string[];
  readonly elixirs?: string[];
}

interface PetAbilityTalentInfo {
  readonly type: PetTalentType;
  readonly school?: School;
  readonly card?: string;
  readonly cardMod?: string;
  readonly adventureInfo?: string;
  readonly cooldown?: number;
  readonly strength?: number;
  readonly intellect?: number;
  readonly will?: number;
  readonly agility?: number;
  readonly power?: number;
  readonly other?: string;
}

interface PetAbilityDerbyInfo {
  readonly effect: string;
  readonly duration?: number;
  readonly cooldown: number;
}

export interface PetAbility extends WikiObject {
  readonly retired?: boolean;
  readonly type: PetAbilityType;
  readonly rarity: PetAbilityRarity;
  readonly manifest: boolean;
  readonly locked?: boolean;
  readonly healCast?: boolean;
  readonly fishCast?: boolean;
  readonly gardenCast?: boolean;
  readonly trigger?: string;
  readonly talent?: PetAbilityTalentInfo;
  readonly derby?: PetAbilityDerbyInfo;
  readonly bonus?: PetAbilityBonus;
  readonly happinessCost?: number;
  readonly unlockCosts?: Record<string, number>;
}