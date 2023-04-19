"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class APIError {
    constructor(Code, Message) {
        this.Code = Code;
        this.Message = Message;
    }
}
exports.default = APIError;
