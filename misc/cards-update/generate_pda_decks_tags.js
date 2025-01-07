import fs from "fs";
import sqlite3 from "sqlite3";
import { Parser } from "pickleparser";
import { getTags } from "./getTags.js";
import cryptCardBase from "./cardbase_crypt.json" with { type: "json" };
import libraryCardBase from "./cardbase_lib.json" with { type: "json" };

const db = new sqlite3.Database("../../backend/app.db");
const parser = new Parser();

db.serialize(() => {
  db.all("SELECT * FROM deck WHERE public_parent IS NOT NULL", (err, decks) => {
    const pdaDecks = {};

    decks.forEach((d) => {
      const cards = parser.parse(d.cards);

      const crypt = {};
      const library = {};
      Object.keys(cards).forEach((cardid) => {
        const q = cards[cardid];
        const c =
          cardid > 200000 ? cryptCardBase[cardid] : libraryCardBase[cardid];
        const src = cardid > 200000 ? crypt : library;
        src[cardid] = {
          c: c,
          q: q,
        };
      });

      const deckid = d.deckid;
      const tags = getTags(crypt, library);
      pdaDecks[deckid] = tags;
    });

    const pdaTagsJson = JSON.stringify(pdaDecks);
    fs.writeFile("pda_tags.json", pdaTagsJson, "utf8", () => {});
  });

  db.close();
});
