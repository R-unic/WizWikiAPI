import { APIError } from "./Error";
import { World } from "./World";

export interface APIResponse {
    success: boolean;
    results: World | World[] | APIError;
}