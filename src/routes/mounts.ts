import { getInfobox } from "../parsing";
import { isError } from "../utility";
import { APIResponse, Location, ResponseCode } from "../types/common";
import { MAX_FISHING_CHEST_LOCATIONS, type Mount, type MountInfobox } from "../types/categories/mounts";
import app from "../app";

app.get("/mounts");
app.get("/mounts/:mountName", async (req, res) => {
  const { mountName } = req.params;
  const infobox = await getInfobox<MountInfobox>(`Mount:${mountName}`);
  const errored = isError(infobox);
  const result = errored ? infobox : createMount(infobox)

  res
    .status(errored ? infobox.code : ResponseCode.Success)
    .json(new APIResponse(!errored, result));
});

function createMount(base: MountInfobox): Mount {
  const fishingChestLocations = createFishingChestLocations(base);

  return {
    retired: base.retired,
    dyeable: base.dyeable,
    description: base.descrip,
    passengers: base.passengers,
    vendorSets: base.vendset,
    fromSet: base.frmset,
    otherTime: base.othertime,
    requiredBadges: base.badge !== undefined
      ? [base.badge, base.badge2].filter(s => s !== undefined)
      : undefined,
    fishingChestLocations,
    timeVariants: {
      "1day": base["1dayexists"] !== undefined
        ? {
          exists: base["1dayexists"],
          crownsOnly: base["1daycrownsonly"],
          crowns: base["1daycrowns"],
          tickets: base["1daytickets"],
          gold: base["1daygold"],
          speed: base["1dayspeed"],
          statName: base["1daystat"],
          statSchool: base["1daystatschool"]
        }
        : undefined,
      "7day": base["7dayexists"] !== undefined
        ? {
          exists: base["7dayexists"],
          crownsOnly: base["7daycrownsonly"],
          crowns: base["7daycrowns"],
          tickets: base["7daytickets"],
          gold: base["7daygold"],
          speed: base["7dayspeed"],
          statName: base["7daystat"],
          statSchool: base["7daystatschool"]
        }
        : undefined,
      "15day": base["15dayexists"] !== undefined
        ? {
          exists: base["15dayexists"],
          crownsOnly: base["15daycrownsonly"],
          crowns: base["15daycrowns"],
          tickets: base["15daytickets"],
          gold: base["15daygold"],
          speed: base["15dayspeed"],
          statName: base["15daystat"],
          statSchool: base["15daystatschool"]
        }
        : undefined,
      permanent: base.permanentexists !== undefined
        ? {
          exists: base.permanentexists,
          crownsOnly: base.permanentcrownsonly,
          crowns: base.permanentcrowns,
          tickets: base.permanenttickets,
          gold: base.permanentgold,
          speed: base.permanentspeed,
          statName: base.permanentstat,
          statSchool: base.permanentstatschool
        }
        : undefined,
      other: base.otherexists !== undefined
        ? {
          exists: base.otherexists,
          crownsOnly: base.othercrownsonly,
          crowns: base.othercrowns,
          tickets: base.othertickets,
          gold: base.othergold,
          speed: base.otherspeed,
          statName: base.otherstat,
          statSchool: base.otherstatschool
        }
        : undefined
    }
  };
}


function createFishingChestLocations(base: MountInfobox): Maybe<Location[]> {
  const locations: Location[] = [];
  for (let i = 1; i <= MAX_FISHING_CHEST_LOCATIONS; i++) {
    const lexeme = base[`fishchestloc${i}`];
    if (lexeme === undefined) break;

    locations.push(new Location(lexeme));
  }

  return locations.length > 0 ? locations : undefined;
}