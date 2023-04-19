"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Logger = exports.ToTitleCase = void 0;
const winston_1 = require("winston");
const ToTitleCase = (item) => item.toLowerCase()
    .replace(/_/g, ' ')
    .replace(/\b[a-z]/g, t => t.toUpperCase());
exports.ToTitleCase = ToTitleCase;
class Logger {
    static Log(msg) {
        console.log(`[${this.colorizer.colorize("log", "LOG")}]: ${msg}`);
    }
    static Error(msg) {
        console.log(`[${this.colorizer.colorize("error", "ERROR")}]: ${msg}`);
    }
}
exports.Logger = Logger;
Logger.colorizer = winston_1.format.colorize({
    message: true,
    colors: {
        log: "green",
        error: "red"
    }
});
