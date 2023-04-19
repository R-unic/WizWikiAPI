interface QuestGiver {
  readonly Name: string;
  readonly World: string;
  readonly Location: string;
}

interface SchoolBasedQuestRewards {
  readonly Balance: [Maybe<string>, Maybe<string>];
  readonly Ice: [Maybe<string>, Maybe<string>];
  readonly Fire: [Maybe<string>, Maybe<string>];
  readonly Storm: [Maybe<string>, Maybe<string>];
  readonly Life: [Maybe<string>, Maybe<string>];
  readonly Death: [Maybe<string>, Maybe<string>];
  readonly Myth: [Maybe<string>, Maybe<string>];
}

interface QuestReward {
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

export default interface Quest {
  readonly PreQuests: [Maybe<string>, Maybe<string>, Maybe<string>];
  readonly PostQuests: [Maybe<PostQuest>, Maybe<PostQuest>, Maybe<PostQuest>];
  readonly HandIn: string;
  readonly Giver: QuestGiver;
  readonly Storyline: boolean;
  readonly Fishing: boolean;
  readonly Crafting: boolean;
  readonly Instance: boolean;
  readonly Dialogue?: string;
  readonly Goals: [
    QuestGoal,
    Maybe<QuestGoal>,
    Maybe<QuestGoal>,
    Maybe<QuestGoal>,
    Maybe<QuestGoal>,
    Maybe<QuestGoal>
  ];
  readonly Rewards: {
    readonly Gold?: number;
    readonly XP?: number;
    readonly TrainingPoints?: number;
    readonly SchoolBased: SchoolBasedQuestRewards
    readonly Custom: [
      Maybe<QuestReward>,
      Maybe<QuestReward>,
      Maybe<QuestReward>,
      Maybe<QuestReward>
    ];
  }
}
