import type { Infobox, PerSchoolStat, School, WikiObject } from "../common";

type WithEnchantmentFields<N extends number> = {
  readonly [K in NumberTypeRange<N> as `enchantment${K}`]?: string;
};

type WithTrainingPointVaryFields<N extends number> = {
  readonly [K in NumberTypeRange<N> as `tpvary${K}`]?: School;
};

type WithMinionFields<N extends number> = {
  readonly [K in NumberTypeRange<N> as `minion${K}`]?: string;
} & {
  readonly [K in NumberTypeRange<N> as `minion${K}pips`]?: number;
} & {
  readonly [K in NumberTypeRange<N> as `minion${K}look`]?: string;
} & {
  readonly [K in NumberTypeRange<N> as `minion${K}rank`]?: number;
} & {
  readonly [K in NumberTypeRange<N> as `minion${K}health`]?: number;
};

type WithBacklashFields<N extends number> = {
  readonly [K in NumberTypeRange<N> as `posbacklash${K}`]?: string;
} & {
  readonly [K in NumberTypeRange<N> as `negbacklash${K}`]?: string;
};

export const MAX_ENCHANTMENTS = 10;
export const MAX_TP_VARIES = 4;
export const MAX_MINIONS = 15;
export const MAX_BACKLASH_ACTIONS = 10;
export interface SpellInfobox extends Infobox,
  WithEnchantmentFields<typeof MAX_ENCHANTMENTS>,
  WithTrainingPointVaryFields<typeof MAX_TP_VARIES>,
  WithMinionFields<typeof MAX_MINIONS>,
  WithBacklashFields<typeof MAX_BACKLASH_ACTIONS> {
  readonly school: School;
  readonly pipcost: number | "X";
  readonly schoolpipcost?: string[];
  readonly shadpipcost?: number;
  readonly cooldown?: number,
  readonly accuracy: string;
  readonly type: string;
  readonly type2?: string;
  readonly type3?: string;
  readonly subtype?: string;
  readonly subtype2?: string;
  readonly subtype3?: string;
  readonly mutatename?: string;
  readonly PvP?: boolean;
  readonly PvPlevel?: string;
  readonly maxcopies?: number;
  readonly pestrank?: number;
  readonly retired?: boolean;
  readonly discard?: boolean;
  readonly reshuffle?: boolean;
  readonly disabled?: boolean;
  readonly beastmoon?: boolean;
  readonly givenspell?: boolean;
  readonly trainpoint?: boolean | "Vary" | "Bought";
  readonly descrip?: string;
  readonly enchantable?: boolean;
  readonly creatureonly?: boolean;
  readonly polymorph?: string;
  readonly trainer1?: string;
  readonly trainer2?: string;
  readonly reqspell?: string;
  readonly prequest1?: string;
  readonly battlecardimage?: boolean;
  readonly altani?: boolean;
  readonly wrightinglearnable?: boolean;
  readonly spellwrighting?: boolean;
  readonly wrightingtiers?: number;
  readonly tiersbranchat?: number;
  readonly firstbranch?: number;
  readonly upgradeof?: string;
  readonly spellements1?: number;
  readonly spellements2?: number;
  readonly spellements3?: number;
  readonly spellements4?: number;
  readonly spellements5?: number;
  readonly level1?: string;
  readonly level2?: string;
  readonly level3?: string;
  readonly level4?: string;
  readonly level5?: string;
  readonly copies1?: string;
  readonly copies2?: string;
  readonly copies3?: string;
  readonly copies4?: string;
  readonly copies5?: string;
  readonly spellements2a?: number;
  readonly level2a?: string;
  readonly copies2a?: string;
  readonly spellements2b?: number;
  readonly level2b?: string;
  readonly copies2b?: string;
  readonly spellements2c?: number;
  readonly level2c?: string;
  readonly copies2c?: string;
  readonly spellements3a?: number;
  readonly level3a?: string;
  readonly copies3a?: string;
  readonly spellements3b?: number;
  readonly level3b?: string;
  readonly copies3b?: string;
  readonly spellements3c?: number;
  readonly level3c?: string;
  readonly copies3c?: string;
  readonly spellements4a?: number;
  readonly level4a?: string;
  readonly copies4a?: string;
  readonly spellements4b?: number;
  readonly level4b?: string;
  readonly copies4b?: string;
  readonly spellements4c?: number;
  readonly level4c?: string;
  readonly copies4c?: string;
  readonly spellements5a?: number;
  readonly level5a?: string;
  readonly copies5a?: string;
  readonly spellements5b?: number;
  readonly level5b?: string;
  readonly copies5b?: string;
  readonly spellements5c?: number;
  readonly level5c?: string;
  readonly copies5c?: string;
  readonly fusionbase1a?: string;
  readonly fusionbase1b?: string;
  readonly fusionbase2a?: string;
  readonly fusionbase2b?: string;
  readonly fusionbase3a?: string;
  readonly fusionbase3b?: string;
}

export interface MinionInfo {
  readonly name: string;
}

export interface ExtraMinionInfo {
  readonly pips: number;
  readonly look: string;
  readonly rank: number;
  readonly health: number;
}

export type Minion = MinionInfo | (MinionInfo & ExtraMinionInfo);

export interface SimpleSpellement {
  readonly cost: number;
  readonly requiredLevel?: number;
  readonly copies?: number;
}

export interface BranchedSpellement {
  readonly a: SimpleSpellement;
  readonly b: SimpleSpellement;
  readonly c?: SimpleSpellement;
}

export type Spellement = SimpleSpellement | BranchedSpellement;

export interface FusionBase {
  readonly a: string;
  readonly b: string;
}

export interface SpellType {
  readonly name: string;
  readonly subType?: string;
}

export interface Spell extends WikiObject {
  readonly school: School;
  readonly pipCost: number | "X";
  readonly schoolPipCost?: PerSchoolStat;
  readonly shadowPipCost?: number;
  readonly accuracy: number;
  readonly types: SpellType[];
  readonly cooldown?: number;
  readonly pestRank?: number;
  readonly pvp?: boolean;
  readonly pvpLevel?: string;
  readonly maxCopies?: number;
  readonly description?: string;
  readonly mutateName?: string;
  readonly enchantments?: string[];
  readonly enchantable?: boolean;
  readonly creatureOnly?: boolean;
  readonly retired?: boolean;
  readonly canDiscard?: boolean;
  readonly canReshuffle?: boolean;
  readonly disabled?: boolean;
  readonly beastmoon?: boolean;
  readonly given?: boolean;
  readonly polymorph?: string;
  readonly requiredSpell?: string;
  readonly prequest?: string;
  readonly requiresTrainingPoint?: boolean | "Vary" | "Bought";
  readonly minion?: boolean;
  readonly minions?: Minion[];
  readonly altAnimation?: boolean;
  readonly battleCardImage?: boolean;
  readonly spellwrightingLearnable?: boolean;
  readonly spellwrighting?: boolean;
  readonly wrightingTiers?: number;
  readonly tiersBranchAt?: number;
  readonly firstBranch?: number;
  readonly spellements?: Spellement[];
  readonly fusionBases?: FusionBase[];
  readonly positiveBacklashActions?: string[];
  readonly negativeBacklashActions?: string[];
}