import { WikiObject, World } from "./WikiTypes";
import Worlds = require("../Worlds.json");

/**
 * Generic API response, all routes return JSON that extends from object
 */
export class APIResponse {
  public constructor(
    public readonly Success: boolean,
    public readonly Results: WikiObject[] | World | APIError | typeof Worlds
  ) {}
}

/**
 * Result of an erroneous response
 */
export class APIError {
  public constructor(
    public readonly Code: number,
    public readonly Message: string
  ) {}
}
