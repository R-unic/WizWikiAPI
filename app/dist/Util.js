"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ToTitleCase = void 0;
const ToTitleCase = (item) => item
    .toLowerCase()
    .replace(/_/g, ' ')
    .replace(/\b[a-z]/g, t => t.toUpperCase());
exports.ToTitleCase = ToTitleCase;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiVXRpbC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3NyYy9VdGlsLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFPLE1BQU0sV0FBVyxHQUFHLENBQUMsSUFBWSxFQUFVLEVBQUUsQ0FDaEQsSUFBSTtLQUNDLFdBQVcsRUFBRTtLQUNiLE9BQU8sQ0FBQyxJQUFJLEVBQUUsR0FBRyxDQUFDO0tBQ2xCLE9BQU8sQ0FBQyxVQUFVLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsV0FBVyxFQUFFLENBQUMsQ0FBQztBQUp0QyxRQUFBLFdBQVcsZUFJMkIifQ==