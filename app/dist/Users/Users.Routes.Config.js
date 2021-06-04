"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersRoutes = void 0;
const Common_Routes_Config_1 = require("../Common/Common.Routes.Config");
const Response_1 = require("../Data/Types/API/Response");
const Error_1 = require("../Data/Types/API/Error");
const Worlds = require("../Data/Worlds.json");
class UsersRoutes extends Common_Routes_Config_1.CommonRoutesConfig {
    constructor(App) {
        super(App, "UsersRoutes");
        this.ResponseCode = {
            SUCCESS: 200,
            NOT_FOUND: 404
        };
    }
    ConfigureRoutes() {
        this.App.route("/worlds")
            .get((_, res) => res.status(this.ResponseCode.SUCCESS)
            .send(JSON.stringify(new Response_1.APIResponse(true, Worlds))));
        this.App.route("/worlds/:worldName")
            .all((_, $, next) => next())
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
                const err = new Error_1.APIError(this.ResponseCode.NOT_FOUND, "World not found.");
                return res.status(err.Code)
                    .send(JSON.stringify(new Response_1.APIResponse(false, err)));
            }
            else
                return res.status(this.ResponseCode.SUCCESS)
                    .send(new Response_1.APIResponse(true, world));
        });
        return this.App;
    }
}
exports.UsersRoutes = UsersRoutes;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiVXNlcnMuUm91dGVzLkNvbmZpZy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9Vc2Vycy9Vc2Vycy5Sb3V0ZXMuQ29uZmlnLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUNBLHlFQUFvRTtBQUVwRSx5REFBeUQ7QUFDekQsbURBQW1EO0FBQ25ELDhDQUErQztBQUUvQyxNQUFhLFdBQVksU0FBUSx5Q0FBa0I7SUFNL0MsWUFDSSxHQUFnQjtRQUVoQixLQUFLLENBQUMsR0FBRyxFQUFFLGFBQWEsQ0FBQyxDQUFDO1FBUmQsaUJBQVksR0FBRztZQUMzQixPQUFPLEVBQUUsR0FBRztZQUNaLFNBQVMsRUFBRSxHQUFHO1NBQ2pCLENBQUE7SUFNRCxDQUFDO0lBRU0sZUFBZTtRQUNsQixJQUFJLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxTQUFTLENBQUM7YUFDcEIsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFFLEdBQUcsRUFBRSxFQUFFLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLE9BQU8sQ0FBQzthQUNqRCxJQUFJLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLHNCQUFXLENBQUMsSUFBSSxFQUFFLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBRTlELElBQUksQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLG9CQUFvQixDQUFDO2FBQy9CLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsSUFBSSxFQUFFLEVBQUUsQ0FBQyxJQUFJLEVBQUUsQ0FBQzthQUMzQixHQUFHLENBQUMsQ0FBQyxHQUFHLEVBQUUsR0FBRyxFQUFFLEVBQUU7WUFDZCxNQUFNLFNBQVMsR0FBRyxHQUFHLENBQUMsTUFBTSxDQUFDLFNBQVM7aUJBQ2pDLEtBQUssQ0FBQyxHQUFHLENBQUM7aUJBQ1YsSUFBSSxDQUFDLEVBQUUsQ0FBQztpQkFDUixXQUFXLEVBZVgsQ0FBQztZQUVOLE1BQU0sR0FBRyxHQUFVLE1BQU0sQ0FBQyxTQUFTLENBQUMsQ0FBQztZQUNyQyxJQUFJLEtBQUssR0FBVSxHQUFHLENBQUM7WUFFdkIsSUFBSSxDQUFDLEdBQUcsRUFBRTtnQkFDTixNQUFNLEdBQUcsR0FBRyxJQUFJLEdBQUcsQ0FBZ0IsTUFBTSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO2dCQUMzRCxHQUFHLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxFQUFFO29CQUNaLElBQUksQ0FBQyxDQUFDLFlBQVk7d0JBQ2QsR0FBRyxDQUFDLE1BQU0sQ0FBQyxTQUFTOzZCQUNmLFdBQVcsRUFBRTs2QkFDYixLQUFLLENBQUMsR0FBRyxDQUFDOzZCQUNWLElBQUksQ0FBQyxFQUFFLENBQUM7d0JBQ2YsS0FBSyxHQUFHLENBQUMsQ0FBQztnQkFDaEIsQ0FBQyxDQUFDLENBQUE7YUFDTDtZQUVELElBQUksQ0FBQyxLQUFLLEVBQUU7Z0JBQ1IsTUFBTSxHQUFHLEdBQUcsSUFBSSxnQkFBUSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsU0FBUyxFQUFFLGtCQUFrQixDQUFDLENBQUM7Z0JBQzFFLE9BQU8sR0FBRyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDO3FCQUN0QixJQUFJLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLHNCQUFXLENBQUMsS0FBSyxFQUFFLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQTthQUN6RDs7Z0JBQ0csT0FBTyxHQUFHLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsT0FBTyxDQUFDO3FCQUN2QyxJQUFJLENBQUMsSUFBSSxzQkFBVyxDQUFDLElBQUksRUFBRSxLQUFLLENBQUMsQ0FBQyxDQUFDO1FBQ2hELENBQUMsQ0FBQyxDQUFDO1FBRVAsT0FBTyxJQUFJLENBQUMsR0FBRyxDQUFDO0lBQ3BCLENBQUM7Q0FDSjtBQWxFRCxrQ0FrRUMifQ==