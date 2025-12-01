import { differenceInSeconds } from "date-fns";
import {
  ASCII,
  BLOOD,
  CAPACITY,
  CLAN,
  DISCIPLINE,
  GROUP,
  PLAYER,
  POOL,
  RELEASE_DATE,
  SECT,
  TIMESTAMP,
  TWD_DATE,
  TYPE,
} from "@/constants";

export const byName = (a, b) => a.localeCompare(b, "en");

export const byCardName = (a, b) => {
  const nameA = a.c ? a.c[ASCII] : a[ASCII];
  const nameB = b.c ? b.c[ASCII] : b[ASCII];
  return byName(nameA, nameB);
};

export const byClan = (a, b) => {
  const clanA = a.c ? a.c[CLAN] : a[CLAN];
  const clanB = b.c ? b.c[CLAN] : b[CLAN];
  return byName(clanA, clanB);
};

export const byClanOpt = (a, b) => {
  const clanA = a.c ? a.c[CLAN] : a[CLAN];
  const clanB = b.c ? b.c[CLAN] : b[CLAN];
  if (clanA && !clanB) return -1;
  if (!clanA && clanB) return 1;
  return byName(clanA, clanB);
};

export const byGroup = (a, b) => {
  const groupA = a.c ? a.c[GROUP] : a[GROUP];
  const groupB = b.c ? b.c[GROUP] : b[GROUP];
  return groupA - groupB;
};

export const byCapacity = (a, b) => {
  const capacityA = a.c ? a.c[CAPACITY] : a[CAPACITY];
  const capacityB = b.c ? b.c[CAPACITY] : b[CAPACITY];
  return capacityB - capacityA;
};

export const byQuantity = (a, b) => b.q - a.q;

export const byType = (a, b) => {
  const typeA = a.c ? a.c[TYPE] : a[TYPE];
  const typeB = b.c ? b.c[TYPE] : b[TYPE];
  return byName(typeA, typeB);
};

export const byDiscipline = (a, b) => {
  const disciplineA = a.c ? a.c[DISCIPLINE] : a[DISCIPLINE];
  const disciplineB = b.c ? b.c[DISCIPLINE] : b[DISCIPLINE];

  if (disciplineA && !disciplineB) return -1;
  if (!disciplineA && disciplineB) return 1;
  return byName(disciplineA, disciplineB);
};

export const byBloodCost = (a, b) => {
  const costA = a.c ? a.c[BLOOD] : a[BLOOD];
  const costB = b.c ? b.c[BLOOD] : b[BLOOD];
  if (Number.isInteger(costA) && !Number.isInteger(costB)) return -1;
  if (Number.isInteger(costB) && !Number.isInteger(costA)) return 1;
  if (!Number.isInteger(costA) && !Number.isInteger(costB)) return 0;
  return costB - costA;
};

export const byPoolCost = (a, b) => {
  const costA = a.c ? a.c[POOL] : a[POOL];
  const costB = b.c ? b.c[POOL] : b[POOL];
  if (Number.isInteger(costA) && !Number.isInteger(costB)) return -1;
  if (Number.isInteger(costB) && !Number.isInteger(costA)) return 1;
  if (!Number.isInteger(costA) && !Number.isInteger(costB)) return 0;
  return costB - costA;
};

export const bySect = (a, b) => {
  const sectA = a.c ? a.c[SECT] : a[SECT];
  const sectB = b.c ? b.c[SECT] : b[SECT];
  return byName(sectA, sectB);
};

export const byTimestamp = (a, b) => {
  return differenceInSeconds(b[TIMESTAMP], a[TIMESTAMP]);
};

export const byPlayer = (a, b) => {
  if (a[PLAYER] && !b[PLAYER]) return -1;
  if (!a[PLAYER] && b[PLAYER]) return 1;
  if (!a[PLAYER] && !b[PLAYER]) return 0;
  return byName(a[PLAYER], b[PLAYER]);
};

export const byDateWin = (a, b) => {
  if (a[TWD_DATE] && !b[TWD_DATE]) return -1;
  if (!a[TWD_DATE] && b[TWD_DATE]) return 1;
  if (!a[TWD_DATE] && !b[TWD_DATE]) return 0;
  return a[TWD_DATE] < b[TWD_DATE];
};

export const byDatePrint = (a, b) => {
  return b[RELEASE_DATE] > a[RELEASE_DATE];
};
