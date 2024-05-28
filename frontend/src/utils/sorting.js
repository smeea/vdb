export const byName = (a, b) => {
  const nameA = a.c ? a.c['ASCII Name'] : a['ASCII Name'];
  const nameB = b.c ? b.c['ASCII Name'] : b['ASCII Name'];

  return nameA.localeCompare(nameB, 'en');
};

export const byClan = (a, b) => {
  const clanA = a.c ? a.c.Clan : a.Clan;
  const clanB = b.c ? b.c.Clan : b.Clan;

  return clanA.localeCompare(clanB, 'en');
};

export const byClanOpt = (a, b) => {
  const clanA = a.c ? a.c.Clan : a.Clan;
  const clanB = b.c ? b.c.Clan : b.Clan;

  if (clanA && !clanB) return -1;
  if (!clanA && clanB) return 1;
  if (clanA < clanB) return -1;
  if (clanA > clanB) return 1;
  return 0;
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

export const byQuantity = (a, b) => {
  return b.q - a.q;
};

export const byType = (a, b) => {
  const typeA = a.c ? a.c.Type : a.Type;
  const typeB = b.c ? b.c.Type : b.Type;

  if (typeA < typeB) return -1;
  if (typeA > typeB) return 1;
  return 0;
};

export const byDiscipline = (a, b) => {
  const disciplineA = a.c ? a.c.Discipline : a.Discipline;
  const disciplineB = b.c ? b.c.Discipline : b.Discipline;

  if (disciplineA && !disciplineB) return -1;
  if (!disciplineA && disciplineB) return 1;
  if (disciplineA < disciplineB) return -1;
  if (disciplineA > disciplineB) return 1;
  return 0;
};

export const byBloodCost = (a, b) => {
  const costA = a.c ? a.c['Blood Cost'] : a['Blood Cost'];
  const costB = b.c ? b.c['Blood Cost'] : b['Blood Cost'];

  if (!isNaN(costA) && isNaN(costB)) return -1;
  if (!isNaN(costB) && isNaN(costA)) return 1;
  if (isNaN(costA) && isNaN(costB)) return 0;
  return costB - costA;
};

export const byPoolCost = (a, b) => {
  const costA = a.c ? a.c['Pool Cost'] : a['Pool Cost'];
  const costB = b.c ? b.c['Pool Cost'] : b['Pool Cost'];

  if (!isNaN(costA) && isNaN(costB)) return -1;
  if (!isNaN(costB) && isNaN(costA)) return 1;
  if (isNaN(costA) && isNaN(costB)) return 0;
  return costB - costA;
};

export const bySect = (a, b) => {
  const sectA = a.c ? a.c.Sect : a.Sect;
  const sectB = b.c ? b.c.Sect : b.Sect;

  if (sectA < sectB) return -1;
  if (sectA > sectB) return 1;
  return 0;
};

export const byTimestamp = (a, b) => {
  return new Date(b.timestamp) - new Date(a.timestamp);
};

export const byPlayer = (a, b) => {
  if (a.player && !b.player) return -1;
  if (!a.player && b.player) return 1;
  if (!a.player && !b.player) return 0;
  return a.player.localeCompare(b.player, 'en');
};

export const byDateWin = (a, b) => {
  if (a.twd_date && !b.twd_date) return -1;
  if (!a.twd_date && b.twd_date) return 1;
  if (!a.twd_date && !b.twd_date) return 0;
  return a.twd_date < b.twd_date;
};

export const byDatePrint = (a, b) => {
  return b.release_date > a.release_date;
};
