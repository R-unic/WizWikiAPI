import type { Infobox, Location, School, WikiObject } from "../common";

type SnackClass = "Fruit" | "Vegetable" | "Meal" | "Munchie" | "Candy" | "Dessert" | "Cereal";
export interface SnackInfobox extends Infobox {
  readonly value: number;
  readonly school: School;
  readonly class: SnackClass;
  readonly strength?: number;
  readonly agility?: number;
  readonly will?: number;
  readonly intellect?: number;
  readonly power?: number;
  readonly sellval?: number;
  readonly sell?: boolean;
  readonly auction?: boolean;
  readonly fishchestlocations?: string[];
  readonly altacquire?: string[];
  readonly altcategory?: string[];
}

interface SnackStats {
  readonly strength: number;
  readonly agility: number;
  readonly will: number;
  readonly intellect: number;
  readonly power: number;
}

export interface Snack extends WikiObject {
  readonly rank: number;
  readonly school: School;
  readonly class: SnackClass;
  readonly stats: Partial<SnackStats>;
  readonly auctionable?: boolean;
  readonly fishingChestLocations?: Location[];
  readonly altAcquisitions?: string[];
  readonly altCategories?: string[];
  readonly canSell: boolean;
  readonly sellPrice?: number;
}