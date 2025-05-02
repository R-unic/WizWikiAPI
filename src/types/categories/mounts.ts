import type { Infobox, Location, School, WikiObject } from "../common";

type WithFishingChestLocations<N extends number> = {
  [K in NumberTypeRange<N> as `fishchestloc${K}`]?: string;
};

type MountTimeLimit = "1day" | "7day" | "15day" | "permanent" | "other";

export const MAX_FISHING_CHEST_LOCATIONS = 6;
export interface MountInfobox extends Infobox,
  WithFishingChestLocations<typeof MAX_FISHING_CHEST_LOCATIONS> {
  readonly retired?: boolean;
  readonly dyeable?: boolean;
  readonly descrip?: string;
  readonly passengers: number;
  readonly vendset?: string[];
  readonly frmset?: string;
  readonly othertime?: string;
  readonly badge?: string;
  readonly badge2?: string;

  readonly ["1dayexists"]?: boolean;
  readonly ["1daycrownsonly"]?: boolean;
  readonly ["1daycrowns"]?: number;
  readonly ["1daytickets"]?: number;
  readonly ["1daygold"]?: number;
  readonly ["1dayspeed"]: number;
  readonly ["1daystat"]?: string;
  readonly ["1daystatschool"]?: School;

  readonly ["7dayexists"]?: boolean;
  readonly ["7daycrownsonly"]?: boolean;
  readonly ["7daycrowns"]?: number;
  readonly ["7daytickets"]?: number;
  readonly ["7daygold"]?: number;
  readonly ["7dayspeed"]: number;
  readonly ["7daystat"]?: string;
  readonly ["7daystatschool"]?: School;

  readonly ["15dayexists"]?: boolean;
  readonly ["15daycrownsonly"]?: boolean;
  readonly ["15daycrowns"]?: number;
  readonly ["15daytickets"]?: number;
  readonly ["15daygold"]?: number;
  readonly ["15dayspeed"]: number;
  readonly ["15daystat"]?: string;
  readonly ["15daystatschool"]?: School;

  readonly permanentexists?: boolean;
  readonly permanentcrownsonly?: boolean;
  readonly permanentcrowns?: number;
  readonly permanenttickets?: number;
  readonly permanentgold?: number;
  readonly permanentspeed: number;
  readonly permanentstat?: string;
  readonly permanentstatschool?: School;

  readonly otherexists?: boolean;
  readonly othercrownsonly?: boolean;
  readonly othercrowns?: number;
  readonly othertickets?: number;
  readonly othergold?: number;
  readonly otherspeed: number;
  readonly otherstat?: string;
  readonly otherstatschool?: School;
}

export interface Mount extends WikiObject {
  readonly retired?: boolean;
  readonly dyeable?: boolean;
  readonly description?: string;
  readonly passengers: number;
  readonly vendorSets?: string[];
  readonly fromSet?: string;
  readonly otherTime?: string;
  readonly requiredBadges?: string[];
  readonly fishingChestLocations?: Location[];

  readonly timeVariants: Partial<Record<MountTimeLimit, {
    readonly exists: boolean;
    readonly crownsOnly?: boolean;
    readonly crowns?: number | string;
    readonly tickets?: number | string;
    readonly gold?: number | string;
    readonly speed: number;
    readonly statName?: string;
    readonly statSchool?: School;
  }>>;
}