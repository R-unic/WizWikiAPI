interface TemporaryMount<P extends true | false = false> {
  readonly Exists: boolean;
  readonly Crowns: P extends true ? number : Maybe<string>;
  readonly Gold?: P extends true ? number : string;
  readonly Speed?: number;
}

interface PermanentMount extends TemporaryMount<true> {
  readonly CrownsOnly: boolean;
  readonly Tickets?: number;
  readonly Stat?: string;
  readonly StatSchool?: School;
  readonly StatBoost?: string;
}

export default interface Mount {
  readonly Dyeable: boolean;
  readonly Passengers: number;
  readonly Description: string;
  readonly OneDay: TemporaryMount;
  readonly SevenDay: TemporaryMount;
  readonly Permanent: PermanentMount;
  readonly FishChestLocations: [Maybe<string>, Maybe<string>];
}
