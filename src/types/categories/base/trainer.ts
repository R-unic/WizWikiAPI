import type { Infobox, School, WikiObject } from "../../common";

export function createTrainer(base: TrainerInfobox): Trainer {
  const spells = createSpells(base);

  return {
    trainer: base.trainer,
    world: base.world,
    location: base.location,
    spells: spells.length > 0 ? spells : undefined
  };
}

const MAX_SPELLS = 50;
function createSpells(base: TrainerInfobox): TrainerSpellInfo[] {
  const spellInfos: TrainerSpellInfo[] = [];
  for (let i = 1; i <= MAX_SPELLS; i++) {
    const prefix = `spell${i}`;
    const name = base[prefix] as Maybe<string>;
    const school = base[prefix + "school"] as Maybe<School>;
    const level = base[prefix + "level"] as Maybe<number>;
    const cost = base[prefix + "cost"] as Maybe<number>;
    const skip = name === undefined
      || school === undefined
      || level === undefined;

    if (skip) continue;
    spellInfos.push({ name, school, level, cost });
  }

  return spellInfos;
}

type WithSpellFields<N extends number> = {
  [K in NumberTypeRange<N> as `spell${K}`]?: string;
} & {
  [K in NumberTypeRange<N> as `spell${K}school`]?: School;
} & {
  [K in NumberTypeRange<N> as `spell${K}level`]?: number;
} & {
  [K in NumberTypeRange<N> as `spell${K}cost`]?: number;
};

export interface TrainerInfobox extends Infobox, WithSpellFields<typeof MAX_SPELLS> {
  readonly trainer?: boolean;
  readonly world: string | string[];
  readonly location?: string;
}

interface TrainerSpellInfo {
  readonly name: string;
  readonly school: School;
  readonly level: number;
  readonly cost?: number;
}

export interface Trainer extends WikiObject {
  readonly trainer?: boolean;
  readonly world: string | string[];
  readonly location?: string;
  readonly spells?: TrainerSpellInfo[];
}