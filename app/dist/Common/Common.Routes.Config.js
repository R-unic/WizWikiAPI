"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommonRoutesConfig = void 0;
const Error_1 = __importDefault(require("../Data/Types/API/Error"));
const Response_1 = __importDefault(require("../Data/Types/API/Response"));
class CommonRoutesConfig {
    constructor(App, Name) {
        this.App = App;
        this.Name = Name;
        this.ConfigureRoutes();
    }
    NotFound(res) {
        const err = new Error_1.default(404 /* ResponseCode.NOT_FOUND */, "Creature not found.");
        return res.status(err.Code)
            .send(JSON.stringify(new Response_1.default(false, err)));
    }
}
exports.CommonRoutesConfig = CommonRoutesConfig;
