import type { Infobox, WikiObject } from "../../common";

export function createVendor(base: VendorInfobox): Vendor {
  return {
    crafter: base.crafter,
    holiday: base.holiday,
    bundles: base.bundles,
    customOrder: base.customorder,
    sells: {
      hats: base.hats,
      robes: base.robes,
      boots: base.boots,
      wands: base.wands,
      athames: base.athames,
      amulets: base.amulets,
      rings: base.rings,
      decks: base.decks,
      pets: base.pets,
      mounts: base.mounts,
      elixirs: base.elixirs,
      castles: base.castles,
      castleBlocks: base.castleblocks,
      plantLife: base.plantlife,
      wallHangings: base.wallhangings,
      wallpaperAndTile: base.wallpaperandtile,
      outdoor: base.outdoor,
      furniture: base.furniture,
      decorations: base.decorations,
      musicScrolls: base.musicscrolls,
      reagents: base.reagents,
      spells: base.spells,
      packs: base.packs,
      giftCards: base.giftcards,
      treasureCards: base.treasurecards,
      snacks: base.snacks,
      jewels: base.jewels,
      seeds: base.seeds
    }
  };
}

export interface VendorInfobox extends Infobox {
  readonly world: string[];
  readonly crafter?: boolean;
  readonly holiday?: boolean;
  readonly bundles?: string[];
  readonly customorder?: string[];
  readonly hats?: string[];
  readonly robes?: string[];
  readonly boots?: string[];
  readonly wands?: string[];
  readonly athames?: string[];
  readonly amulets?: string[];
  readonly rings?: string[];
  readonly pets?: string[];
  readonly mounts?: string[];
  readonly decks?: string[];
  readonly elixirs?: string[];
  readonly castles?: string[];
  readonly castleblocks?: string[];
  readonly plantlife?: string[];
  readonly wallhangings?: string[];
  readonly wallpaperandtile?: string[];
  readonly outdoor?: string[];
  readonly furniture?: string[];
  readonly decorations?: string[];
  readonly musicscrolls?: string[];
  readonly seeds?: string[];
  readonly snacks?: string[];
  readonly reagents?: string[];
  readonly jewels?: string[];
  readonly treasurecards?: string[];
  readonly spells?: string[];
  readonly packs?: string[];
  readonly giftcards?: string[];
}

interface VendorSells {
  readonly hats: string[];
  readonly robes: string[];
  readonly boots: string[];
  readonly wands: string[];
  readonly athames: string[];
  readonly amulets: string[];
  readonly rings: string[];
  readonly decks: string[];
  readonly pets: string[];
  readonly mounts: string[];
  readonly elixirs: string[];
  readonly castles: string[];
  readonly castleBlocks: string[];
  readonly plantLife: string[];
  readonly wallHangings: string[];
  readonly wallpaperAndTile: string[];
  readonly outdoor: string[];
  readonly furniture: string[];
  readonly decorations: string[];
  readonly musicScrolls: string[];
  readonly reagents: string[];
  readonly spells: string[];
  readonly packs: string[];
  readonly giftCards: string[];
  readonly treasureCards: string[];
  readonly snacks: string[];
  readonly jewels: string[];
  readonly seeds: string[];
}

export interface Vendor extends WikiObject {
  readonly crafter?: boolean;
  readonly holiday?: boolean;
  readonly bundles?: string[];
  readonly customOrder?: string[];
  readonly sells: Partial<VendorSells>;
}