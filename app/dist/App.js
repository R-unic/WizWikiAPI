"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const express_winston_1 = require("express-winston");
const winston_1 = require("winston");
const process_1 = require("process");
const Users_Routes_Config_1 = require("./Users/Users.Routes.Config");
const express_1 = tslib_1.__importDefault(require("express"));
const debug_1 = tslib_1.__importDefault(require("debug"));
const cors_1 = tslib_1.__importDefault(require("cors"));
const app = express_1.default();
const port = process_1.env.PORT || 3000;
const running = `Server running http://localhost:${port}`;
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
    .get("/", (req, res) => res.status(200).send(running))
    .listen(port, () => {
    routes.forEach(route => debugLog(`Routes configured for ${route.Name}`));
    console.log(running);
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQXBwLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL0FwcC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSxxREFBd0Q7QUFDeEQscUNBQTZDO0FBQzdDLHFDQUE4QjtBQUU5QixxRUFBMEQ7QUFDMUQsOERBQStDO0FBQy9DLDBEQUF5QztBQUN6Qyx3REFBd0I7QUFFeEIsTUFBTSxHQUFHLEdBQWdCLGlCQUFPLEVBQUUsQ0FBQztBQUNuQyxNQUFNLElBQUksR0FBRyxhQUFHLENBQUMsSUFBSSxJQUFJLElBQUksQ0FBQztBQUM5QixNQUFNLE9BQU8sR0FBRyxtQ0FBbUMsSUFBSSxFQUFFLENBQUM7QUFDMUQsTUFBTSxNQUFNLEdBQXlCLEVBQUUsQ0FBQztBQUN4QyxNQUFNLFFBQVEsR0FBYyxlQUFLLENBQUMsS0FBSyxDQUFDLENBQUM7QUFFekMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxpQkFBTyxDQUFDLElBQUksRUFBRSxDQUFDLENBQUM7QUFDeEIsR0FBRyxDQUFDLEdBQUcsQ0FBQyxjQUFJLEVBQUUsQ0FBQyxDQUFDO0FBRWhCLE1BQU0sYUFBYSxHQUFrQjtJQUNqQyxVQUFVLEVBQUUsQ0FBQyxJQUFJLG9CQUFVLENBQUMsT0FBTyxFQUFFLENBQUM7SUFDdEMsTUFBTSxFQUFFLGdCQUFNLENBQUMsT0FBTyxDQUNsQixnQkFBTSxDQUFDLElBQUksRUFBRSxFQUNiLGdCQUFNLENBQUMsV0FBVyxFQUFFLEVBQ3BCLGdCQUFNLENBQUMsUUFBUSxDQUFDLEVBQUUsR0FBRyxFQUFFLElBQUksRUFBRSxDQUFDLENBQ2pDO0NBQ0osQ0FBQTtBQUVELElBQUksQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLEtBQUs7SUFDbEIsYUFBYSxDQUFDLElBQUksR0FBRyxLQUFLLENBQUM7QUFFL0IsR0FBRyxDQUFDLEdBQUcsQ0FBQyx3QkFBTSxDQUFDLGFBQWEsQ0FBQyxDQUFDLENBQUM7QUFDL0IsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLGlDQUFXLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztBQUVsQyxHQUFHO0tBQ0UsR0FBRyxDQUFDLEdBQUcsRUFBRSxDQUFDLEdBQUcsRUFBRSxHQUFHLEVBQUUsRUFBRSxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO0tBQ3JELE1BQU0sQ0FBQyxJQUFJLEVBQUUsR0FBRyxFQUFFO0lBQ2YsTUFBTSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsRUFBRSxDQUFDLFFBQVEsQ0FBQyx5QkFBeUIsS0FBSyxDQUFDLElBQUksRUFBRSxDQUFDLENBQUMsQ0FBQztJQUN6RSxPQUFPLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxDQUFDO0FBQ3pCLENBQUMsQ0FBQyxDQUFDIn0=