import { getInfobox } from "../parsing";
import { isError } from "../utility";
import { APIResponse, Location, ResponseCode } from "../types/common";
import { MAX_FOUND_LOCATIONS, type Fish, type FishInfobox } from "../types/categories/fish";
import app from "../app";

app.get("/fish");
app.get("/fish/:fishName", async (req, res) => {
  const { fishName } = req.params;
  const infobox = await getInfobox<FishInfobox>(`Fish:${fishName}`);
  const errored = isError(infobox);
  const result = errored ? infobox : createFish(infobox);

  res
    .status(errored ? infobox.code : ResponseCode.Success)
    .json(new APIResponse(!errored, result));
});

function createFish(base: FishInfobox): Fish {
  const locations = createLocations(base);

  return {
    school: base.school,
    rank: base.rank,
    aquarium: base.aquarium,
    rarity: base.rarity,
    size: [base.minsize, base.maxsize],
    initialXP: base.initialxp,
    regularXP: base.regularxp,
    description: base.descrip,
    sentinel: base.sentinel ?? false,
    sellPrice: {
      minimum: base.minsell,
      maximum: base.maxsell,
      maximumSmallFry: base.maxsellsf,
      maximumWhopper: base.maxsellwh
    },
    sellSize: {
      minimum: base.minsellsize,
      maximum: base.maxsellsize,
      maximumSmallFry: base.maxsellsfsize,
      maximumWhopper: base.maxsellwhsize
    },
    locations
  };
}

function createLocations(base: FishInfobox): Location[] {
  const locations: Location[] = [];
  for (let i = 1; i <= MAX_FOUND_LOCATIONS; i++) {
    const world = base[`worldfound${i}`];
    const locationNames = base[`locationlist${i}`];
    if (locationNames === undefined) break;

    for (const locationName of locationNames)
      locations.push(new Location(world + "::" + locationName));
  }

  return locations;
}