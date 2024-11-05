import { ASCII_NAME, BLOOD_COST, POOL_COST } from '@/constants';

export const byName = (a, b) => a.localeCompare(b, 'en');

export const byCardName = (a, b) => {
  const nameA = a.c ? a.c[ASCII_NAME] : a[ASCII_NAME];
  const nameB = b.c ? b.c[ASCII_NAME] : b[ASCII_NAME];
  return byName(nameA, nameB);
};

export const byClan = (a, b) => {
  const clanA = a.c ? a.c.Clan : a.Clan;
  const clanB = b.c ? b.c.Clan : b.Clan;
  return byName(clanA, clanB);
};

export const byClanOpt = (a, b) => {
  const clanA = a.c ? a.c.Clan : a.Clan;
  const clanB = b.c ? b.c.Clan : b.Clan;
  if (clanA && !clanB) return -1;
  if (!clanA && clanB) return 1;
  return byName(clanA, clanB);
};

export const byGroup = (a, b) => {
  const groupA = a.c ? a.c.Group : a.Group;
  const groupB = b.c ? b.c.Group : b.Group;
  return groupA - groupB;
};

export const byCapacity = (a, b) => {
  const capacityA = a.c ? a.c.Capacity : a.Capacity;
  const capacityB = b.c ? b.c.Capacity : b.Capacity;
  return capacityB - capacityA;
};

export const byQuantity = (a, b) => b.q - a.q;

export const byType = (a, b) => {
  const typeA = a.c ? a.c.Type : a.Type;
  const typeB = b.c ? b.c.Type : b.Type;
  return byName(typeA, typeB);
};

export const byDiscipline = (a, b) => {
  const disciplineA = a.c ? a.c.Discipline : a.Discipline;
  const disciplineB = b.c ? b.c.Discipline : b.Discipline;

  if (disciplineA && !disciplineB) return -1;
  if (!disciplineA && disciplineB) return 1;
  return byName(disciplineA, disciplineB);
};

export const byBloodCost = (a, b) => {
  const costA = a.c ? a.c[BLOOD_COST] : a[BLOOD_COST];
  const costB = b.c ? b.c[BLOOD_COST] : b[BLOOD_COST];
  if (!isNaN(costA) && isNaN(costB)) return -1;
  if (!isNaN(costB) && isNaN(costA)) return 1;
  if (isNaN(costA) && isNaN(costB)) return 0;
  return costB - costA;
};

export const byPoolCost = (a, b) => {
  const costA = a.c ? a.c[POOL_COST] : a[POOL_COST];
  const costB = b.c ? b.c[POOL_COST] : b[POOL_COST];
  if (!isNaN(costA) && isNaN(costB)) return -1;
  if (!isNaN(costB) && isNaN(costA)) return 1;
  if (isNaN(costA) && isNaN(costB)) return 0;
  return costB - costA;
};

export const bySect = (a, b) => {
  const sectA = a.c ? a.c.Sect : a.Sect;
  const sectB = b.c ? b.c.Sect : b.Sect;
  return byName(sectA, sectB);
};

export const byTimestamp = (a, b) => {
  return new Date(b.timestamp) - new Date(a.timestamp);
};

export const byPlayer = (a, b) => {
  if (a.player && !b.player) return -1;
  if (!a.player && b.player) return 1;
  if (!a.player && !b.player) return 0;
  return byName(a.player, b.player);
};

export const byDateWin = (a, b) => {
  if (a.twdDate && !b.twdDate) return -1;
  if (!a.twdDate && b.twdDate) return 1;
  if (!a.twdDate && !b.twdDate) return 0;
  return a.twdDate < b.twdDate;
};

export const byDatePrint = (a, b) => {
  return b.release_date > a.release_date;
};
