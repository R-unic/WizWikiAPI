"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersRoutes = void 0;
const Common_Routes_Config_1 = require("../Common/Common.Routes.Config");
const Worlds = require("../Data/Worlds.json");
class UsersRoutes extends Common_Routes_Config_1.CommonRoutesConfig {
    constructor(App) {
        super(App, "UsersRoutes");
    }
    ConfigureRoutes() {
        this.App.route("/worlds")
            .get((req, res) => res.status(200).send(JSON.stringify(Worlds)));
        this.App.route("/worlds/:worldName")
            .all((req, res, next) => next())
            .get((req, res) => {
            const worldName = req.params.worldName
                .split(" ")
                .join("")
                .toLowerCase();
            const obj = Worlds[worldName];
            return res.status(200).send(JSON.stringify(obj));
        });
        return this.App;
    }
}
exports.UsersRoutes = UsersRoutes;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiVXNlcnMuUm91dGVzLkNvbmZpZy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9Vc2Vycy9Vc2Vycy5Sb3V0ZXMuQ29uZmlnLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBLHlFQUFvRTtBQUVwRSw4Q0FBK0M7QUFFL0MsTUFBYSxXQUFZLFNBQVEseUNBQWtCO0lBQy9DLFlBQ0ksR0FBZ0I7UUFFaEIsS0FBSyxDQUFDLEdBQUcsRUFBRSxhQUFhLENBQUMsQ0FBQztJQUM5QixDQUFDO0lBRU0sZUFBZTtRQUNsQixJQUFJLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxTQUFTLENBQUM7YUFDcEIsR0FBRyxDQUFDLENBQUMsR0FBRyxFQUFFLEdBQUcsRUFBRSxFQUFFLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFFckUsSUFBSSxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsb0JBQW9CLENBQUM7YUFDL0IsR0FBRyxDQUFDLENBQUMsR0FBRyxFQUFFLEdBQUcsRUFBRSxJQUFJLEVBQUUsRUFBRSxDQUFDLElBQUksRUFBRSxDQUFDO2FBQy9CLEdBQUcsQ0FBQyxDQUFDLEdBQUcsRUFBRSxHQUFHLEVBQUUsRUFBRTtZQUNkLE1BQU0sU0FBUyxHQUFHLEdBQUcsQ0FBQyxNQUFNLENBQUMsU0FBUztpQkFDakMsS0FBSyxDQUFDLEdBQUcsQ0FBQztpQkFDVixJQUFJLENBQUMsRUFBRSxDQUFDO2lCQUNSLFdBQVcsRUFHWCxDQUFDO1lBRU4sTUFBTSxHQUFHLEdBQUcsTUFBTSxDQUFDLFNBQVMsQ0FBQyxDQUFDO1lBQzlCLE9BQU8sR0FBRyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO1FBQ3JELENBQUMsQ0FBQyxDQUFDO1FBRVAsT0FBTyxJQUFJLENBQUMsR0FBRyxDQUFDO0lBQ3BCLENBQUM7Q0FDSjtBQTVCRCxrQ0E0QkMifQ==