import { getInfobox } from "../parsing";
import { isError } from "../utility";
import { APIResponse, Location, ResponseCode } from "../types/common";
import type { Snack, SnackInfobox } from "../types/categories/snacks";
import app from "../app";

app.get("/snacks");
app.get("/snacks/:snackName", async (req, res) => {
  const { snackName } = req.params;
  const infobox = await getInfobox<SnackInfobox>(`Snack:${snackName}`);
  const errored = isError(infobox);
  const result = errored ? infobox : createSnack(infobox);

  res
    .status(errored ? infobox.code : ResponseCode.Success)
    .json(new APIResponse(!errored, result));
});

function createSnack(base: SnackInfobox): Snack {
  const fishingChestLocations = createFishingChestLocations(base);

  return {
    rank: base.value,
    school: base.school,
    class: base.class,
    stats: {
      strength: base.strength,
      agility: base.agility,
      will: base.will,
      intellect: base.intellect,
      power: base.power
    },
    auctionable: base.auction,
    canSell: base.sell ?? true,
    sellPrice: base.sellval,
    altAcquisition: base.altacquire,
    altCategories: base.altcategory,
    fishingChestLocations
  };
}

function createFishingChestLocations(base: SnackInfobox): Maybe<Location[]> {
  return base.fishchestlocations?.map(lexeme => new Location(lexeme));
}