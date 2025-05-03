import type { Infobox, Location, School, WikiObject } from "../common";

type WithFoundLocations<N extends number> = {
  readonly [K in NumberTypeRange<N> as `worldfound${K}`]?: string;
} & {
  readonly [K in NumberTypeRange<N> as `locationlist${K}`]?: string[];
};

type FishRarity = "Common" | "Rare" | "Epic" | "Seasonal";

export const MAX_FOUND_LOCATIONS = 20;
export interface FishInfobox extends Infobox, WithFoundLocations<typeof MAX_FOUND_LOCATIONS> {
  readonly school: School;
  readonly rank: number;
  readonly aquarium: string;
  readonly rarity: FishRarity;
  readonly minsize: number;
  readonly maxsize: number;
  readonly initialxp: number;
  readonly regularxp: number;
  readonly descrip: string;
  readonly holiday?: string;
  readonly sentinel?: boolean;
  readonly minsell: number;
  readonly minsellsize: number;
  readonly maxsell?: number;
  readonly maxsellsf: number;
  readonly maxsellwh: number;
  readonly maxsellsize?: number;
  readonly maxsellsfsize: number;
  readonly maxsellwhsize: number;
  readonly house?: boolean;
  readonly houselist?: string[];
}

interface PerFishRange {
  readonly minimum: number;
  readonly maximum?: number;
  readonly maximumSmallFry: number;
  readonly maximumWhopper: number;
}

export interface Fish extends WikiObject {
  readonly school: School;
  readonly rank: number;
  readonly aquarium: string;
  readonly rarity: FishRarity;
  readonly size: NumberRange;
  readonly initialXP: number;
  readonly regularXP: number;
  readonly description: string;
  readonly holidays?: string[];
  readonly sentinel: boolean;
  readonly sellPrice: PerFishRange;
  readonly sellSize: PerFishRange;
  readonly locations: Location[];
}