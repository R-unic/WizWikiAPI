import { join } from "path";
import { readdirSync } from "fs";

import app from "./app";

const port = process.env["PORT"] ?? 3000;

app.get("/");
try {
  const routesPath = join(__dirname, "..", "dist", "routes");
  const routeFiles = readdirSync(routesPath).filter(file => file.endsWith(".js"));
  for (const filePath of routeFiles)
    require(`${routesPath}/${filePath}`);
} catch (e) {
  throw new Error(e as string);
}

app.listen(port, () => console.log(`Local server running @ https://localhost:${port}`));