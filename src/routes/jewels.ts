import { getInfobox } from "../parsing";
import { isError } from "../utility";
import { APIResponse, Location, ResponseCode } from "../types/common";
import type { Jewel, JewelInfobox } from "../types/categories/jewels";
import app from "../app";

app.get("/jewels");
app.get("/jewels/:jewelName", async (req, res) => {
  const { jewelName } = req.params;
  const infobox = await getInfobox<JewelInfobox>(`Jewel:${jewelName}`);
  const errored = isError(infobox);
  const result = errored ? infobox : createJewel(infobox);

  res
    .status(errored ? infobox.code : ResponseCode.Success)
    .json(new APIResponse(!errored, result));
});

function createJewel(base: JewelInfobox): Jewel {
  const fishingChestLocations = createFishingChestLocations(base);

  return {
    quality: base.quality ?? base.level ?? 0,
    socket: base.socket,
    type: base.type,
    requiredSchool: base.school,
    excludedSchool: base.notschool,
    weavingSchool: base.weavingschool,
    effect: {
      type: base.effect,
      value: base.effectval,
      card: base.effectcard,
      name: base.petability
    } as never,
    effect2: base.effect2 !== undefined ? {
      type: base.effect2,
      value: base.effectval2,
      name: base.petability2
    } as never : undefined,

    shatterproof: base.shatterproof ?? false,
    acquiredAtUltra: base.ultra ?? false,
    auctionable: base.auction ?? true,
    sellPrice: base.sellprice ?? 0,
    altAcquisitions: base.altacquire,
    altCategories: base.altcategory,
    fishingChestLocations
  };
}

function createFishingChestLocations(base: JewelInfobox): Maybe<Location[]> {
  return base.fishchestlocations?.map(lexeme => new Location(lexeme));
}