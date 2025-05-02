import { getInfobox } from "../parsing";
import { isError } from "../utility";
import { APIResponse, ResponseCode } from "../types/common";
import app from "../app";
import { MAX_ITEMS, MAX_REAGENTS, Recipe, RecipeInfobox, RecipeReagent } from "../types/categories/recipes";

app.get("/recipes");
app.get("/recipes/:recipeName", async (req, res) => {
  const { recipeName } = req.params;
  const infobox = await getInfobox<RecipeInfobox>(`Recipe:${recipeName}`);
  const errored = isError(infobox);
  const result = errored ? infobox : createRecipe(infobox);

  res
    .status(errored ? infobox.code : ResponseCode.Success)
    .json(new APIResponse(!errored, result));
});

function createRecipe(base: RecipeInfobox): Recipe {
  const items = createItems(base);
  const reagents = createRecipeReagents(base);
  const craftingStations = [base.crstat, base.crstat2].filter(s => s !== undefined);
  const requiredBadges = [base.badge, base.badge2].filter(s => s !== undefined);

  return {
    type: base.type,
    requiredSchool: base.school,
    limit: base.limit,
    cooldown: base.cooldown,
    requiredCantripRank: base.ctrank,
    requiredPvpRank: base.pvprank,
    requiredCraftingRank: base.crrank,
    requiredBadges: requiredBadges.length > 0 ? requiredBadges : undefined,
    craftingStations,
    items,
    reagents
  };
}

function createItems(base: RecipeInfobox): string[] {
  const items: string[] = [];
  for (let i = 1; i <= MAX_ITEMS; i++) {
    const item = base[`item${i}`];
    if (item === undefined) break;

    items.push(item);
  }

  return items;
}

function createRecipeReagents(base: RecipeInfobox): RecipeReagent[] {
  const reagents: RecipeReagent[] = [];
  for (let i = 1; i <= MAX_REAGENTS; i++) {
    const name = base[`reagent${i}`];
    const amount = base[`reagentnum${i}`];
    const alternatives = base[`subreagents${i}`];
    if (name === undefined || amount === undefined) break;

    reagents.push({ name, amount, alternatives });
  }

  return reagents;
}