export interface ErrorResult {
  readonly error: {
    readonly code: string;
    readonly info: string;
    readonly "*": string;
  }
}

export interface PageParseResult {
  readonly parse: PageInfo;
}

export interface PageInfo {
  readonly title: string;
  readonly pageid: number;
  readonly wikitext: { readonly "*": string };
}

export type InfoboxValue = Maybe<string | number | boolean>;
export interface Infobox {
  [key: string]: InfoboxValue;
}

export type School = "Fire" | "Ice" | "Storm" | "Life" | "Death" | "Myth" | "Balance" | "Star" | "Moon" | "Sun" | "Shadow";
export interface WikiObject { }

export type ErrorCode = Exclude<ResponseCode, ResponseCode.Success>;
export const enum ResponseCode {
  Success = 200,
  NotFound = 404,
  Unknown = 500
}

export interface APIError {
  readonly code: ErrorCode;
  readonly message: string;
}

export interface BaseAPIResponse {
  readonly success: boolean;
  readonly result: SuccessResult | APIError;
}

interface FailedAPIResponse extends BaseAPIResponse {
  readonly success: false;
  readonly result: APIError;
}

type SuccessResult = WikiObject; // | World | typeof Worlds
interface SuccessfulAPIResponse extends BaseAPIResponse {
  readonly success: true;
  readonly result: SuccessResult;
}

export type APIResponse = SuccessfulAPIResponse | FailedAPIResponse;