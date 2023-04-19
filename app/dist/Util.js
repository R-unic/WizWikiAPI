"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Logger = exports.DeserializeWikiData = exports.ToTitleCase = void 0;
const winston_1 = require("winston");
const ToTitleCase = (item) => item.toLowerCase()
    .replace(/_/g, " ")
    .replace(/\b[a-z]/g, t => t.toUpperCase());
exports.ToTitleCase = ToTitleCase;
function DeserializeWikiData(data) {
    const pairs = data.replace(/^\{\{/, "").replace(/\}\}$/, "").split("\n| ");
    pairs.shift();
    const object = {};
    for (const pair of pairs) {
        let [key, value] = pair.split(" =");
        value = value.replace(/\;/, "").replace(/\'\'/, "").replace(/\:/, "").trim();
        let trueValue = value.trim();
        if (value === "" || value === "None")
            trueValue = undefined;
        else if (!isNaN(Number(value)))
            trueValue = Number(value);
        else if (!isNaN(Number(value.replace(/\,/, ""))))
            trueValue = Number(value.replace(/\,/, ""));
        else if (value === "No")
            trueValue = false;
        else if (value === "Yes")
            trueValue = true;
        object[key.trim()] = trueValue;
    }
    return object;
}
exports.DeserializeWikiData = DeserializeWikiData;
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
