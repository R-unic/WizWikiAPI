import { IAPIError } from "./Error";
import { World } from "../World";
import Worlds = require("../../Worlds.json");

export interface IAPIResponse {
    Success: boolean;
    Results: World | typeof Worlds | IAPIError;
}

export class APIResponse implements IAPIResponse {
    public constructor(
        public readonly Success: boolean,
        public readonly Results: World | typeof Worlds | IAPIError
    ) {}
}