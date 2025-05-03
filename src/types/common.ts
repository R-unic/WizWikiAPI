import worlds from "../worlds.json";

export type WithFishingChestLocations<N extends number> = {
  [K in NumberTypeRange<N> as `fishchestloc${K}`]?: string;
};

export interface WikiObject { }

export const playableSchools = ["Fire", "Ice", "Storm", "Life", "Death", "Myth", "Balance"] as const;
export const schools = [...playableSchools, "Star", "Moon", "Sun", "Shadow"] as const;
export type School = typeof schools[number];
export type PlayableSchool = typeof playableSchools[number];

export type PerSchoolStat = number | Partial<Record<School, number>>;

/**
 * Represents a location in the spiral. `parent` refers to the parent location.
 * 
 * For example: Wizard City is the parent location of The Commons
 */
export class Location {
  public readonly parent?: Location;
  public readonly name: string;

  public constructor(locationLexeme: string) {
    const locationParts = locationLexeme
      .split("::")
      .map(s => s.trim());

    const locations = locationParts.reverse();
    this.name = locations.shift()!;
    if (locations.length === 0) return;

    this.parent = new Location(locations.reverse().join(" :: "));
  }

  public static fromJSON(json: OmitMethods<Location>): Location {
    const lexeme = Location.toString(json);
    return new Location(lexeme);
  }

  public static toString(location: OmitMethods<Location>): string {
    const parentName = location.parent?.toString();
    return (parentName === undefined ? "" : parentName + " :: ") + location.name;
  }

  public toString(): string {
    return Location.toString(this);
  }

  public toJSON(): OmitMethods<Location> {
    return {
      parent: this.parent,
      name: this.name
    };
  }
}

export interface ErrorResult {
  readonly error: {
    readonly code: string;
    readonly info: string;
    readonly "*": string;
  }
}

export interface PageParseResult {
  readonly parse: PageInfo;
}

export interface PageInfo {
  readonly title: string;
  readonly pageid: number;
  readonly wikitext: { readonly "*": string };
}

export type InfoboxValue = Maybe<string | number | boolean | InfoboxValue[]>;
export interface Infobox {
  [key: string]: InfoboxValue;
}

export type ErrorCode = Exclude<ResponseCode, ResponseCode.Success>;
export const enum ResponseCode {
  Success = 200,
  NotFound = 404,
  Unknown = 500
}

export interface APIError {
  readonly code: ErrorCode;
  readonly message: string;
}

type SuccessResult = WikiObject | typeof worlds;
export class APIResponse<Success extends boolean = boolean> {
  public constructor(
    public readonly success: Success,
    public readonly result: Success extends true
      ? SuccessResult
      : Success extends false
      ? APIError
      : SuccessResult | APIError
  ) { }
}