import { ADV, ASCII, EN, GROUP, ID, NAME, NEW, SET } from "@/constants";
import { getIsPlaytest } from "@/utils";

const LEGACY_SETS = ["Jyhad", "VTES", "DS", "AH", "Sabbat", "SW", "FN", "BL"];

const getCardImageUrl = (card, set, language) => {
  const isPlaytest = getIsPlaytest(card[ID]);
  const cardNameFixed = card[ASCII].toLowerCase().replace(/[\s,:!?'".\-()/]/g, "");
  const legacyScanSet = Object.keys(card[SET]).findLast((set) => LEGACY_SETS.includes(set));

  let baseUrl;
  let otherUrl;
  let legacyUrl;
  let legacyScanUrl;

  if (card[ID] > 200000) {
    baseUrl = `${import.meta.env.VITE_BASE_URL}/images/cards/${isPlaytest ? "playtest" : EN}/${cardNameFixed}g${card[GROUP].toLowerCase()}${card[ADV][0] ? "adv" : ""}`;

    otherUrl = `${import.meta.env.VITE_BASE_URL}/images/cards/${
      set ? `set/${set}` : language
    }/${cardNameFixed}g${card[GROUP].toLowerCase()}${card[ADV][0] ? "adv" : ""}`;

    legacyUrl = `${import.meta.env.VITE_BASE_URL}/images/cards/legacy/${card[NAME].replace(/,/g, "")}${card[ADV][0] ? " ADV" : ""}${card[NEW] ? ` G${card[GROUP]}` : ""}`;

    legacyScanUrl = legacyScanSet
      ? `${import.meta.env.VITE_BASE_URL}/images/cards/set/${legacyScanSet.toLowerCase()}/${cardNameFixed}g${card[GROUP].toLowerCase()}${card[ADV][0] ? "adv" : ""}`
      : null;
  } else {
    baseUrl = `${import.meta.env.VITE_BASE_URL}/images/cards/${
      isPlaytest ? "playtest" : EN
    }/${cardNameFixed}`;

    otherUrl = `${import.meta.env.VITE_BASE_URL}/images/cards/${
      set ? `set/${set}` : language
    }/${cardNameFixed}`;

    legacyUrl = `${import.meta.env.VITE_BASE_URL}/images/cards/legacy/${card[NAME].replace(/,/g, "")}`;

    legacyScanUrl = legacyScanSet
      ? `${import.meta.env.VITE_BASE_URL}/images/cards/set/${legacyScanSet.toLowerCase()}/${cardNameFixed}`
      : null;
  }

  return { baseUrl, otherUrl, legacyUrl, legacyScanUrl };
};

export default getCardImageUrl;
