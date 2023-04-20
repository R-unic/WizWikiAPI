import { APIResult } from "./APITypes";

/**
 * Represents a creature
 */
export interface Creature {
  readonly Type: string;
  readonly Rank: number;
  readonly Health: number;
  readonly Classification: string;
  readonly School: School;
  readonly Masteries: School[],
  readonly Cheats: boolean,
  readonly StartPips: number;
  readonly PowerPips: boolean;
  readonly OutPierce?: string;
  readonly OutBoost?: string;
  readonly IncBoost?: string;
  readonly IncResist?: string;
  readonly OutHealing: string;
  readonly IncHealing: string;
  readonly ShadowPipSlots: number;
  readonly Stunable: boolean;
  readonly Beguilable: boolean;
  readonly Minion?: string;
  readonly Minion2?: string;
  readonly World: string;
  readonly Location: string;
  readonly Sublocation?: string;
  readonly Description: string;
  readonly Speech?: string;
  readonly MonstrotomeDescription: string;
  readonly SummonAnimus: number;
  readonly SummonGold: number;
  readonly GuestAnimus: number;
  readonly GuestGold: number;
  readonly CanExpel: boolean;
  readonly ExpelAnimus: number;
  readonly ExpelGold: number;
  readonly SpellNotes?: string;
  readonly Casts: string[];
  readonly GoldRange: [number, number];
  readonly Drops: {
    readonly Hats: string[];
    readonly Robes: string[];
    readonly Boots: string[];
    readonly Athames: string[];
    readonly Amulets: string[];
    readonly Rings: string[];
    readonly Wands: string[];
    readonly Decks: string[];
    readonly HousingItems: string[];
    readonly Spellements: string[];
    readonly Reagents: string[];
    readonly TreasureCards: string[];
    readonly Snacks: string[];
    readonly Jewels: string[];
    readonly Pets: string[];
    readonly Mounts: string[];
    readonly Elixirs: string[];
    readonly Recipes: string[];
    readonly Seeds: string[];
    readonly Spells: string[];
  };
}

/**
 * Represents a jewel
 */
export interface Jewel {
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

/**
 * Represents temporary mount data
 * @template P Represents if the mount is permanent or not, saves space
 */
export interface TemporaryMount<P extends true | false = false> {
  readonly Exists: boolean;
  readonly Crowns: P extends true ? number : Maybe<string>;
  readonly Gold?: P extends true ? number : string;
  readonly Speed?: number;
}

/**
 * Represents permanent mount data
 */
export interface PermanentMount extends TemporaryMount<true> {
  readonly CrownsOnly: boolean;
  readonly Tickets?: number;
  readonly Stat?: string;
  readonly StatSchool?: School;
  readonly StatBoost?: string;
}

/**
 * Represents a mount
 */
export interface Mount {
  readonly Dyeable: boolean;
  readonly Passengers: number;
  readonly Description: string;
  readonly OneDay: TemporaryMount;
  readonly SevenDay: TemporaryMount;
  readonly Permanent: PermanentMount;
  readonly FishChestLocations: [Maybe<string>, Maybe<string>];
}

/**
 * Represents a spell card
 */
export interface Spell {
  readonly School: School;
  readonly PipCost: number;
  readonly ShadowPipCost: number;
  readonly ShadowEnhanced: boolean;
  readonly Accuracy: string;
  readonly Description: string;
  readonly NoEnchant?: string;
  readonly Type: string;
  readonly Type2?: string;
  readonly Subtype?: string;
  readonly Enchantment1?: string;
  readonly Enchantment2?: string;
  readonly Enchantment3?: string;
  readonly Enchantable: boolean;
  readonly CreatureOnly: boolean;
  readonly Polymorph?: string;
  readonly Trainer1?: string;
  readonly Trainer2?: string;
  readonly ReqSpell1?: string;
  readonly ReqSpell2?: string;
  readonly ReqSpell3?: string;
  readonly PreSpell1?: string;
  readonly PreSpell2?: string;
  readonly PreSpell3?: string;
  readonly ReqTrainingPoint: boolean;
  readonly Minion?: string;
  readonly Minion1?: string;
  readonly Minion1Pips?: number;
  readonly Minion1Look?: string;
  readonly Minion1Rank?: number;
  readonly Minion1Health?: number;
  readonly Minion2?: string;
  readonly Minion2Pips?: number;
  readonly Minion2Look?: string;
  readonly Minion2Rank?: number;
  readonly Minion2Health?: number;
  readonly Minion3?: string;
  readonly Minion3Pips?: number;
  readonly Minion3Look?: string;
  readonly Minion3Rank?: number;
  readonly Minion3Health?: number;
}

/**
 * Represents a snack
 */
export interface Snack {
  readonly Rank: number;
  readonly School: School;
  readonly Class: string;
  readonly SellValue: number;
  readonly Auctionable: boolean;
  readonly FishChestLocations?: string;
  readonly Stats: {
    readonly Strength?: number;
    readonly Will?: number;
    readonly Agility?: number;
    readonly Intellect?: number;
    readonly Power?: number;
  }
}

/**
 * Quest reward lists for each school
 */
export interface SchoolBasedQuestRewards {
  readonly Balance: [Maybe<string>, Maybe<string>];
  readonly Ice: [Maybe<string>, Maybe<string>];
  readonly Fire: [Maybe<string>, Maybe<string>];
  readonly Storm: [Maybe<string>, Maybe<string>];
  readonly Life: [Maybe<string>, Maybe<string>];
  readonly Death: [Maybe<string>, Maybe<string>];
  readonly Myth: [Maybe<string>, Maybe<string>];
}

/**
 * Represents a quest reward that isnt gold/XP/training points
 */
export interface CustomQuestReward {
  readonly Type: string;
  readonly Value: string;
}

/**
 * Represents a quest unlocked by completing another quest
 */
export interface PostQuest {
  readonly Name: string;
  readonly Mod?: string;
}

/**
 * Represents a quest goal
 */
export interface QuestGoal {
  readonly Description: string;
  readonly SubGoals: string[];
}

/**
 * Represents all possible rewards for a quest
 */
export interface QuestRewards {
  readonly Gold?: number;
  readonly XP?: number;
  readonly TrainingPoints?: number;
  readonly SchoolBased: SchoolBasedQuestRewards;
  readonly Custom: [
    Maybe<CustomQuestReward>,
    Maybe<CustomQuestReward>,
    Maybe<CustomQuestReward>,
    Maybe<CustomQuestReward>
  ];
}

/**
 * Represents a giver of a quest
 */
export interface QuestGiver {
  readonly Name: string;
  readonly World: string;
  readonly Location: string;
}

/**
 * Represents a quest
 */
export interface Quest {
  readonly PreQuests: [Maybe<string>, Maybe<string>, Maybe<string>];
  readonly PostQuests: [Maybe<PostQuest>, Maybe<PostQuest>, Maybe<PostQuest>];
  readonly HandIn: string;
  readonly Storyline: boolean;
  readonly Fishing: boolean;
  readonly Crafting: boolean;
  readonly Instance: boolean;
  readonly Dialogue?: string;
  readonly Rewards: QuestRewards
  readonly Giver: QuestGiver;
  readonly Goals: [
    QuestGoal,
    Maybe<QuestGoal>,
    Maybe<QuestGoal>,
    Maybe<QuestGoal>,
    Maybe<QuestGoal>,
    Maybe<QuestGoal>
  ];
}

/**
 * Represents an NPC
 */
export interface NPC {
  readonly Title: string;
  readonly Locations: string[];
  readonly Description: string;
  readonly GivesQuests: string[];
  readonly QuestGoals: string[];
  readonly EndsQuests: string[];
}

/**
 * Represents a world, this is not from the wiki.
 */
export interface World extends APIResult {
  readonly Name: string;
  readonly Quests: number;
  readonly LevelRange: {
    readonly First: number;
    readonly Second: number;
  };
  readonly Abbreviation: string;
  readonly Areas: string[];
}
