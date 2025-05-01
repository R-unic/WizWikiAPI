import { APIError, APIResponse, ResponseCode } from "../types/common";
import type { World, WorldName } from "../types/categories/worlds";
import app from "../app";
import worlds from "../worlds.json";

app.get("/worlds", (_, res) => void res.status(ResponseCode.Success).json(new APIResponse(true, worlds)));
app.get("/worlds/:worldName", (req, res) => {
  const worldName = req.params.worldName
    .replace(/_/g, "")
    .split(" ")
    .join("")
    .toLowerCase() as WorldName;

  let world = worlds[worldName] as unknown as Maybe<World>;
  if (world === undefined)
    world = Object.values(worlds).find(w => w.abbreviation === worldName) as never

  if (world !== undefined)
    return void res
      .status(ResponseCode.Success)
      .json(new APIResponse(true, world));

  const apiError: APIError = {
    code: ResponseCode.NotFound,
    message: `World '${worldName}' not found.`
  };

  res
    .status(apiError.code)
    .json(new APIResponse(false, apiError));
});