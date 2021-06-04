"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const express_winston_1 = require("express-winston");
const winston_1 = require("winston");
const fs_1 = require("fs");
const process_1 = require("process");
const Users_Routes_Config_1 = require("./Users/Users.Routes.Config");
const express_1 = tslib_1.__importStar(require("express"));
const debug_1 = tslib_1.__importDefault(require("debug"));
const cors_1 = tslib_1.__importDefault(require("cors"));
const app = express_1.default(); // Create express app
const port = process_1.env.PORT || 3000; // 
const routes = [];
const debugLog = debug_1.default("App");
app.use(express_1.json());
app.use(cors_1.default());
const loggerOptions = {
    transports: [new winston_1.transports.Console()],
    format: winston_1.format.combine(winston_1.format.json(), winston_1.format.prettyPrint(), winston_1.format.colorize({ all: true }))
};
if (!process.env.DEBUG)
    loggerOptions.meta = false;
app.use(express_winston_1.logger(loggerOptions));
const usersRoutes = new Users_Routes_Config_1.UsersRoutes(app);
routes.push(usersRoutes);
try {
    const homepageHTML = fs_1.readFileSync(__dirname + "/../html/index.html", { encoding: "utf8" });
    app.get("/", (req, res) => res.status(usersRoutes.ResponseCode.SUCCESS)
        .send(homepageHTML)).listen(port, () => {
        routes.forEach(route => debugLog(`Routes configured for ${route.Name}`));
        console.log(`Server is listening @https://wizard101-api.herokuapp.com`);
    });
}
catch (err) {
    winston_1.error(err);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQXBwLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL0FwcC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSxxREFBd0Q7QUFDeEQscUNBQW9EO0FBQ3BELDJCQUFrQztBQUNsQyxxQ0FBOEI7QUFFOUIscUVBQTBEO0FBQzFELDJEQUFxRDtBQUNyRCwwREFBeUM7QUFDekMsd0RBQXdCO0FBRXhCLE1BQU0sR0FBRyxHQUFnQixpQkFBTyxFQUFFLENBQUMsQ0FBQyxxQkFBcUI7QUFDekQsTUFBTSxJQUFJLEdBQUcsYUFBRyxDQUFDLElBQUksSUFBSSxJQUFJLENBQUMsQ0FBQyxHQUFHO0FBQ2xDLE1BQU0sTUFBTSxHQUF5QixFQUFFLENBQUM7QUFDeEMsTUFBTSxRQUFRLEdBQWMsZUFBSyxDQUFDLEtBQUssQ0FBQyxDQUFDO0FBRXpDLEdBQUcsQ0FBQyxHQUFHLENBQUMsY0FBSSxFQUFFLENBQUMsQ0FBQztBQUNoQixHQUFHLENBQUMsR0FBRyxDQUFDLGNBQUksRUFBRSxDQUFDLENBQUM7QUFFaEIsTUFBTSxhQUFhLEdBQWtCO0lBQ2pDLFVBQVUsRUFBRSxDQUFDLElBQUksb0JBQVUsQ0FBQyxPQUFPLEVBQUUsQ0FBQztJQUN0QyxNQUFNLEVBQUUsZ0JBQU0sQ0FBQyxPQUFPLENBQ2xCLGdCQUFNLENBQUMsSUFBSSxFQUFFLEVBQ2IsZ0JBQU0sQ0FBQyxXQUFXLEVBQUUsRUFDcEIsZ0JBQU0sQ0FBQyxRQUFRLENBQUMsRUFBRSxHQUFHLEVBQUUsSUFBSSxFQUFFLENBQUMsQ0FDakM7Q0FDSixDQUFBO0FBRUQsSUFBSSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsS0FBSztJQUNsQixhQUFhLENBQUMsSUFBSSxHQUFHLEtBQUssQ0FBQztBQUUvQixHQUFHLENBQUMsR0FBRyxDQUFDLHdCQUFNLENBQUMsYUFBYSxDQUFDLENBQUMsQ0FBQztBQUUvQixNQUFNLFdBQVcsR0FBRyxJQUFJLGlDQUFXLENBQUMsR0FBRyxDQUFDLENBQUM7QUFDekMsTUFBTSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQztBQUV6QixJQUFJO0lBQ0EsTUFBTSxZQUFZLEdBQUcsaUJBQVksQ0FBQyxTQUFTLEdBQUcscUJBQXFCLEVBQUUsRUFBRSxRQUFRLEVBQUUsTUFBTSxFQUFFLENBQUMsQ0FBQztJQUMzRixHQUFHLENBQUMsR0FBRyxDQUFDLEdBQUcsRUFBRSxDQUFDLEdBQUcsRUFBRSxHQUFHLEVBQUUsRUFBRSxDQUN0QixHQUFHLENBQUMsTUFBTSxDQUFDLFdBQVcsQ0FBQyxZQUFZLENBQUMsT0FBTyxDQUFDO1NBQ3ZDLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FDMUIsQ0FBQyxNQUFNLENBQUMsSUFBSSxFQUFFLEdBQUcsRUFBRTtRQUNoQixNQUFNLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxFQUFFLENBQUMsUUFBUSxDQUFDLHlCQUF5QixLQUFLLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQyxDQUFDO1FBQ3pFLE9BQU8sQ0FBQyxHQUFHLENBQUMsMERBQTBELENBQUMsQ0FBQztJQUM1RSxDQUFDLENBQUMsQ0FBQztDQUNOO0FBQUMsT0FBTyxHQUFHLEVBQUU7SUFDVixlQUFLLENBQUMsR0FBRyxDQUFDLENBQUM7Q0FDZCJ9