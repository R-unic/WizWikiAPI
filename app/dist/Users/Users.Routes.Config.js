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
            .get((req, res) => {
            const response = {
                success: true,
                results: Worlds
            };
            return res.status(200).send(JSON.stringify(response));
        });
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiVXNlcnMuUm91dGVzLkNvbmZpZy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9Vc2Vycy9Vc2Vycy5Sb3V0ZXMuQ29uZmlnLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUNBLHlFQUFvRTtBQUlwRSw4Q0FBK0M7QUFFL0MsTUFBYSxXQUFZLFNBQVEseUNBQWtCO0lBQy9DLFlBQ0ksR0FBZ0I7UUFFaEIsS0FBSyxDQUFDLEdBQUcsRUFBRSxhQUFhLENBQUMsQ0FBQztJQUM5QixDQUFDO0lBRU0sZUFBZTtRQUNsQixJQUFJLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxTQUFTLENBQUM7YUFDcEIsR0FBRyxDQUFDLENBQUMsR0FBRyxFQUFFLEdBQUcsRUFBRSxFQUFFO1lBQ2QsTUFBTSxRQUFRLEdBQWdCO2dCQUMxQixPQUFPLEVBQUUsSUFBSTtnQkFDYixPQUFPLEVBQUUsTUFBTTthQUNsQixDQUFBO1lBRUQsT0FBTyxHQUFHLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUE7UUFDekQsQ0FBQyxDQUFDLENBQUM7UUFFUCxJQUFJLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxvQkFBb0IsQ0FBQzthQUMvQixHQUFHLENBQUMsQ0FBQyxHQUFHLEVBQUUsR0FBRyxFQUFFLElBQUksRUFBRSxFQUFFLENBQUMsSUFBSSxFQUFFLENBQUM7YUFDL0IsR0FBRyxDQUFDLENBQUMsR0FBRyxFQUFFLEdBQUcsRUFBRSxFQUFFO1lBQ2QsTUFBTSxTQUFTLEdBQUcsR0FBRyxDQUFDLE1BQU0sQ0FBQyxTQUFTO2lCQUNqQyxLQUFLLENBQUMsR0FBRyxDQUFDO2lCQUNWLElBQUksQ0FBQyxFQUFFLENBQUM7aUJBQ1IsV0FBVyxFQUtYLENBQUM7WUFFTixNQUFNLEdBQUcsR0FBVSxNQUFNLENBQUMsU0FBUyxDQUFDLENBQUM7WUFDckMsSUFBSSxLQUFLLEdBQVUsR0FBRyxDQUFDO1lBRXZCLElBQUksQ0FBQyxHQUFHLEVBQUU7Z0JBQ04sTUFBTSxHQUFHLEdBQUcsSUFBSSxHQUFHLENBQWdCLE1BQU0sQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQztnQkFDM0QsR0FBRyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsRUFBRTtvQkFDWixJQUFJLENBQUMsQ0FBQyxZQUFZO3dCQUNkLEdBQUcsQ0FBQyxNQUFNLENBQUMsU0FBUzs2QkFDZixXQUFXLEVBQUU7NkJBQ2IsS0FBSyxDQUFDLEdBQUcsQ0FBQzs2QkFDVixJQUFJLENBQUMsRUFBRSxDQUFDO3dCQUNmLEtBQUssR0FBRyxDQUFDLENBQUM7Z0JBQ2hCLENBQUMsQ0FBQyxDQUFBO2FBQ0w7WUFFRCxJQUFJLENBQUMsS0FBSyxFQUFFO2dCQUNSLE1BQU0sR0FBRyxHQUFhO29CQUNsQixJQUFJLEVBQUUsR0FBRztvQkFDVCxPQUFPLEVBQUUsa0JBQWtCO2lCQUM5QixDQUFBO2dCQUVELE1BQU0sUUFBUSxHQUFnQjtvQkFDMUIsT0FBTyxFQUFFLEtBQUs7b0JBQ2QsT0FBTyxFQUFFLEdBQUc7aUJBQ2YsQ0FBQTtnQkFFRCxPQUFPLEdBQUcsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUE7YUFDN0Q7aUJBQU07Z0JBQ0gsTUFBTSxRQUFRLEdBQWdCO29CQUMxQixPQUFPLEVBQUUsSUFBSTtvQkFDYixPQUFPLEVBQUUsS0FBSztpQkFDakIsQ0FBQTtnQkFFRCxPQUFPLEdBQUcsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO2FBQ3pDO1FBQ0wsQ0FBQyxDQUFDLENBQUM7UUFFUCxPQUFPLElBQUksQ0FBQyxHQUFHLENBQUM7SUFDcEIsQ0FBQztDQUNKO0FBdEVELGtDQXNFQyJ9