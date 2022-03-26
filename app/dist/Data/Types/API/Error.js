"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.APIError = void 0;
class APIError {
    constructor(Code, Message) {
        this.Code = Code;
        this.Message = Message;
    }
}
exports.APIError = APIError;
