export default interface NPC {
  readonly Title: string;
  readonly Locations: string[];
  readonly Description: string;
  readonly GivesQuests: string[];
  readonly QuestGoals: string[];
  readonly EndsQuests: string[];
}
