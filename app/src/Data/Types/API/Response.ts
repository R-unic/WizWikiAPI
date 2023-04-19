import Worlds = require("../../Worlds.json");
import APIError from "./Error";
import APIResult from "./Result";

export default class APIResponse {
  public constructor(
    public readonly Success: boolean,
    public readonly Results: typeof Worlds | APIResult | APIError
  ) {}
}
