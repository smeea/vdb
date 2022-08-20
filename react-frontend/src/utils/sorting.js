export const byName = (a, b) => {
  const nameA = a['ASCII Name'] || a.c['ASCII Name'];
  const nameB = b['ASCII Name'] || b.c['ASCII Name'];

  return nameA.localeCompare(nameB);
};

export const byClan = (a, b) => {
  const clanA = a.Clan || a.c.Clan;
  const clanB = b.Clan || b.c.Clan;

  return clanA.localeCompare(clanB);
};

export const byClanOpt = (a, b) => {
  const clanA = a.Clan || a.c.Clan;
  const clanB = b.Clan || b.c.Clan;

  if (clanA && !clanB) return -1;
  if (!clanA && clanB) return 1;
  if (clanA < clanB) return -1;
  if (clanA > clanB) return 1;
  return 0;
};

export const byGroup = (a, b) => {
  const groupA = a.Group || a.c.Group;
  const groupB = b.Group || b.c.Group;

  return groupA - groupB;
};

export const byCapacity = (a, b) => {
  const capacityA = a.Capacity || a.c.Capacity;
  const capacityB = b.Capacity || b.c.Capacity;

  return capacityB - capacityA;
};

export const byQuantity = (a, b) => {
  return b.q - a.q;
};

export const byType = (a, b) => {
  const typeA = a.Type || a.c.Type;
  const typeB = b.Type || b.c.Type;

  if (typeA < typeB) return -1;
  if (typeA > typeB) return 1;
  return 0;
};

export const byDiscipline = (a, b) => {
  const disciplineA = a.Discipline || a.c.Discipline;
  const disciplineB = b.Discipline || b.c.Discipline;

  if (discplineA && !discplineB) return -1;
  if (!disciplineA && disciplineB) return 1;
  if (disciplineA < disciplineB) return -1;
  if (disciplineA > disciplineB) return 1;
  return 0;
};

export const byBloodCost = (a, b) => {
  const costA = a['Blood Cost'] || a.c['Blood Cost'];
  const costB = b['Blood Cost'] || b.c['Blood Cost'];

  if (!isNaN(costA) && isNaN(costB)) return -1;
  if (!isNaN(costB) && isNaN(costA)) return 1;
  if (isNaN(costA) && isNaN(costB)) return 0;
  return costB - costA;
};

export const byPoolCost = (a, b) => {
  const costA = a['Pool Cost'] || a.c['Pool Cost'];
  const costB = b['Pool Cost'] || b.c['Pool Cost'];

  if (!isNaN(costA) && isNaN(costB)) return -1;
  if (!isNaN(costB) && isNaN(costA)) return 1;
  if (isNaN(costA) && isNaN(costB)) return 0;
  return costB - costA;
};

export const bySect = (a, b) => {
  const sectA = a.Sect || a.c.Sect;
  const sectB = b.Sect || b.c.Sect;

  if (sectA < sectB) return -1;
  if (sectA > sectB) return 1;
  return 0;
};

export const byTimestamp = (a, b) => {
  return new Date(b.timestamp) - new Date(a.timestamp);
};
