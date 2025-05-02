import { getInfobox } from "../parsing";
import { isError } from "../utility";
import { APIResponse, ResponseCode } from "../types/common";
import type { Reagent, ReagentInfobox } from "../types/categories/reagents";
import app from "../app";

app.get("/reagents");
app.get("/reagents/:reagentName", async (req, res) => {
  const { reagentName } = req.params;
  const infobox = await getInfobox<ReagentInfobox>(`Reagent:${reagentName}`);
  const errored = isError(infobox);
  const result = errored ? infobox : createReagent(infobox);

  res
    .status(errored ? infobox.code : ResponseCode.Success)
    .json(new APIResponse(!errored, result));
});

function createReagent(base: ReagentInfobox): Reagent {
  const rareHarvestVariants = [base.altrareharvest1, base.altrareharvest2].filter(s => s !== undefined);
  const normalHarvestVariants = [base.altnormharvest1, base.altnormharvest2].filter(s => s !== undefined);

  return {
    rank: base.rank,
    school: base.school,
    auctionable: base.auction,
    canTrade: base.trade,
    description: base.descrip,
    harvestType: base.harvestType,
    rareHarvestVariants: rareHarvestVariants.length > 0 ? rareHarvestVariants : undefined,
    normalHarvestVariants: normalHarvestVariants.length > 0 ? normalHarvestVariants : undefined,
    maxBazaarPrice: base.maxbazaar,
    vendorSellPrice: base.sellprice,
    notes: base.notes,
    altAcquisitions: base.altacquire,
    altCategories: base.altcategory
  };
}