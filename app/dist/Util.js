"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ToTitleCase = void 0;
const ToTitleCase = (item) => item
    .toLowerCase()
    .replace(/_/g, ' ')
    .replace(/\b[a-z]/g, t => t.toUpperCase());
exports.ToTitleCase = ToTitleCase;
