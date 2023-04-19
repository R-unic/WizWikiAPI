
interface SchoolBasedQuestRewards {
  readonly Balance: [Maybe<string>, Maybe<string>];
  readonly Ice: [Maybe<string>, Maybe<string>];
  readonly Fire: [Maybe<string>, Maybe<string>];
  readonly Storm: [Maybe<string>, Maybe<string>];
  readonly Life: [Maybe<string>, Maybe<string>];
  readonly Death: [Maybe<string>, Maybe<string>];
  readonly Myth: [Maybe<string>, Maybe<string>];
}

interface CustomQuestReward {
  readonly Type: string;
  readonly Value: string;
}

interface PostQuest {
  readonly Name: string;
  readonly Mod?: string;
}

interface QuestGoal {
  readonly Description: string;
  readonly SubGoals: string[];
}

interface QuestRewards {
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

interface QuestGiver {
  readonly Name: string;
  readonly World: string;
  readonly Location: string;
}

export default interface Quest {
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
