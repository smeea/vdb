import { ADV, ASCII, EN, GROUP, ID, NEW, SET } from "@/constants";
import { getIsPlaytest } from "@/utils";

const LEGACY_SETS = ["Jyhad", "VTES", "DS", "AH", "Sabbat", "SW", "FN", "BL"];

const getCardImageUrl = (card, set, language) => {
  const urlPrefix = `${import.meta.env.VITE_BASE_URL}/images/cards`;
  const cardNameFixed = `${card[ASCII].toLowerCase().replace(/[\s,:!?'".\-()/]/g, "")}${card[ID] > 200000 ? `g${card[GROUP].toLowerCase()}${card[ADV]?.[0] ? "adv" : ""}` : ""}`;
  const legacyNameFixed = `${card[ASCII].toLowerCase().replace(/[\s,:!?'".\-()/]/g, "")}${card[ID] > 200000 ? `${card[ADV]?.[0] ? "adv" : ""}${card[NEW] ? `g${card[GROUP]}` : ""}` : ""}`;

  const legacyScanSet = Object.keys(card[SET]).findLast((set) => LEGACY_SETS.includes(set));

  const baseUrl = `${urlPrefix}/${getIsPlaytest(card[ID]) ? "playtest" : EN}/${cardNameFixed}`;
  const otherUrl = `${urlPrefix}/${set ? `set/${set}` : language}/${cardNameFixed}`;
  const legacyUrl = `${urlPrefix}/legacy/${legacyNameFixed}`;
  const legacyScanUrl = legacyScanSet
    ? `${urlPrefix}/set/${legacyScanSet.toLowerCase()}/${cardNameFixed}`
    : null;

  return { baseUrl, otherUrl, legacyUrl, legacyScanUrl };
};

export default getCardImageUrl;
