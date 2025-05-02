import type { Infobox, Location, School, WikiObject } from "../common";

type WithBonuses<N extends number> = {
  [K in NumberTypeRange<N> as `bonustype${K}`]?: string;
} & {
  [K in NumberTypeRange<N> as `bonusschool${K}`]?: School;
} & {
  [K in NumberTypeRange<N> as `bonusvalue${K}`]?: string | number;
} & {
  [K in NumberTypeRange<N> as `bonusicnum${K}`]?: number;
} & {
  [K in NumberTypeRange<N> as `bonusnote${K}`]?: string;
};

export const MAX_BONUSES = 3;
export interface NPCInfobox extends Infobox, WithBonuses<typeof MAX_BONUSES> {
  readonly descrip: string;
  readonly images: string[];
  readonly locations: string[];
  readonly holidays: string[];
  readonly titles?: string[];
  readonly givequests?: string[];
  readonly questgoals?: string[];
  readonly endquests?: string[];
  readonly questseparator?: string;
  readonly dialogue?: string;
  readonly vendor?: boolean;
  readonly trainer?: boolean;
  readonly ally?: boolean;
}

export interface NPCBonus {
  readonly type: string;
  readonly school?: School;
  readonly value: string | number;
  readonly itemCardNumber?: number;
  readonly note?: string;
}

export interface NPC extends WikiObject {
  readonly description: string;
  readonly images: string[];
  readonly locations: Location[];
  readonly bonuses: NPCBonus[];
  readonly holidays?: string[];
  readonly titles?: string[];
  readonly givesQuests: string[];
  readonly questGoals: string[];
  readonly endsQuests: string[];
  readonly dialogue?: string;
  readonly vendor?: boolean;
  readonly trainer?: boolean;
  readonly ally?: boolean;
}