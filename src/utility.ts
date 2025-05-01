import { ResponseCode, type ErrorCode, type APIError, type ErrorResult } from "./types/common";

export function capitalize(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1);
}
export function isError(obj: unknown): obj is APIError {
  return typeof obj === "object"
    && obj !== null
    && "code" in obj
    && "message" in obj
    && typeof obj.code === "number"
    && typeof obj.message === "string";
}

export function getErrorResponseCode(rawCode: string): ErrorCode {
  switch (rawCode) {
    case "missingtitle":
      return ResponseCode.NotFound;
  }

  return ResponseCode.Unknown;
}

export function isErrorResult(result: object): result is ErrorResult {
  return "error" in result;
}