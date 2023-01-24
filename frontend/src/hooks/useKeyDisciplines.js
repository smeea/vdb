import virtuesList from '@/assets/data/virtuesList.json';

const useKeyDisciplines = (crypt = {}) => {
  let cryptTotal = 0;
  const disciplinesDetailed = {};
  const disciplinesDict = {};
  let maxDisciplines = 0;

  for (const card of Object.keys(crypt)) {
    cryptTotal += crypt[card].q;
    const n = Object.keys(crypt[card].c.Disciplines).length;
    if (maxDisciplines < n) maxDisciplines = n;

    for (const d of Object.keys(crypt[card].c.Disciplines)) {
      const levelModifier = crypt[card].c.Disciplines[d] > 1 ? 1.5 : 1;

      if (disciplinesDict[d] === undefined) {
        disciplinesDict[d] = crypt[card].q;
        if (virtuesList.includes(d)) {
          disciplinesDetailed[d] = { 0: 0, 1: 0 };
        } else {
          disciplinesDetailed[d] = { 0: 0, 1: 0, 2: 0 };
        }
        disciplinesDetailed[d][crypt[card].c.Disciplines[d]] += crypt[card].q;
        disciplinesDetailed[d][0] += crypt[card].q * levelModifier;
      } else {
        disciplinesDict[d] += crypt[card].q;
        disciplinesDetailed[d][crypt[card].c.Disciplines[d]] += crypt[card].q;
        disciplinesDetailed[d][0] += crypt[card].q * levelModifier;
      }
    }
  }

  const disciplinesForSort = [];
  Object.keys(disciplinesDict).map((key) => {
    disciplinesForSort.push([key, disciplinesDict[key]]);
  });

  const disciplinesSet = disciplinesForSort
    .sort((a, b) => b[1] - a[1])
    .map((i) => {
      return i[0];
    });

  let keyDisciplines = 0;
  const REQUIRED_FRACTION = 0.5;
  disciplinesForSort
    .sort((a, b) => b[1] - a[1])
    .map((i) => {
      if (i[1] >= cryptTotal * REQUIRED_FRACTION) {
        keyDisciplines += 1;
      }
    });

  const nonKeyDisciplinesList = [];
  for (let i = keyDisciplines; i < disciplinesSet.length; i++) {
    nonKeyDisciplinesList.push(disciplinesSet[i]);
  }

  let nonKeyDisciplines = 0;
  Object.keys(crypt).map((card) => {
    let counter = 0;
    Object.keys(crypt[card].c.Disciplines).map((d) => {
      if (nonKeyDisciplinesList.includes(d)) {
        counter += 1;
      }
    });
    if (nonKeyDisciplines < counter) nonKeyDisciplines = counter;
  });

  return {
    disciplinesSet,
    keyDisciplines,
    nonKeyDisciplines,
    disciplinesDetailed,
    maxDisciplines,
  };
};

export default useKeyDisciplines;
