import type { Infobox, Location, School, WikiObject } from "../common";

type WithItemFields<N extends number> = {
  readonly [K in NumberTypeRange<N> as `item${K}`]?: string;
};

type WithReagentFields<N extends number> = {
  readonly [K in NumberTypeRange<N> as `reagent${K}`]?: string;
} & {
  readonly [K in NumberTypeRange<N> as `reagentnum${K}`]?: number;
} & {
  readonly [K in NumberTypeRange<N> as `subreagents${K}`]?: string[];
};

type RecipeType =
  | "Item"
  | "House"
  | "Reagent"
  | "Recipe"
  | "Jewel"
  | "Mount"
  | "Snack"
  | "Spell"
  | "TreasureCard";

export const MAX_ITEMS = 30;
export const MAX_REAGENTS = 8;
export interface RecipeInfobox extends Infobox,
  WithItemFields<typeof MAX_ITEMS>,
  WithReagentFields<typeof MAX_REAGENTS> {
  readonly type: RecipeType;
  readonly school?: School;
  readonly limit?: number;
  readonly crrank?: string;
  readonly crstat: string;
  readonly crstat2?: string;
  readonly ctrank?: string;
  readonly pvprank?: string;
  readonly cooldown?: string;
  readonly badge?: string;
  readonly badge2?: string;
}

export interface RecipeReagent {
  readonly name: string;
  readonly amount: number;
  readonly alternatives?: string[];
}

export interface Recipe extends WikiObject {
  readonly type: RecipeType;
  readonly requiredSchool?: School;
  readonly limit?: number;
  readonly cooldown?: string;
  readonly requiredCantripRank?: string;
  readonly requiredPvpRank?: string;
  readonly requiredCraftingRank?: string;
  readonly craftingStations: string[];
  readonly requiredBadges?: string[];
  readonly items: string[];
  readonly reagents: RecipeReagent[];
}