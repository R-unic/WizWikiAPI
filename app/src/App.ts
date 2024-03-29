import { readdirSync, readFileSync } from "fs";
import { env } from "process";

import { CommonRoutesConfig } from "./Common/Common.Routes.Config";
import { Logger } from "./Util";
import express from "express";
import cors from "cors";
import sass from "node-sass";
import path from "path";

const app = express();
const port = env.PORT || 3000; //
const routes: CommonRoutesConfig[] = [];

function addStyles(...styleNames: string[]): void {
  for (const style of styleNames)
    app.get(`/${style}.css`, (_, res) => {
      const css = sass.renderSync({
        file: path.join(__dirname, "..", "public", style + ".sass")
      }).css.toString();
      res.type("text/css");
      res.send(css);
    });
}

function routeDocs(): void {
  const docsHTML = readFileSync(__dirname + "/../docs/index.html", { encoding: "utf8" });
  const docsHighlightCSS = readFileSync(__dirname + "/../docs/assets/highlight.css", { encoding: "utf8" });
  const docsCSS = readFileSync(__dirname + "/../docs/assets/style.css", { encoding: "utf8" });
  const mainJS = readFileSync(__dirname + "/../docs/assets/main.js", { encoding: "utf8" });
  const searchJS = readFileSync(__dirname + "/../docs/assets/search.js", { encoding: "utf8" });

  addStyles("main", "docs");
  app.get("/docs", (_, res) => res.status(ResponseCode.SUCCESS)
    .setHeader("Content-Type", "text/html")
    .send(
      docsHTML
        .replace(/\<title\>wizwikiapi\<\/title\>/g, "<title>Wiz Wiki API Docs</title>")
        .replace(/\<link rel\=\"stylesheet\" href=\"assets\/highlight\.css"\>/g, `<style>${docsHighlightCSS}</style>`)
        .replace(/\<link rel\=\"stylesheet\" href=\"assets\/style\.css"\>/g, `<style>${docsCSS}</style>`)
        .replace(/\<script src\=\"assets\/main\.js\"\>\<\/script\>/g, `<style>${mainJS}</style>`)
        .replace(/\<script src\=\"assets\/search\.js\"\>\<\/script\>/g, `<style>${searchJS}</style>`)
    ));
}

app.use(express.json());
app.use(cors());
app.use("/docs", express.static(path.join(__dirname, "../docs")));

try {
  const routesPath = path.join(__dirname, "..", "dist", "Routes");
  const routeFiles = readdirSync(routesPath).filter(file => file.endsWith(".js"));
  for (const file of routeFiles) {
    const RouteClass = require(`${routesPath}/${file}`).default;
    routes.push(new RouteClass(app));
  }
} catch (e) {
  throw new Error(<string>e);
}

try {
  const homepageHTML = readFileSync(__dirname + "/../index.html", { encoding: "utf8" });

  routeDocs();
  app.get("/", (_, res) =>
    res.status(ResponseCode.SUCCESS)
      .setHeader("Content-Type", "text/html")
      .send(homepageHTML)
  ).listen(port, () => {
    routes.forEach(route => Logger.Log(`Routes configured for ${route.Name}`));
    Logger.Log(`Server is listening @ http://localhost:${port}`);
  });
} catch (e) {
  throw new Error(<string | undefined>e);
}
