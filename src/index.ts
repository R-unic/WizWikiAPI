import express from "express";
import { getInfobox } from "./utility";

const port = process.env["PORT"] ?? 3000;
const app = express();

app.get("/");
app.get("/spells");
app.get("/spells/:spellName", async (req, res) => {
  const { spellName } = req.params;
  const page = `Spell:${spellName}`;
  res.json(await getInfobox(page));
});

app.listen(port, () => console.log(`Local server running @ https://localhost:${port}`));