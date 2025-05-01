import { getInfobox, parsePercent, parsePerSchoolStat } from "../parsing";
import { isError } from "../utility";
import { APIResponse, Location, ResponseCode } from "../types/common";
import type { Creature, CreatureInfobox } from "../types/categories/creatures";
import app from "../app";

app.get("/creatures");
app.get("/creatures/:creatureName", async (req, res) => {
  const { creatureName } = req.params;
  const infobox = await getInfobox<CreatureInfobox>(`Creature:${creatureName}`);
  const errored = isError(infobox);
  const result = errored ? infobox : createCreature(infobox);

  res
    .status(errored ? infobox.code : ResponseCode.Success)
    .json(new APIResponse(!errored, result));
});

function createCreature(base: CreatureInfobox): Creature {
  const locations = createLocations(base);
  const minions = [base.minion, base.minion2, base.minion3]
    .filter(e => e !== undefined);

  return {
    type: base.cretype,
    rank: base.rank,
    health: base.heal,
    classification: base.crecla,
    school: base.school,
    masteries: base.masteries,
    cheats: base.cheats ?? false,
    startPips: base.startpips,
    powerPips: base.powerpips,
    speech: base.speech,
    outgoingHealing: base.outhealing !== undefined && base.outhealing[0] !== undefined
      ? parsePercent(base.outhealing[0])
      : undefined,
    incomingHealing: base.inchealing !== undefined && base.inchealing[0] !== undefined
      ? parsePercent(base.inchealing[0])
      : undefined,
    pierce: base.outpierce !== undefined ? parsePerSchoolStat(base.outpierce) : undefined,
    resist: base.incresist !== undefined ? parsePerSchoolStat(base.incresist) : undefined,
    outgoingBoost: base.outboost !== undefined ? parsePerSchoolStat(base.outboost) : undefined,
    incomingBoost: base.incboost !== undefined ? parsePerSchoolStat(base.incboost) : undefined,
    criticalRating: base.critical !== undefined ? parsePerSchoolStat(base.critical) : undefined,
    criticalBlockRating: base.criticalblock !== undefined ? parsePerSchoolStat(base.criticalblock) : undefined,
    shadowPipSlots: base.shadowslots,
    stunable: base.stunable,
    beguilable: base.beguilable,
    locations,
    minions,
    description: base.descrip,
    monstrotomeDescription: base.monstrotomedescrip,
    summonAnimus: base.summon_animus,
    summonGold: base.summon_gold,
    guestAnimus: base.guest_animus,
    guestGold: base.guest_gold,
    canExpel: base.can_expel,
    expelAnimus: base.expel_animus,
    expelGold: base.expel_gold,
    casts: base.casts,
    spellNotes: base.spellnotes,
    goldRange: base.gold,
    drops: {
      hats: base.hats,
      robes: base.robes,
      boots: base.boots,
      athames: base.athames,
      amulets: base.amulets,
      rings: base.rings,
      wands: base.wands,
      decks: base.decks,
      housingItems: base.items,
      spellements: base.spellements,
      reagents: base.reagents,
      treasureCards: base.cards,
      snacks: base.snacks,
      jewels: base.jewels,
      pets: base.pets,
      mounts: base.mounts,
      elixirs: base.elixirs,
      recipes: base.recipes,
      seeds: base.seeds,
      spells: base.spells
    }
  };
}

function createLocations(base: CreatureInfobox): Location[] {
  const locations: Location[] = [];
  const worldLocation = new Location(base.world);
  for (let i = 0; i < 8; i++) {
    const locationName = base[`location${i === 1 ? "" : i}`] as Maybe<string>;
    const subLocationName = base[`subloc${i}`] as Maybe<string>
    if (locationName === undefined) continue;

    let locationLexeme = worldLocation.toString() + "::" + locationName;
    if (subLocationName !== undefined)
      locationLexeme += "::" + subLocationName;

    locations.push(new Location(locationLexeme));
  }

  return locations;
}