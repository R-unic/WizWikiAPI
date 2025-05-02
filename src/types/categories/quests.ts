import type { Infobox, InfoboxValue, Location, School, WikiObject } from "../common";

type WithPrequestFields<N extends number> = {
  readonly [K in NumberTypeRange<N> as `prequest${K}`]?: string;
};

type WithPostquestFields<N extends number> = {
  readonly [K in NumberTypeRange<N> as `postquest${K}`]?: string;
} & {
  readonly [K in NumberTypeRange<N> as `postquest${K}mod`]?: string;
};

type WithGoalFields<N1 extends number, N2 extends number> = {
  readonly [K1 in NumberTypeRange<N1> as K1 extends number
  ? (
    NumberTypeRange<N2> extends infer K2Union
    ? K2Union extends number
    ? `goal${K1}-${K2Union}`
    : never
    : never
  )
  : never]?: InfoboxValue;
};

type WithRewardFields<N extends number> = {
  readonly [K in NumberTypeRange<N> as `reward${K}`]?: string;
} & {
  readonly [K in NumberTypeRange<N> as `reward${K}type`]?: string;
} & {
  readonly [K in NumberTypeRange<N> as `reward${K}amount`]?: string;
} & {
  readonly [K in NumberTypeRange<N> as `reward${K}ice`]?: string;
} & {
  readonly [K in NumberTypeRange<N> as `reward${K}fire`]?: string;
} & {
  readonly [K in NumberTypeRange<N> as `reward${K}storm`]?: string;
} & {
  readonly [K in NumberTypeRange<N> as `reward${K}life`]?: string;
} & {
  readonly [K in NumberTypeRange<N> as `reward${K}death`]?: string;
} & {
  readonly [K in NumberTypeRange<N> as `reward${K}myth`]?: string;
} & {
  readonly [K in NumberTypeRange<N> as `reward${K}balance`]?: string;
} & {
  readonly [K in NumberTypeRange<N> as `vary${K}`]?: boolean;
};

export const MAX_PREQUESTS = 5;
export const MAX_POSTQUESTS = 16;
export const MAX_GOALS = 30;
export const MAX_SUB_GOALS = 16;
export const MAX_REWARDS = 9;
export interface QuestInfobox extends Infobox,
  WithPrequestFields<typeof MAX_PREQUESTS>,
  WithPostquestFields<typeof MAX_POSTQUESTS>,
  WithGoalFields<typeof MAX_GOALS, typeof MAX_SUB_GOALS>,
  WithRewardFields<typeof MAX_REWARDS> {
  readonly prelevel: number;
  readonly autostart?: string;
  readonly giver: string;
  readonly giverwld: string;
  readonly giverloc: string;
  readonly school?: School;
  readonly weavingschool?: School;
  readonly storyline: boolean;
  readonly instance: boolean;
  readonly handin: string;
  readonly rewgold?: number;
  readonly rewxp?: number;
  readonly rewtp?: number;
  readonly rewpot?: number;
  readonly rewcrslot?: number;
  readonly imagenum: number;
  readonly schdialogue?: string;
  readonly dialogue?: string;
  readonly guidetab?: string;
  readonly postrewardmod?: string;
  readonly holiday?: string;
  readonly gardening?: boolean;
  readonly fishing?: boolean;
  readonly crafting?: boolean;
  readonly retired?: boolean;
  // readonly allowsspellwrightinglearning?: boolean;
  readonly badge?: string;
  readonly badge2?: string;
  readonly badge3?: string;
}

interface QuestGiver {
  readonly name: string;
  readonly location: Location;
}

interface QuestRewards {
  readonly gold?: number;
  readonly xp?: number;
  readonly trainingPoints?: number;
  readonly potions?: number;
  readonly craftingSlots?: number;
}

export interface Postquest {
  readonly name: string;
  readonly mod?: string;
}

export interface QuestGoal {
  readonly description: string;
  readonly subGoals?: string[];
}

export interface Quest extends WikiObject {
  readonly levelRequirement: number;
  readonly autoStart?: string;
  readonly giver: QuestGiver;
  readonly handIn: string;
  readonly storyline: boolean;
  readonly instance: boolean;
  readonly holiday?: string;
  readonly fishing?: boolean;
  readonly gardening?: boolean;
  readonly crafting?: boolean;
  readonly retired?: boolean;
  readonly guideTabContents?: string;
  readonly dialogue?: string;
  readonly schoolDialogue?: string;
  readonly rewards: QuestRewards;
  readonly imageNumber: number;
  readonly awardsBadges?: string[];
  readonly prequests: string[];
  readonly goals: QuestGoal[];
  readonly postquests: Postquest[];
  readonly requiredSchool?: School;
  readonly requiredWeavingSchool?: School;
}