"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const http_1 = require("http");
const express_winston_1 = require("express-winston");
const winston_1 = require("winston");
const Users_Routes_Config_1 = require("./Users/Users.Routes.Config");
const express_1 = tslib_1.__importDefault(require("express"));
const debug_1 = tslib_1.__importDefault(require("debug"));
const cors_1 = tslib_1.__importDefault(require("cors"));
const app = express_1.default();
const server = http_1.createServer();
const port = 3000;
const running = `Server running https://localhost:${port}`;
const routes = [];
const debugLog = debug_1.default("App");
app.use(express_1.default.json());
app.use(cors_1.default());
const loggerOptions = {
    transports: [new winston_1.transports.Console()],
    format: winston_1.format.combine(winston_1.format.json(), winston_1.format.prettyPrint(), winston_1.format.colorize({ all: true }))
};
if (!process.env.DEBUG)
    loggerOptions.meta = false;
app.use(express_winston_1.logger(loggerOptions));
routes.push(new Users_Routes_Config_1.UsersRoutes(app));
app
    .get("/", (req, res) => res.status(200).send(running));
server.listen(port, () => {
    routes.forEach(route => debugLog(`Routes configured for ${route.Name}`));
    console.log(running);
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQXBwLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL0FwcC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSwrQkFBNEM7QUFDNUMscURBQXdEO0FBQ3hELHFDQUE2QztBQUU3QyxxRUFBMEQ7QUFDMUQsOERBQStDO0FBQy9DLDBEQUF5QztBQUN6Qyx3REFBd0I7QUFFeEIsTUFBTSxHQUFHLEdBQWdCLGlCQUFPLEVBQUUsQ0FBQztBQUNuQyxNQUFNLE1BQU0sR0FBVyxtQkFBWSxFQUFFLENBQUM7QUFDdEMsTUFBTSxJQUFJLEdBQUcsSUFBSSxDQUFDO0FBQ2xCLE1BQU0sT0FBTyxHQUFHLG9DQUFvQyxJQUFJLEVBQUUsQ0FBQztBQUMzRCxNQUFNLE1BQU0sR0FBeUIsRUFBRSxDQUFDO0FBQ3hDLE1BQU0sUUFBUSxHQUFjLGVBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQztBQUV6QyxHQUFHLENBQUMsR0FBRyxDQUFDLGlCQUFPLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQztBQUN4QixHQUFHLENBQUMsR0FBRyxDQUFDLGNBQUksRUFBRSxDQUFDLENBQUM7QUFFaEIsTUFBTSxhQUFhLEdBQWtCO0lBQ2pDLFVBQVUsRUFBRSxDQUFDLElBQUksb0JBQVUsQ0FBQyxPQUFPLEVBQUUsQ0FBQztJQUN0QyxNQUFNLEVBQUUsZ0JBQU0sQ0FBQyxPQUFPLENBQ2xCLGdCQUFNLENBQUMsSUFBSSxFQUFFLEVBQ2IsZ0JBQU0sQ0FBQyxXQUFXLEVBQUUsRUFDcEIsZ0JBQU0sQ0FBQyxRQUFRLENBQUMsRUFBRSxHQUFHLEVBQUUsSUFBSSxFQUFFLENBQUMsQ0FDakM7Q0FDSixDQUFBO0FBRUQsSUFBSSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsS0FBSztJQUNsQixhQUFhLENBQUMsSUFBSSxHQUFHLEtBQUssQ0FBQztBQUUvQixHQUFHLENBQUMsR0FBRyxDQUFDLHdCQUFNLENBQUMsYUFBYSxDQUFDLENBQUMsQ0FBQztBQUMvQixNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksaUNBQVcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO0FBRWxDLEdBQUc7S0FDRSxHQUFHLENBQUMsR0FBRyxFQUFFLENBQUMsR0FBRyxFQUFFLEdBQUcsRUFBRSxFQUFFLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQztBQUUzRCxNQUFNLENBQUMsTUFBTSxDQUFDLElBQUksRUFBRSxHQUFHLEVBQUU7SUFDckIsTUFBTSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsRUFBRSxDQUFDLFFBQVEsQ0FBQyx5QkFBeUIsS0FBSyxDQUFDLElBQUksRUFBRSxDQUFDLENBQUMsQ0FBQztJQUN6RSxPQUFPLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxDQUFDO0FBQ3pCLENBQUMsQ0FBQyxDQUFDIn0=