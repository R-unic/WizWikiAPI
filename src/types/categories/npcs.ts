import type { Trainer, TrainerInfobox } from "./base/trainer";
import type { Infobox, Location, WikiObject } from "../common";

export interface NPCInfobox extends Infobox {
  readonly descrip: string;
  readonly images: string[];
  readonly locations: string[];
  readonly titles?: string[];
  readonly givequests?: string[];
  readonly questgoals?: string[];
  readonly endquests?: string[];
}

export interface NPC extends WikiObject {
  readonly description: string;
  readonly images: string[];
  readonly locations: Location[];
  readonly titles?: string[];
  readonly givesQuests: string[];
  readonly questGoals: string[];
  readonly endsQuests: string[];
}