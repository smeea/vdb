import { getTags } from "./getTags.js";
import twdDecks from "./twd_decks.json" with { type: "json" };
import cryptCardBase from "./cardbase_crypt.json" with { type: "json" };
import libraryCardBase from "./cardbase_lib.json" with { type: "json" };
import fs from "fs";

Object.values(twdDecks).forEach((d) => {
  const crypt = {};
  const library = {};
  Object.keys(d.cards).forEach((cardid) => {
    const q = d.cards[cardid];
    const c = cardid > 200000 ? cryptCardBase[cardid] : libraryCardBase[cardid];
    const src = cardid > 200000 ? crypt : library;

    src[cardid] = {
      c: c,
      q: q,
    };
  });

  const tags = getTags(crypt, library);
  d.tags = [...tags.superior, ...tags.base];
});

const twdDecksJson = JSON.stringify(twdDecks);

fs.writeFile("twd_decks.json", twdDecksJson, "utf8", () => {});
