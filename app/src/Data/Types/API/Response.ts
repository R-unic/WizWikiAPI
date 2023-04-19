import World from "../World";
import Creature from "../Creature";
import APIError from "./Error";
import Worlds = require("../../Worlds.json");

export default class APIResponse {
  public constructor(
    public readonly Success: boolean,
    public readonly Results: World | typeof Worlds | Creature | APIError
  ) {}
}
