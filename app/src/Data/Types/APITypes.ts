import Worlds = require("../Worlds.json");

/**
 * Generic abstract class for anything that is a valid APIResponse.Results
 */
export abstract class APIResult {}

/**
 * Generic API response, all routes return JSON that extends from object
 */
export class APIResponse {
  public constructor(
    public readonly Success: boolean,
    public readonly Results: APIResult | APIError | typeof Worlds
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
