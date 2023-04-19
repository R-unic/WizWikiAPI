export default interface Jewel {
  readonly Quality: string;
  readonly Socket: string;
  readonly Type: string;
  readonly Effect: string;
  readonly EffectValue?: string;
  readonly EffectCard?: string;
  readonly PetAbility?: string;
  readonly Level?: number;
  readonly PetLevel?: string;
  readonly Ultra: boolean;
  readonly FishChestLocations?: string;
}
