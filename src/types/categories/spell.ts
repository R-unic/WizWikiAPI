import type { Infobox, School, WikiObject } from "../common";

export interface SpellInfobox extends Infobox {
  readonly school: School;
  readonly pipcost: number | "X";
  readonly schoolpipcost?: number;
  readonly shadpipcost?: number;
  readonly accuracy: string;
  readonly type: string;
  readonly type2?: string;
  readonly type3?: string;
  readonly subtype?: string;
  readonly mutatename?: string;
  readonly PvP?: boolean;
  readonly PvPlevel?: string;
  readonly maxcopies?: number;
  readonly descrip: string;
  readonly descrip1?: string;
  readonly dimage1?: string;
  readonly descrip2?: string;
  readonly dimage2?: string;
  readonly descrip3?: string;
  readonly dimage3?: string;
  readonly descrip4?: string;
  readonly dimage4?: string;
  readonly descrip5?: string;
  readonly dimage5?: string;
  readonly enchantment1?: false | string;
  readonly enchantment2?: string;
  readonly enchantment3?: string;
  readonly enchantable?: boolean;
  readonly creatureonly?: boolean;
  readonly polymorph?: string;
  readonly trainer1?: string;
  readonly trainer2?: string;
  readonly reqspell?: string;
  readonly prequest1?: string;
  readonly prequest2?: string;
  readonly prequest3?: string;
  readonly trainpoint?: boolean;
  readonly minion?: boolean;
  readonly minion1?: string;
  readonly minion1pips?: number;
  readonly minion1look?: string;
  readonly minion1rank?: number;
  readonly minion1health?: number;
  readonly minion2?: string;
  readonly minion2pips?: number;
  readonly minion2look?: string;
  readonly minion2rank?: number;
  readonly minion2health?: number;
  readonly minion3?: string;
  readonly minion3pips?: number;
  readonly minion3look?: string;
  readonly minion3rank?: number;
  readonly minion3health?: number;
  readonly minion4?: string;
  readonly minion4pips?: number;
  readonly minion4look?: string;
  readonly minion4rank?: number;
  readonly minion4health?: number;
  readonly minion5?: string;
  readonly minion5pips?: number;
  readonly minion5look?: string;
  readonly minion5rank?: number;
  readonly minion5health?: number;
  readonly minion6?: string;
  readonly minion6pips?: number;
  readonly minion6look?: string;
  readonly minion6rank?: number;
  readonly minion6health?: number;
  readonly minion7?: string;
  readonly minion7pips?: number;
  readonly minion7look?: string;
  readonly minion7rank?: number;
  readonly minion7health?: number;
  readonly minion8?: string;
  readonly minion8pips?: number;
  readonly minion8look?: string;
  readonly minion8rank?: number;
  readonly minion8health?: number;
  readonly minion9?: string;
  readonly minion9pips?: number;
  readonly minion9look?: string;
  readonly minion9rank?: number;
  readonly minion9health?: number;
  readonly minion10?: string;
  readonly minion10pips?: number;
  readonly minion10look?: string;
  readonly minion10rank?: number;
  readonly minion10health?: number;
  readonly minion11?: string;
  readonly minion11pips?: number;
  readonly minion11look?: string;
  readonly minion11rank?: number;
  readonly minion11health?: number;
  readonly minion12?: string;
  readonly minion12pips?: number;
  readonly minion12look?: string;
  readonly minion12rank?: number;
  readonly minion12health?: number;
  readonly minion13?: string;
  readonly minion13pips?: number;
  readonly minion13look?: string;
  readonly minion13rank?: number;
  readonly minion13health?: number;
  readonly minion14?: string;
  readonly minion14pips?: number;
  readonly minion14look?: string;
  readonly minion14rank?: number;
  readonly minion14health?: number;
  readonly wrightinglearnable?: boolean;
  readonly spellwrighting?: boolean;
  readonly wrightingtiers?: number;
  readonly tiersbranchat?: number;
  readonly spellements1?: number;
  readonly spellements2?: number;
  readonly spellements3?: number;
  readonly spellements4?: number;
  readonly spellements5?: number;
  readonly spellements2a?: number;
  readonly level2a?: string;
  readonly spellements2b?: number;
  readonly level2b?: string;
  readonly spellements3a?: number;
  readonly level3a?: string;
  readonly spellements3b?: number;
  readonly level3b?: string;
  readonly spellements4a?: number;
  readonly level4a?: string;
  readonly spellements4b?: number;
  readonly level4b?: string;
  readonly spellements5a?: number;
  readonly level5a?: string;
  readonly spellements5b?: number;
  readonly level5b?: string;
  readonly fusionbase1a?: string;
  readonly fusionbase1b?: string;
  readonly fusionbase2a?: string;
  readonly fusionbase2b?: string;
  readonly fusionbase3a?: string;
  readonly fusionbase3b?: string;
}

export interface SpellDescription {
  readonly text: string;
  readonly image?: string;
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
}

export interface TieredSpellement {
  readonly costA: number;
  readonly costB: number;
}

export type Spellement = SimpleSpellement | TieredSpellement;

export interface FusionBase {
  readonly a: string;
  readonly b: string;
}

export interface Spell extends WikiObject {
  readonly school: School;
  readonly pipCost: number | "X";
  readonly schoolPipCost?: number;
  readonly shadowPipCost?: number;
  readonly accuracy: number;
  readonly type: string;
  readonly type2?: string;
  readonly type3?: string;
  readonly subtype?: string;
  readonly pvp?: boolean;
  readonly pvpLevel?: string;
  readonly maxCopies?: number;
  readonly descriptions: SpellDescription[];
  readonly enchantments?: string[];
  readonly enchantable?: boolean;
  readonly creatureOnly?: boolean;
  readonly polymorph?: string;
  readonly requiredSpell?: string;
  readonly prequests?: string[];
  readonly requiresTrainingPoint?: boolean;
  readonly minion?: boolean;
  readonly minions?: Minion[];
  readonly spellwrightingLearnable?: boolean;
  readonly spellwrighting?: boolean;
  readonly wrightingTiers?: number;
  readonly tiersBranchAt?: number;
  readonly spellements?: Spellement[];
  readonly fusionBases?: FusionBase[];
}