"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersRoutes = void 0;
const Common_Routes_Config_1 = require("../Common/Common.Routes.Config");
class UsersRoutes extends Common_Routes_Config_1.CommonRoutesConfig {
    constructor(App) {
        super(App, "UsersRoutes");
    }
    ConfigureRoutes() {
        this.App.route("/worlds")
            .get((req, res) => res.status(200).send("List worlds"));
        this.App.route("/worlds/:worldName")
            .all((req, res, next) => next())
            .get((req, res) => res.status(200).send(`GET requested for world ${req.params.worldName}`));
        return this.App;
    }
}
exports.UsersRoutes = UsersRoutes;
//# sourceMappingURL=Users.Routes.Config.js.map