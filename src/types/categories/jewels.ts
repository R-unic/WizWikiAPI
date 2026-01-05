import type { Infobox, Location, School, WikiObject } from "../common";
import { PetLevel } from "./pets";

type JewelType = "Amethyst" | "Citrine" | "Hematite" | "Jade" | "Opal" | "Onyx" | "Peridot" | "Ruby" | "Sapphire";
type JewelEffectType =
  | "Accurate"
  | "Archmastery"
  | "Blocking"
  | "Card"
  | "Critical"
  | "Damage"
  | "Defense"
  | "Energy"
  | "Fishing"
  | "Healing"
  | "Health"
  | "Mana"
  | "Maycast"
  | "Mending"
  | "PetAbility"
  | "Piercing"
  | "Pip"
  | "Resilient";

type PinEffectType =
  | "Accuracy"
  | "Armor Piercing"
  | "Critical"
  | "Critical Block"
  | "Damage"
  | "Outgoing Healing"
  | "Pip Conversion"
  | "Resistance";

type EffectType = JewelEffectType | PinEffectType;

interface BaseEffect {
  readonly type: EffectType;
  readonly school?: School
}

type Effect = BaseEffect & (
  | {
    readonly type: "Card" | "Maycast";
    readonly card: string;
  } | {
    readonly type: "PetAbility";
    readonly name: string;
  }
);

type JewelSocketType = "Square" | "Triangle" | "Circle" | "Tear" | "Star";
type PinSocketType = "Sword" | "Shield" | "Power";
type SocketType = JewelSocketType | PinSocketType;

type JewelQuality =
  | "Cracked"
  | "Chipped"
  | "Flawed"
  | "Blemished"
  | "Dull"
  | "Plain"
  | "Opaque"
  | "Clear"
  | "Polished"
  | "Lustrous"
  | "Shiny"
  | "Sparkling"
  | "Dazzling"
  | "Amazing"
  | "Flawless"
  | "Unearthly"
  | "Bright"

export interface JewelInfobox extends Infobox {
  readonly quality?: JewelQuality;
  readonly level?: number;
  readonly petlevel?: PetLevel;
  readonly socket: SocketType;
  readonly type: JewelType;
  readonly school?: School;
  readonly notschool?: School;
  readonly weavingschool?: School;
  readonly effectschool?: School;
  readonly effect: EffectType;
  readonly effectval: number | [number, number];
  readonly effectcard?: string;
  readonly petability?: string;
  readonly effect2: EffectType;
  readonly effectval2: number | [number, number];
  readonly petability2?: string;
  readonly shatterproof?: boolean;
  readonly sellprice?: number;
  readonly auction?: boolean;
  readonly ultra?: boolean;
  readonly altacquire?: string[];
  readonly altcategory?: string[];
  readonly fishchestlocations?: string[];
}

export interface Jewel extends WikiObject {
  readonly quality: number | JewelQuality;
  readonly socket: SocketType;
  readonly type: JewelType;
  readonly requiredSchool?: School;
  readonly excludedSchool?: School;
  readonly weavingSchool?: School;
  readonly effect: Effect;
  readonly effect2?: Effect;
  readonly shatterproof: boolean;
  readonly acquiredAtUltra: boolean;
  readonly auctionable: boolean;
  readonly sellPrice: number;
  readonly fishingChestLocations?: Location[];
  readonly altAcquisitions?: string[];
  readonly altCategories?: string[];
}