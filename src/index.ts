import { join } from "path";
import { readdirSync } from "fs";

import { capitalize } from "./utility";
import { Log } from "./log";
import app from "./app";

const port = process.env["PORT"] ?? 3000;

app.get("/");
try {
  const routesPath = join(__dirname, "..", "dist", "routes");
  const routeFiles = readdirSync(routesPath).filter(file => file.endsWith(".js"));
  for (const filePath of routeFiles)
    require(`${routesPath}/${filePath}`);

  const server = app.listen(port, () => {
    routeFiles.forEach(path => Log.info(`Configured ${path.split(".js")[0].split("-").map(capitalize).join(" ")} route`));
    Log.info(`Local server running @ http://localhost:${port}`);
  });

  server.on("error", e => Log.fatal(`Server error: ${e.message}`));
} catch (e) {
  Log.fatal(e as string);
}
