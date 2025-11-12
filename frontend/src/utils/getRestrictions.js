import {
  BANNED,
  CRYPT,
  HAS_BANNED,
  HAS_LIMITED,
  HAS_PLAYTEST,
  ID,
  LIBRARY,
  PLAYTEST,
} from "@/constants";
import { LEGAL_RESTRICTIONS } from "../constants";

export const getRestrictions = (deck, limitedCards) => {
  if (!deck) return {};

  let hasPlaytest;
  let hasBanned;
  let hasLimited = null;
  Object.values(deck[CRYPT]).forEach((card) => {
    if (card.q < 1) return;
    if (card.c[BANNED]) hasBanned = true;
    if (card[LEGAL_RESTRICTIONS] === PLAYTEST) hasPlaytest = true;
    if (limitedCards && !Object.keys(limitedCards[CRYPT]).includes(card.c[ID].toString())) {
      hasLimited += card.q;
    }
  });

  Object.values(deck[LIBRARY]).forEach((card) => {
    if (card.q < 1) return;
    if (card.c[BANNED]) hasBanned = true;
    if (card[LEGAL_RESTRICTIONS] === PLAYTEST) hasPlaytest = true;
    if (limitedCards && !Object.keys(limitedCards[LIBRARY]).includes(card.c[ID].toString())) {
      hasLimited += card.q;
    }
  });

  return {
    [HAS_BANNED]: hasBanned,
    [HAS_LIMITED]: hasLimited,
    [HAS_PLAYTEST]: hasPlaytest,
  };
};

export default getRestrictions;
