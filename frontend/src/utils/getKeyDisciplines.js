import virtuesList from "@/assets/data/virtuesList.json";
import { DISCIPLINES } from "@/constants";

const getKeyDisciplines = (crypt = {}) => {
  let cryptTotal = 0;
  const disciplinesDetailed = {};
  const disciplinesDict = {};

  Object.keys(crypt).forEach((card) => {
    cryptTotal += crypt[card].q;
    Object.keys(crypt[card].c[DISCIPLINES]).forEach((d) => {
      const levelModifier = crypt[card].c[DISCIPLINES][d] > 1 ? 1.5 : 1;

      if (disciplinesDict[d] === undefined) {
        disciplinesDict[d] = crypt[card].q;
        if (virtuesList[d]) {
          disciplinesDetailed[d] = { 0: 0, 1: 0 };
        } else {
          disciplinesDetailed[d] = { 0: 0, 1: 0, 2: 0 };
        }
        disciplinesDetailed[d][crypt[card].c[DISCIPLINES][d]] += crypt[card].q;
        disciplinesDetailed[d][0] += crypt[card].q * levelModifier;
      } else {
        disciplinesDict[d] += crypt[card].q;
        disciplinesDetailed[d][crypt[card].c[DISCIPLINES][d]] += crypt[card].q;
        disciplinesDetailed[d][0] += crypt[card].q * levelModifier;
      }
    });
  });

  const disciplinesForSort = [];
  Object.keys(disciplinesDict).forEach((key) => {
    disciplinesForSort.push([key, disciplinesDict[key]]);
  });

  const disciplinesSet = disciplinesForSort
    .toSorted((a, b) => b[1] - a[1])
    .map((i) => {
      return i[0];
    });

  let keyDisciplines = 0;
  const REQUIRED_FRACTION = 0.5;
  disciplinesForSort
    .toSorted((a, b) => b[1] - a[1])
    .forEach((i) => {
      if (i[1] >= cryptTotal * REQUIRED_FRACTION) {
        keyDisciplines += 1;
      }
    });

  return {
    disciplinesSet,
    keyDisciplines,
    disciplinesDetailed,
  };
};

export default getKeyDisciplines;
