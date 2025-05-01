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

  app.listen(port, () => {
    routeFiles.forEach(path => Log.info(`Configured ${capitalize(path.split(".js").slice(0, -1).join(""))} route`));
    Log.info(`Local server running @ https://localhost:${port}`);
  });
} catch (e) {
  throw new Error(e as string);
}