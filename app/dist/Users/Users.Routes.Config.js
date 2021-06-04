"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersRoutes = void 0;
const Common_Routes_Config_1 = require("../Common/Common.Routes.Config");
const Util_1 = require("../Util");
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
                        Util_1.ToTitleCase(req.params.worldName
                            .toLowerCase())
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiVXNlcnMuUm91dGVzLkNvbmZpZy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9Vc2Vycy9Vc2Vycy5Sb3V0ZXMuQ29uZmlnLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUNBLHlFQUFvRTtBQUNwRSxrQ0FBc0M7QUFHdEMsOENBQStDO0FBRy9DLE1BQWEsV0FBWSxTQUFRLHlDQUFrQjtJQUMvQyxZQUNJLEdBQWdCO1FBRWhCLEtBQUssQ0FBQyxHQUFHLEVBQUUsYUFBYSxDQUFDLENBQUM7SUFDOUIsQ0FBQztJQUVNLGVBQWU7UUFDbEIsSUFBSSxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsU0FBUyxDQUFDO2FBQ3BCLEdBQUcsQ0FBQyxDQUFDLEdBQUcsRUFBRSxHQUFHLEVBQUUsRUFBRSxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBRXJFLElBQUksQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLG9CQUFvQixDQUFDO2FBQy9CLEdBQUcsQ0FBQyxDQUFDLEdBQUcsRUFBRSxHQUFHLEVBQUUsSUFBSSxFQUFFLEVBQUUsQ0FBQyxJQUFJLEVBQUUsQ0FBQzthQUMvQixHQUFHLENBQUMsQ0FBQyxHQUFHLEVBQUUsR0FBRyxFQUFFLEVBQUU7WUFDZCxNQUFNLFNBQVMsR0FBRyxHQUFHLENBQUMsTUFBTSxDQUFDLFNBQVM7aUJBQ2pDLEtBQUssQ0FBQyxHQUFHLENBQUM7aUJBQ1YsSUFBSSxDQUFDLEVBQUUsQ0FBQztpQkFDUixXQUFXLEVBR1gsQ0FBQztZQUVOLE1BQU0sR0FBRyxHQUFHLE1BQU0sQ0FBQyxTQUFTLENBQUMsQ0FBQztZQUM5QixJQUFJLEtBQUssR0FBVSxHQUFHLENBQUM7WUFFdkIsSUFBSSxDQUFDLEdBQUcsRUFBRTtnQkFDTixNQUFNLEdBQUcsR0FBRyxJQUFJLEdBQUcsQ0FBZ0IsTUFBTSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO2dCQUMzRCxHQUFHLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxFQUFFO29CQUNaLElBQUksQ0FBQyxDQUFDLFlBQVk7d0JBQ2Qsa0JBQVcsQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLFNBQVM7NkJBQzNCLFdBQVcsRUFBRSxDQUFDOzZCQUNkLEtBQUssQ0FBQyxHQUFHLENBQUM7NkJBQ1YsSUFBSSxDQUFDLEVBQUUsQ0FBQzt3QkFDZixLQUFLLEdBQUcsQ0FBQyxDQUFDO2dCQUNoQixDQUFDLENBQUMsQ0FBQTthQUNMO1lBRUQsSUFBSSxDQUFDLEtBQUssRUFBRTtnQkFDUixNQUFNLEdBQUcsR0FBYTtvQkFDbEIsSUFBSSxFQUFFLEdBQUc7b0JBQ1QsT0FBTyxFQUFFLGtCQUFrQjtpQkFDOUIsQ0FBQTtnQkFDRCxNQUFNLFFBQVEsR0FBZ0I7b0JBQzFCLE9BQU8sRUFBRSxLQUFLO29CQUNkLE9BQU8sRUFBRSxHQUFHO2lCQUNmLENBQUE7Z0JBQ0QsT0FBTyxHQUFHLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFBO2FBQzdEO2lCQUFNO2dCQUNILE1BQU0sUUFBUSxHQUFnQjtvQkFDMUIsT0FBTyxFQUFFLElBQUk7b0JBQ2IsT0FBTyxFQUFFLEtBQUs7aUJBQ2pCLENBQUE7Z0JBQ0QsT0FBTyxHQUFHLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQzthQUN6QztRQUNMLENBQUMsQ0FBQyxDQUFDO1FBRVAsT0FBTyxJQUFJLENBQUMsR0FBRyxDQUFDO0lBQ3BCLENBQUM7Q0FDSjtBQTFERCxrQ0EwREMifQ==