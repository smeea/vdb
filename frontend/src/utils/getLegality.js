import { differenceInDays } from "date-fns";
import setsAndPrecons from "@/assets/data/setsAndPrecons.json";
import { DATE, PLAYTEST, POD, PROMO, SET } from "@/constants";

export const getLegality = (card) => {
  const sets = Object.keys(card[SET]).filter((s) => s !== PLAYTEST);
  if (sets.length > 1 || [POD, PROMO].includes(sets[0])) return false;
  if (sets.length === 0) return PLAYTEST;

  const legalDate = setsAndPrecons[sets[0]][DATE];

  if (differenceInDays(legalDate, new Date()) < 0) return false;
  return legalDate;
};

export default getLegality;
