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
            let world = obj;
            if (!obj) {
                const map = new Map(Object.entries(Worlds));
                map.forEach(w => {
                    if (w.Abbreviation ===
                        req.params.worldName
                            .toLowerCase()
                            .split(" ")
                            .join(""))
                        world = w;
                });
            }
            if (!world) {
                const err = {
                    code: 404,
                    message: "World not found."
                };
                const response = {
                    success: false,
                    results: err
                };
                return res.status(err.code).send(JSON.stringify(response));
            }
            else {
                const response = {
                    success: true,
                    results: world
                };
                return res.status(200).send(response);
            }
        });
        return this.App;
    }
}
exports.UsersRoutes = UsersRoutes;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiVXNlcnMuUm91dGVzLkNvbmZpZy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9Vc2Vycy9Vc2Vycy5Sb3V0ZXMuQ29uZmlnLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUNBLHlFQUFvRTtBQUlwRSw4Q0FBK0M7QUFHL0MsTUFBYSxXQUFZLFNBQVEseUNBQWtCO0lBQy9DLFlBQ0ksR0FBZ0I7UUFFaEIsS0FBSyxDQUFDLEdBQUcsRUFBRSxhQUFhLENBQUMsQ0FBQztJQUM5QixDQUFDO0lBRU0sZUFBZTtRQUNsQixJQUFJLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxTQUFTLENBQUM7YUFDcEIsR0FBRyxDQUFDLENBQUMsR0FBRyxFQUFFLEdBQUcsRUFBRSxFQUFFLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFFckUsSUFBSSxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsb0JBQW9CLENBQUM7YUFDL0IsR0FBRyxDQUFDLENBQUMsR0FBRyxFQUFFLEdBQUcsRUFBRSxJQUFJLEVBQUUsRUFBRSxDQUFDLElBQUksRUFBRSxDQUFDO2FBQy9CLEdBQUcsQ0FBQyxDQUFDLEdBQUcsRUFBRSxHQUFHLEVBQUUsRUFBRTtZQUNkLE1BQU0sU0FBUyxHQUFHLEdBQUcsQ0FBQyxNQUFNLENBQUMsU0FBUztpQkFDakMsS0FBSyxDQUFDLEdBQUcsQ0FBQztpQkFDVixJQUFJLENBQUMsRUFBRSxDQUFDO2lCQUNSLFdBQVcsRUFHWCxDQUFDO1lBRU4sTUFBTSxHQUFHLEdBQUcsTUFBTSxDQUFDLFNBQVMsQ0FBQyxDQUFDO1lBQzlCLElBQUksS0FBSyxHQUFVLEdBQUcsQ0FBQztZQUV2QixJQUFJLENBQUMsR0FBRyxFQUFFO2dCQUNOLE1BQU0sR0FBRyxHQUFHLElBQUksR0FBRyxDQUFnQixNQUFNLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7Z0JBQzNELEdBQUcsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLEVBQUU7b0JBQ1osSUFBSSxDQUFDLENBQUMsWUFBWTt3QkFDZCxHQUFHLENBQUMsTUFBTSxDQUFDLFNBQVM7NkJBQ2YsV0FBVyxFQUFFOzZCQUNiLEtBQUssQ0FBQyxHQUFHLENBQUM7NkJBQ1YsSUFBSSxDQUFDLEVBQUUsQ0FBQzt3QkFDZixLQUFLLEdBQUcsQ0FBQyxDQUFDO2dCQUNoQixDQUFDLENBQUMsQ0FBQTthQUNMO1lBRUQsSUFBSSxDQUFDLEtBQUssRUFBRTtnQkFDUixNQUFNLEdBQUcsR0FBYTtvQkFDbEIsSUFBSSxFQUFFLEdBQUc7b0JBQ1QsT0FBTyxFQUFFLGtCQUFrQjtpQkFDOUIsQ0FBQTtnQkFDRCxNQUFNLFFBQVEsR0FBZ0I7b0JBQzFCLE9BQU8sRUFBRSxLQUFLO29CQUNkLE9BQU8sRUFBRSxHQUFHO2lCQUNmLENBQUE7Z0JBQ0QsT0FBTyxHQUFHLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFBO2FBQzdEO2lCQUFNO2dCQUNILE1BQU0sUUFBUSxHQUFnQjtvQkFDMUIsT0FBTyxFQUFFLElBQUk7b0JBQ2IsT0FBTyxFQUFFLEtBQUs7aUJBQ2pCLENBQUE7Z0JBQ0QsT0FBTyxHQUFHLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQzthQUN6QztRQUNMLENBQUMsQ0FBQyxDQUFDO1FBRVAsT0FBTyxJQUFJLENBQUMsR0FBRyxDQUFDO0lBQ3BCLENBQUM7Q0FDSjtBQTFERCxrQ0EwREMifQ==