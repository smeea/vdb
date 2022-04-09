const useKeyDisciplines = (cards = [], cryptTotal = 0) => {
  const disciplinesDetailed = {};
  const disciplinesDict = {};
  for (const card of Object.keys(cards)) {
    for (const d of Object.keys(cards[card].c.Disciplines)) {
      const levelModifier = cards[card].c.Disciplines[d] > 1 ? 1.5 : 1;

      if (disciplinesDict[d] === undefined) {
        disciplinesDict[d] = cards[card].q;
        disciplinesDetailed[d] = { 0: 0, 1: 0, 2: 0 };
        disciplinesDetailed[d][cards[card].c.Disciplines[d]] += cards[card].q;
        disciplinesDetailed[d][0] += cards[card].q * levelModifier;
      } else {
        disciplinesDict[d] += cards[card].q;
        disciplinesDetailed[d][cards[card].c.Disciplines[d]] += cards[card].q;
        disciplinesDetailed[d][0] += cards[card].q * levelModifier;
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
  Object.keys(cards).map((card) => {
    let counter = 0;
    Object.keys(cards[card].c.Disciplines).map((d) => {
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
  };
};

export default useKeyDisciplines;
