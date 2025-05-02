import type { Infobox, InfoboxValue, Location, School, WikiObject, WithFishingChestLocations } from "../common";

export type WithFoundWorlds<N extends number> = {
  [K in NumberTypeRange<N> as `wrldfound${K}`]?: string;
} & {
  [K in NumberTypeRange<N> as `rarewrldfound${K}`]?: string;
};

type WithFoundLocations<N1 extends number, N2 extends number> = {
  readonly [K1 in NumberTypeRange<N1> as K1 extends number
  ? (
    NumberTypeRange<N2> extends infer K2Union
    ? K2Union extends number
    ? `locfound${K1}-${K2Union}`
    : never
    : never
  )
  : never]?: InfoboxValue;
} & {
  readonly [K1 in NumberTypeRange<N1> as K1 extends number
  ? (
    NumberTypeRange<N2> extends infer K2Union
    ? K2Union extends number
    ? `rarelocfound${K1}-${K2Union}`
    : never
    : never
  )
  : never]?: InfoboxValue;
};

export const MAX_FISHING_CHEST_LOCATIONS = 80;
export const MAX_FOUND_LOCATIONS = 20;
export interface ReagentInfobox extends Infobox,
  WithFishingChestLocations<typeof MAX_FISHING_CHEST_LOCATIONS>,
  WithFoundWorlds<typeof MAX_FOUND_LOCATIONS>,
  WithFoundLocations<typeof MAX_FOUND_LOCATIONS, typeof MAX_FOUND_LOCATIONS> {
  readonly rank: number;
  readonly school: School;
  readonly auction: boolean;
  readonly trade: boolean;
  readonly descrip: string;
  readonly harvestType: "Normal" | "Rare" | "Both";
  readonly altrareharvest1?: string;
  readonly altrareharvest2?: string;
  readonly altnormharvest1?: string;
  readonly altnormharvest2?: string;
  readonly maxbazaar?: number;
  readonly sellprice?: number;
  readonly notes?: string;
  readonly altacquire?: string[];
  readonly altcategory?: string[];
}

export interface Reagent extends WikiObject {
  readonly rank: number;
  readonly school: School;
  readonly auctionable: boolean;
  readonly canTrade: boolean;
  readonly description: string;
  readonly harvestType: "Normal" | "Rare" | "Both";
  readonly rareHarvestVariants?: string[];
  readonly normalHarvestVariants?: string[];
  readonly maxBazaarPrice?: number;
  readonly vendorSellPrice?: number;
  readonly notes?: string;
  readonly altAcquisitions?: string[]
  readonly altCategories?: string[]
}