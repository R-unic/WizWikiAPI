export interface World {
  readonly name: string;
  readonly questCount: number;
  readonly levelRange: NumberRange;
  readonly abbreviation: string;
  readonly areas: string;
}

export type WorldName =
  | "wizardcity"
  | "krokotopia"
  | "marleybone"
  | "mooshu"
  | "dragonspyre"
  | "celestia"
  | "zafaria"
  | "avalon"
  | "azteca"
  | "khrysalis"
  | "polaris"
  | "mirage"
  | "empyrea"
  | "karamelle"
  | "lemuria"
  | "novus"
  | "wallaru";