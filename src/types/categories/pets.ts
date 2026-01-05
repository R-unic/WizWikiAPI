import type { Infobox, WikiObject } from "../common";

export type PetLevel = "Baby" | "Teen" | "Adult" | "Ancient" | "Epic" | "Mega" | "Ultra";

export const MAX_UNLOCK_COSTS = 4;
export interface PetInfobox extends Infobox {

}

export interface Pet extends WikiObject {

}