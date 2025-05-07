import type { Infobox, InfoboxValue, School, WikiObject } from "../common";

export type SetBonusType =
  | "Health"
  | "Mana"
  | "Energy"
  | "Pipch"
  | "Shadpip"
  | "Accuracy"
  | "Critical"
  | "Critblock"
  | "Damage"
  | "Resist"
  | "Stunresist"
  | "Armpierce"
  | "Pipconvert"
  | "Incoming"
  | "Outgoing"
  | "Card"
  | "Speed"
  | "Other";

export type WithTiers<N extends number> = {
  [K in NumberTypeRange<N> as `tier${K}`]?: number;
};

export type WithTierBonuses<N1 extends number, N2 extends number> = {
  readonly [K1 in NumberTypeRange<N1> as K1 extends number
  ? (
    NumberTypeRange<N2> extends infer K2Union
    ? K2Union extends number
    ? `tier${K1}btype${K2Union}`
    : never
    : never
  )
  : never]?: InfoboxValue;
} & {
  readonly [K1 in NumberTypeRange<N1> as K1 extends number
  ? (
    NumberTypeRange<N2> extends infer K2Union
    ? K2Union extends number
    ? `tier${K1}bstat${K2Union}`
    : never
    : never
  )
  : never]?: InfoboxValue;
} & {
  readonly [K1 in NumberTypeRange<N1> as K1 extends number
  ? (
    NumberTypeRange<N2> extends infer K2Union
    ? K2Union extends number
    ? `tier${K1}bsch${K2Union}`
    : never
    : never
  )
  : never]?: InfoboxValue;
} & {
  readonly [K1 in NumberTypeRange<N1> as K1 extends number
  ? (
    NumberTypeRange<N2> extends infer K2Union
    ? K2Union extends number
    ? `tier${K1}icnum${K2Union}`
    : never
    : never
  )
  : never]?: InfoboxValue;
}

export const MAX_TIERS = 5;
export const MAX_BONUSES = 3;
export interface GearSetInfobox extends Infobox,
  WithTiers<typeof MAX_TIERS>,
  WithTierBonuses<typeof MAX_TIERS, typeof MAX_BONUSES> {
  readonly school: School | "Any";
}

export interface SetBonus {
  readonly type: SetBonusType;
  readonly stat: number | string;
  readonly school?: School;
  readonly itemCardNumber?: number;
}

export interface SetTier {
  readonly itemsRequired: number;
  readonly bonuses: SetBonus[];
}

export interface GearSet extends WikiObject {
  readonly tiers: SetTier[];
}