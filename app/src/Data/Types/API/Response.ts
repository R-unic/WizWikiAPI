import { APIError } from "./Error";
import { World } from "../World";
import Worlds = require("../../Worlds.json");

export interface APIResponse {
    success: boolean;
    results: World | typeof Worlds | APIError;
}